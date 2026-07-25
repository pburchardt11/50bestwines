#!/usr/bin/env python3
"""
Wine-Searcher Web Scraper — Extract Critic Scores from Public Pages
====================================================================

IMPORTANT: WHAT YOU NEED TO KNOW BEFORE USING THIS
----------------------------------------------------
Wine-Searcher uses PerimeterX (PX) bot protection with browser fingerprinting,
JavaScript challenges, and CAPTCHA enforcement. As of July 2026:

  - All server-side HTTP requests are blocked with a 403 + CAPTCHA page
    (triggered even with realistic browser User-Agent headers)
  - The PX protection app ID is: PXK6S8okp3
  - Varnish CDN is used in front of the site

This means simple curl/urllib/requests scraping WILL NOT WORK reliably.

APPROACHES THAT CAN WORK
--------------------------
1. Playwright/Selenium with real browser engine (Chromium)
   - Executes JavaScript, passes fingerprinting checks
   - Install: pip install playwright && playwright install chromium
   - Still may hit CAPTCHAs under heavy use

2. Playwright + CAPTCHA solving service (2captcha, CapSolver, etc.)
   - Fully automated at scale

3. Wine-Searcher API (recommended — see winesearcher-scraper.py)
   - $320/month for 500 calls/day
   - Returns aggregate critic score + region + grape + prices

4. Alternative data sources with critic scores:
   - CellarTracker API (free, community scores + some professional)
   - Vivino API (community scores, already scraped)
   - Wine-Searcher Wayback/cache (limited freshness)
   - OpenAI/LLM lookup for well-known wines (hallucination risk)

WHAT THIS SCRIPT DOES
----------------------
This script uses Playwright (real Chromium browser) to scrape Wine-Searcher
wine pages. It extracts critic scores visible in the HTML for each wine.

On a Wine-Searcher wine page (e.g. /find/chateau+margaux), the critic scores
section shows cards for each critic/publication that has reviewed the wine,
displaying: critic name, score, and vintage.

Score HTML structure (based on archived pages):
  <div class="review-score"> or similar class
  <span class="score-value">96</span>
  <span class="score-max">/100</span>
  <div class="critic-name">Wine Spectator</div>

INSTALLATION
------------
  pip install playwright
  playwright install chromium

USAGE
-----
  python3 winesearcher-web-scraper.py
  python3 winesearcher-web-scraper.py --wine "Chateau Margaux" --vintage 2015
  python3 winesearcher-web-scraper.py --test  # runs 3-wine test
"""

import json
import os
import sys
import time
import re
import argparse
import logging
import random
from pathlib import Path
from datetime import datetime
from urllib.parse import quote_plus

# ─── CONFIGURATION ────────────────────────────────────────────────────────────

SCRAPER_DIR = Path(__file__).parent
RAW_DATA_DIR = SCRAPER_DIR / "raw-data"
MERGED_WINES_PATH = RAW_DATA_DIR / "merged-wines.json"
OUTPUT_PATH = RAW_DATA_DIR / "wines-with-web-scraped-scores.json"
PROGRESS_PATH = RAW_DATA_DIR / "winesearcher-web-progress.json"

# Polite delays (seconds)
MIN_DELAY = 2.0
MAX_DELAY = 4.0

# Wine-Searcher search URL pattern
BASE_SEARCH_URL = "https://www.wine-searcher.com/find/{wine_slug}/{vintage}"

# ─── LOGGING ──────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

# ─── CRITIC NAME NORMALIZATION ────────────────────────────────────────────────

# Map Wine-Searcher display names to our standard internal keys
CRITIC_NAME_MAP = {
    # Wine publications
    "wine spectator": "wine_spectator",
    "the wine spectator": "wine_spectator",
    "wine enthusiast": "wine_enthusiast",
    "decanter": "decanter",
    "decanter magazine": "decanter",

    # Individual critics
    "robert parker": "wine_advocate",
    "robert parker's wine advocate": "wine_advocate",
    "wine advocate": "wine_advocate",
    "the wine advocate": "wine_advocate",
    "james suckling": "james_suckling",
    "jancis robinson": "jancis_robinson",
    "jancis robinson mw": "jancis_robinson",
    "tim atkin": "tim_atkin",
    "tim atkin mw": "tim_atkin",

    # Community/aggregator
    "cellartracker": "cellartracker",
    "vinous": "vinous",
    "vinous media": "vinous",
    "antonio galloni": "vinous",

    # Wine-Searcher aggregate
    "wine-searcher": "wine_searcher_aggregate",
    "ws score": "wine_searcher_aggregate",
    "aggregate": "wine_searcher_aggregate",
}

# Score scales by source
SCORE_SCALES = {
    "wine_spectator": 100,
    "wine_enthusiast": 100,
    "decanter": 100,
    "wine_advocate": 100,
    "james_suckling": 100,
    "jancis_robinson": 20,   # Jancis uses 20-point scale
    "tim_atkin": 100,
    "cellartracker": 100,
    "vinous": 100,
    "wine_searcher_aggregate": 100,
}

SOURCE_DISPLAY_NAMES = {
    "wine_spectator": "Wine Spectator",
    "wine_enthusiast": "Wine Enthusiast",
    "decanter": "Decanter",
    "wine_advocate": "Robert Parker / Wine Advocate",
    "james_suckling": "James Suckling",
    "jancis_robinson": "Jancis Robinson",
    "tim_atkin": "Tim Atkin",
    "cellartracker": "CellarTracker",
    "vinous": "Vinous",
    "wine_searcher_aggregate": "Wine-Searcher Aggregate",
}


def normalize_critic_name(raw_name: str) -> str | None:
    """Map a raw critic/publication name to our internal key."""
    if not raw_name:
        return None
    normalized = raw_name.lower().strip()
    return CRITIC_NAME_MAP.get(normalized)


def parse_score(score_str: str) -> float | None:
    """Parse a score string like '96', '95/100', '18.5/20' to a float."""
    if not score_str:
        return None
    # Remove whitespace, extract number
    score_str = score_str.strip()
    # Handle "96/100" or "18.5/20" formats
    match = re.match(r"^(\d+(?:\.\d+)?)\s*/\s*(\d+)", score_str)
    if match:
        return float(match.group(1))
    # Handle plain number
    match = re.match(r"^(\d+(?:\.\d+)?)", score_str)
    if match:
        return float(match.group(1))
    return None


# ─── HTML PARSING FALLBACK (without Playwright) ───────────────────────────────

def parse_scores_from_html(html: str, wine_name: str) -> list[dict]:
    """
    Parse critic scores from Wine-Searcher HTML.

    Wine-Searcher shows critic scores in a dedicated section on wine pages.
    The HTML structure (observed from archived pages):

    Option A — Score cards:
      <div class="review-score-card">
        <div class="critic-name">Wine Spectator</div>
        <div class="score">96</div>
        <div class="vintage">2015</div>
      </div>

    Option B — Table rows:
      <tr class="score-row">
        <td class="critic">Robert Parker</td>
        <td class="score">98</td>
        <td class="vintage">2016</td>
      </tr>

    Option C — JSON-LD structured data embedded in page

    We try multiple patterns since the exact class names vary.
    """
    scores = []

    # Pattern 1: JSON-LD structured data (most reliable)
    json_ld_matches = re.findall(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        html,
        re.DOTALL | re.IGNORECASE,
    )
    for match in json_ld_matches:
        try:
            data = json.loads(match.strip())
            # Look for AggregateRating or Review schemas
            if isinstance(data, dict):
                if data.get("@type") == "AggregateRating":
                    score = parse_score(str(data.get("ratingValue", "")))
                    if score:
                        scores.append({
                            "source": "wine_searcher_aggregate",
                            "display_name": "Wine-Searcher Aggregate",
                            "score": score,
                            "max_score": int(data.get("bestRating", 100)),
                        })
                elif data.get("@type") == "Review":
                    reviewer = data.get("author", {}).get("name", "")
                    rating = data.get("reviewRating", {})
                    score = parse_score(str(rating.get("ratingValue", "")))
                    if score and reviewer:
                        source_key = normalize_critic_name(reviewer)
                        if source_key:
                            scores.append({
                                "source": source_key,
                                "display_name": SOURCE_DISPLAY_NAMES.get(source_key, reviewer),
                                "score": score,
                                "max_score": SCORE_SCALES.get(source_key, 100),
                            })
        except (json.JSONDecodeError, KeyError, TypeError):
            pass

    # Pattern 2: Meta tags with score data
    # <meta itemprop="ratingValue" content="96">
    meta_rating = re.search(
        r'<meta[^>]+itemprop=["\']ratingValue["\'][^>]+content=["\']([^"\']+)["\']',
        html, re.IGNORECASE
    )
    if meta_rating and not scores:
        score = parse_score(meta_rating.group(1))
        if score:
            scores.append({
                "source": "wine_searcher_aggregate",
                "display_name": "Wine-Searcher Aggregate",
                "score": score,
                "max_score": 100,
            })

    # Pattern 3: Data attributes (Wine-Searcher sometimes uses data-* attributes)
    # <div data-score="96" data-critic="Wine Spectator" data-vintage="2015">
    data_score_matches = re.findall(
        r'data-score=["\'](\d+(?:\.\d+)?)["\'][^>]*data-critic=["\']([^"\']+)["\']',
        html, re.IGNORECASE
    )
    for score_val, critic in data_score_matches:
        source_key = normalize_critic_name(critic)
        if source_key:
            scores.append({
                "source": source_key,
                "display_name": SOURCE_DISPLAY_NAMES.get(source_key, critic),
                "score": float(score_val),
                "max_score": SCORE_SCALES.get(source_key, 100),
            })

    # Pattern 4: Visible score text patterns
    # "Wine Spectator 96" or "96 points Wine Spectator"
    critic_names = list(CRITIC_NAME_MAP.keys())
    for critic_display in critic_names:
        # Pattern: "Critic Name NNpts" or "Critic Name NN/100"
        pattern = re.compile(
            rf"{re.escape(critic_display)}\s+(\d{{2,3}}(?:\.\d+)?)\s*(?:pts?|points?|/\d+)?",
            re.IGNORECASE
        )
        match = pattern.search(html)
        if match:
            score = float(match.group(1))
            source_key = normalize_critic_name(critic_display)
            if source_key and 50 <= score <= 100:  # Sanity check
                scores.append({
                    "source": source_key,
                    "display_name": SOURCE_DISPLAY_NAMES.get(source_key, critic_display),
                    "score": score,
                    "max_score": SCORE_SCALES.get(source_key, 100),
                })

    return scores


# ─── PLAYWRIGHT SCRAPER ───────────────────────────────────────────────────────

def scrape_with_playwright(wine_name: str, vintage: str = None) -> dict:
    """
    Scrape Wine-Searcher using Playwright (real Chromium browser).
    Handles JavaScript execution and bot detection better than raw HTTP.

    Requires: pip install playwright && playwright install chromium
    """
    try:
        from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout
    except ImportError:
        return {
            "scores": [],
            "error": (
                "Playwright not installed. Run: pip install playwright && playwright install chromium"
            ),
            "html": "",
        }

    vintage_str = vintage if vintage else "1"
    wine_slug = wine_name.lower().replace(" ", "+")
    url = f"https://www.wine-searcher.com/find/{quote_plus(wine_slug)}/{vintage_str}"

    log.info("Playwright scraping: %s", url)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-setuid-sandbox",
            ]
        )
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            viewport={"width": 1280, "height": 800},
            locale="en-US",
            timezone_id="America/New_York",
        )

        # Spoof navigator.webdriver = false
        context.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
            Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
            Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
        """)

        page = context.new_page()

        try:
            page.goto(url, wait_until="networkidle", timeout=30000)

            # Check for CAPTCHA / PerimeterX challenge
            page_title = page.title()
            if "captcha" in page_title.lower() or "denied" in page_title.lower():
                browser.close()
                return {
                    "scores": [],
                    "error": "PerimeterX CAPTCHA encountered — bot detection triggered",
                    "html": "",
                }

            # Wait for score elements to load
            try:
                page.wait_for_selector(
                    "[class*='score'], [class*='critic'], [class*='review']",
                    timeout=5000
                )
            except PWTimeout:
                pass  # Scores might not be present for this wine

            html = page.content()

            # Extract scores from rendered HTML
            scores = parse_scores_from_html(html, wine_name)

            # Also try to extract scores via JavaScript from page state
            try:
                page_data = page.evaluate("""
                    () => {
                        // Try to find score data in window.__data__ or similar
                        const sources = [
                            window.__data__,
                            window.__INITIAL_STATE__,
                            window.__WS_DATA__,
                            window.pageData,
                        ];
                        for (const src of sources) {
                            if (src) return JSON.stringify(src);
                        }
                        return null;
                    }
                """)
                if page_data:
                    try:
                        data = json.loads(page_data)
                        # Extract scores from page data object if available
                        log.debug("Found page data object with keys: %s", list(data.keys())[:10])
                    except json.JSONDecodeError:
                        pass
            except Exception:
                pass

            browser.close()
            return {
                "scores": scores,
                "error": None,
                "html": html[:5000],  # Keep first 5KB for debugging
            }

        except PWTimeout:
            browser.close()
            return {
                "scores": [],
                "error": "Page load timeout",
                "html": "",
            }
        except Exception as e:
            browser.close()
            return {
                "scores": [],
                "error": str(e),
                "html": "",
            }


# ─── URLLIB FALLBACK SCRAPER ──────────────────────────────────────────────────

def scrape_with_urllib(wine_name: str, vintage: str = None) -> dict:
    """
    Fallback scraper using urllib (no JavaScript execution).
    Will likely be blocked by PerimeterX, but included as a reference implementation.

    This function documents how the scraping would work if bot detection were bypassed.
    """
    from urllib.request import Request, urlopen
    from urllib.error import HTTPError, URLError

    vintage_str = vintage if vintage else "1"
    wine_slug = wine_name.lower().replace(" ", "+")
    url = f"https://www.wine-searcher.com/find/{wine_slug}/{vintage_str}"

    # Realistic browser headers
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "identity",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
    }

    try:
        req = Request(url, headers=headers)
        with urlopen(req, timeout=30) as resp:
            html = resp.read().decode("utf-8", errors="replace")

        # Check for CAPTCHA / PX block
        if "PerimeterX" in html or "px-captcha" in html or "Access to this page has been denied" in html:
            return {
                "scores": [],
                "error": "Blocked by PerimeterX bot protection (CAPTCHA required)",
                "url": url,
                "blocked": True,
            }

        scores = parse_scores_from_html(html, wine_name)
        return {
            "scores": scores,
            "error": None,
            "url": url,
            "blocked": False,
        }

    except HTTPError as e:
        blocked = e.code == 403
        return {
            "scores": [],
            "error": f"HTTP {e.code}: {e.reason}",
            "url": url,
            "blocked": blocked,
        }
    except URLError as e:
        return {
            "scores": [],
            "error": f"Network error: {e.reason}",
            "url": url,
            "blocked": False,
        }


# ─── MAIN SCRAPE FUNCTION ─────────────────────────────────────────────────────

def fetch_scores_for_wine(wine_name: str, vintage: str = None, use_playwright: bool = True) -> dict:
    """
    Fetch critic scores for a wine from Wine-Searcher web pages.

    Tries Playwright first (if available), falls back to urllib.
    Returns a result dict with 'scores' list and 'error' field.
    """
    delay = random.uniform(MIN_DELAY, MAX_DELAY)
    time.sleep(delay)

    if use_playwright:
        result = scrape_with_playwright(wine_name, vintage)
    else:
        result = scrape_with_urllib(wine_name, vintage)

    # Convert score list to our standard format
    formatted_scores = {}
    for s in result.get("scores", []):
        source_key = s["source"]
        formatted_scores[source_key] = {
            "source": s["display_name"],
            "score": s["score"],
            "max_score": s["max_score"],
            "fetched_at": datetime.utcnow().isoformat() + "Z",
            "via": "wine_searcher_web",
        }

    result["formatted_scores"] = formatted_scores
    return result


# ─── TEST FUNCTION ────────────────────────────────────────────────────────────

TEST_WINES = [
    {"name": "Chateau Margaux", "vintage": "2015"},
    {"name": "Opus One", "vintage": "2018"},
    {"name": "Penfolds Grange", "vintage": "2016"},
]


def run_test(use_playwright: bool = True) -> None:
    """
    Test the scraper on 3 well-known wines and report results.
    """
    print("=" * 60)
    print("Wine-Searcher Web Scraper Test")
    print("=" * 60)

    method = "Playwright (Chromium)" if use_playwright else "urllib (basic HTTP)"
    print(f"Method: {method}")
    print()

    for wine_info in TEST_WINES:
        wine_name = wine_info["name"]
        vintage = wine_info["vintage"]

        print(f"Testing: {wine_name} {vintage}")
        print(f"  URL: https://www.wine-searcher.com/find/{wine_name.lower().replace(' ', '+')}/{vintage}")

        result = fetch_scores_for_wine(wine_name, vintage, use_playwright=use_playwright)

        if result.get("error"):
            print(f"  ERROR: {result['error']}")
            if result.get("blocked"):
                print("  STATUS: BLOCKED by bot protection")
        elif result.get("formatted_scores"):
            print(f"  SUCCESS: Found {len(result['formatted_scores'])} scores")
            for key, score in result["formatted_scores"].items():
                print(f"    {score['source']}: {score['score']}/{score['max_score']}")
        else:
            print("  RESULT: No scores found (wine may not have critic reviews on this page)")

        print()

    print("=" * 60)
    print("\nNote on bot protection:")
    print("Wine-Searcher uses PerimeterX (PX) bot detection.")
    print("If blocked, Playwright with anti-detection settings may help,")
    print("but reliable access at scale requires either:")
    print("  1. The official API ($320+/month)")
    print("  2. A CAPTCHA-solving service integrated with Playwright")
    print("  3. Alternative data sources (see script docstring)")


# ─── BULK ENRICHMENT ─────────────────────────────────────────────────────────

def enrich_wines_from_web(wines: list, max_requests: int = 50, use_playwright: bool = True) -> tuple[list, int]:
    """
    Look up critic scores via web scraping for wines that lack them.
    Much slower than API; use primarily for spot-checks or small batches.
    """
    progress_path = PROGRESS_PATH
    progress = {}
    if progress_path.exists():
        try:
            with open(progress_path) as f:
                progress = json.load(f)
        except Exception:
            pass

    requests_made = 0
    enriched_count = 0

    for wine in wines:
        if requests_made >= max_requests:
            log.info("Reached request limit (%d). Stopping.", max_requests)
            break

        wine_key = f"{wine.get('winery_name', '')}|{wine.get('name', '')}"
        if wine_key in progress:
            continue

        scores = wine.get("scores", {})
        if isinstance(scores, dict):
            professional_keys = {
                "wine_searcher_aggregate", "wine_spectator", "wine_advocate",
                "decanter", "james_suckling", "wine_enthusiast", "vinous",
                "jancis_robinson", "cellartracker",
            }
            if professional_keys & set(scores.keys()):
                progress[wine_key] = "already_has_scores"
                continue

        # Build query
        parts = []
        winery = wine.get("winery_name", "").strip()
        name = wine.get("name", "").strip()
        if winery and winery.lower() not in name.lower():
            parts.append(winery)
        if name:
            parts.append(name)
        query = " ".join(parts)

        if not query:
            continue

        # Determine vintage to use
        wine_vintages = wine.get("vintages", [])
        vintage = None
        if wine_vintages:
            valid = [v for v in wine_vintages if isinstance(v, int) and v > 1900]
            if valid:
                vintage = str(max(valid))

        log.info("[%d] Scraping: %s (vintage: %s)", requests_made + 1, query, vintage or "any")
        result = fetch_scores_for_wine(query, vintage, use_playwright=use_playwright)
        requests_made += 1

        if result.get("formatted_scores"):
            if "scores" not in wine or not isinstance(wine["scores"], dict):
                wine["scores"] = {}
            wine["scores"].update(result["formatted_scores"])
            enriched_count += 1
            progress[wine_key] = "enriched"
            log.info("  Found %d scores", len(result["formatted_scores"]))
        else:
            progress[wine_key] = f"no_score:{result.get('error', 'none')[:50]}"

        # Save progress every 20 requests
        if requests_made % 20 == 0:
            with open(progress_path, "w") as f:
                json.dump(progress, f)

    with open(progress_path, "w") as f:
        json.dump(progress, f)

    log.info("Enriched %d wines with %d web requests", enriched_count, requests_made)
    return wines, requests_made


# ─── CLI ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Scrape Wine-Searcher public pages for professional critic scores"
    )
    parser.add_argument(
        "--wine", "-w",
        help="Single wine to look up (e.g. 'Chateau Margaux')"
    )
    parser.add_argument(
        "--vintage", "-v",
        default=None,
        help="Vintage year (e.g. 2015)"
    )
    parser.add_argument(
        "--test",
        action="store_true",
        help="Run test on Chateau Margaux, Opus One, and Penfolds Grange"
    )
    parser.add_argument(
        "--no-playwright",
        action="store_true",
        help="Use simple HTTP requests instead of Playwright (likely to be blocked)"
    )
    parser.add_argument(
        "--max-requests", "-n",
        type=int,
        default=50,
        help="Maximum number of pages to scrape in bulk mode (default: 50)"
    )
    parser.add_argument(
        "--input", "-i",
        default=str(MERGED_WINES_PATH),
        help=f"Input wine JSON file (default: {MERGED_WINES_PATH})"
    )
    parser.add_argument(
        "--output", "-o",
        default=str(OUTPUT_PATH),
        help=f"Output JSON file (default: {OUTPUT_PATH})"
    )
    args = parser.parse_args()

    use_playwright = not args.no_playwright

    if args.test:
        run_test(use_playwright=use_playwright)
        return

    if args.wine:
        result = fetch_scores_for_wine(args.wine, args.vintage, use_playwright=use_playwright)
        print(json.dumps({
            "wine": args.wine,
            "vintage": args.vintage,
            "scores": result.get("formatted_scores", {}),
            "error": result.get("error"),
        }, indent=2, ensure_ascii=False))
        return

    # Bulk mode
    input_path = Path(args.input)
    if not input_path.exists():
        print(f"ERROR: Input file not found: {input_path}")
        sys.exit(1)

    log.info("Loading wines from %s ...", input_path)
    with open(input_path) as f:
        wines = json.load(f)
    log.info("Loaded %d wines", len(wines))

    enriched_wines, requests_made = enrich_wines_from_web(
        wines, max_requests=args.max_requests, use_playwright=use_playwright
    )

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(enriched_wines, f, ensure_ascii=False, indent=2)

    log.info("Saved %d wines to %s", len(enriched_wines), output_path)
    log.info("Web requests made: %d", requests_made)


if __name__ == "__main__":
    main()
