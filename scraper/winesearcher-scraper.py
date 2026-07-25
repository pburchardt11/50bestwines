#!/usr/bin/env python3
"""
Wine-Searcher API Scraper — Fetch Professional Critic Scores
============================================================

HOW TO GET AN API KEY
---------------------
1. Go to https://www.wine-searcher.com/trade/api and click "Start Free Trial"
   (or https://www.wine-searcher.com/contact-general?subject_F=Trade+Enquiry-API+FREE+TRIAL)
2. Fill in the contact form requesting a trial API key.
3. Wine-Searcher will email you your API key and the base URL.
   The base URL is NOT published publicly — it is provided after signup.
   It follows the pattern: https://www.wine-searcher.com/ws-api/[your_account]/
   (sometimes ws.wine-searcher.com — the exact URL comes in your welcome email)

PRICING (as of late 2025)
--------------------------
  Trial:        100 calls/day free for 5 days
  500 calls/day:   $320/month  (Wine Check API)
  1000 calls/day:  $510/month
  5000 calls/day:  $2,290/month

WHAT YOU GET FROM THE WINE CHECK API
-------------------------------------
  - Wine-Searcher Aggregated Critic Score (mean of all critic scores, 100-pt scale)
    Sources: Robert Parker, Jancis Robinson, Wine Spectator, Decanter,
             James Suckling, Wine Enthusiast, CellarTracker, Tim Atkin, Vinous
  - Region (single lowest-level appellation only)
  - Grape variety
  - Min / Max / Average price
  - Alcohol by volume

  NOTE: Individual per-critic scores (e.g. "Parker gave it 96") are NOT returned
  by the API — only the aggregated mean. Tasting notes and awards are also
  excluded for copyright reasons. To get individual critic scores you need
  to scrape the website directly (see winesearcher-web-scraper.py).

API CALL FORMAT
---------------
  GET <BASE_URL>?api_key=<API_KEY>&winename=chateau+margaux&vintage=2015
                &currencycode=USD&format=J

  Parameters:
    api_key      (required) Your API key
    winename     (required) Wine name — spaces as + or %20
    vintage      (required) 4-digit year (e.g. 2015), NV, or 2 for any vintage
    format       X=XML (default), J=JSON  — UPPERCASE
    currencycode ISO code e.g. USD, EUR (defaults to USD)
    location     e.g. USA, France, Europe (recommended)
    autoexpand   Y/N — expand to all countries if no results in location

  Return codes:
    0  Success
    1  No matching wines found
    2  Input values error
    4  Invalid API key
    5  Exceeded daily limit
    6  Access denied
    7  Subscription ended
    8  Keywords match multiple wines (too broad a query)
    9  Nothing found
    10 Cannot access Price Check / Marketplace data

  Response fields (Wine Check API, format=J):
    return-code, list-comment, list-location, list-state, list-currency-code
    price-average, price-min, price-max, region, grape, score, abv

USAGE
-----
  export WINESEARCHER_API_KEY="your_key_here"
  export WINESEARCHER_BASE_URL="https://www.wine-searcher.com/ws-api/your_account/"
  python3 winesearcher-scraper.py

  Or for a single lookup:
  python3 winesearcher-scraper.py --wine "Chateau Margaux" --vintage 2015
"""

import json
import os
import sys
import time
import argparse
import logging
from urllib.request import Request, urlopen
from urllib.parse import urlencode, quote_plus
from urllib.error import HTTPError, URLError
from pathlib import Path
from datetime import datetime

# ─── CONFIGURATION ────────────────────────────────────────────────────────────

# Set these via environment variables (never hardcode your key in source)
WINESEARCHER_API_KEY = os.environ.get("WINESEARCHER_API_KEY", "")

# The base URL is provided by Wine-Searcher in your welcome email after signup.
# It is NOT publicly documented. Common patterns:
#   https://www.wine-searcher.com/ws-api/<account>/
#   https://ws.wine-searcher.com/api/<account>/
# Set WINESEARCHER_BASE_URL in your environment once you have it.
WINESEARCHER_BASE_URL = os.environ.get(
    "WINESEARCHER_BASE_URL",
    "https://www.wine-searcher.com/ws-api/"  # placeholder — replace with your URL
)

# Rate limiting: trial = 100 calls/day; reset at midnight UK time
# Add a safety margin — use 90 of the 100 allowed daily calls
DAILY_CALL_LIMIT = int(os.environ.get("WINESEARCHER_DAILY_LIMIT", "90"))
DELAY_BETWEEN_CALLS = 2.0  # seconds between API calls

# Paths
SCRAPER_DIR = Path(__file__).parent
RAW_DATA_DIR = SCRAPER_DIR / "raw-data"
MERGED_WINES_PATH = RAW_DATA_DIR / "merged-wines.json"
OUTPUT_PATH = RAW_DATA_DIR / "wines-with-critic-scores.json"
PROGRESS_PATH = RAW_DATA_DIR / "winesearcher-progress.json"

# ─── LOGGING ──────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

# ─── API RESPONSE MAPPING ─────────────────────────────────────────────────────

# Wine-Searcher's aggregated critic score is a 100-point mean of all sources.
# The individual sources they aggregate from (all adjusted to 100-pt scale):
WINESEARCHER_SCORE_SOURCES = [
    "Robert Parker / Wine Advocate",
    "Jancis Robinson",
    "Wine Spectator",
    "Decanter",
    "James Suckling",
    "Wine Enthusiast",
    "CellarTracker",
    "Tim Atkin",
    "Vinous",
]


def map_api_response_to_scores(api_data: dict, wine_name: str, vintage: str) -> dict:
    """
    Map Wine-Searcher API JSON response to our internal score format.

    The Wine Check API returns one aggregated score (the mean of all critics,
    each adjusted to the 100-point scale). We store it as 'wine_searcher_aggregate'.

    Returns a dict of score entries keyed by source name.
    """
    scores = {}

    # Extract the aggregated score
    # In JSON format the field is 'score'; in XML it's <score>
    raw_score = api_data.get("score") or api_data.get("Score")

    if raw_score is not None:
        try:
            score_value = float(raw_score)
            if 0 < score_value <= 100:
                scores["wine_searcher_aggregate"] = {
                    "source": "Wine-Searcher Aggregate",
                    "score": round(score_value, 1),
                    "max_score": 100,
                    "note": (
                        "Mean of all available critic scores adjusted to 100-pt scale. "
                        f"Sources may include: {', '.join(WINESEARCHER_SCORE_SOURCES)}"
                    ),
                    "wine_name": wine_name,
                    "vintage": vintage,
                    "fetched_at": datetime.utcnow().isoformat() + "Z",
                }
        except (TypeError, ValueError):
            log.warning("Could not parse score value: %r", raw_score)

    return scores


def map_api_response_to_metadata(api_data: dict) -> dict:
    """Extract non-score metadata from API response (region, grape, ABV, prices)."""
    meta = {}

    field_map = {
        "region": "ws_region",
        "grape": "ws_grape",
        "abv": "ws_abv",
        "price-average": "ws_price_avg_usd",
        "price-min": "ws_price_min_usd",
        "price-max": "ws_price_max_usd",
    }
    for api_field, our_field in field_map.items():
        val = api_data.get(api_field) or api_data.get(api_field.replace("-", "_"))
        if val is not None:
            meta[our_field] = val

    return meta


# ─── API CLIENT ───────────────────────────────────────────────────────────────

def build_api_url(wine_name: str, vintage: str = "2", currency: str = "USD") -> str:
    """Build a Wine-Searcher API URL for the Wine Check endpoint."""
    params = {
        "api_key": WINESEARCHER_API_KEY,
        "winename": wine_name,
        "vintage": vintage,
        "currencycode": currency,
        "format": "J",  # JSON — MUST be uppercase
    }
    query = "&".join(f"{k}={quote_plus(str(v))}" for k, v in params.items())
    return f"{WINESEARCHER_BASE_URL.rstrip('/')}?{query}"


def fetch_critic_scores(wine_name: str, vintage: str = None) -> dict:
    """
    Fetch critic scores for a wine from Wine-Searcher's Wine Check API.

    Args:
        wine_name: Wine name (e.g. "Chateau Margaux", "Opus One")
        vintage:   4-digit year string (e.g. "2015"), "NV", or None for any vintage

    Returns:
        dict with keys:
          'scores'   — dict of score entries in our standard format
          'metadata' — dict of extra fields (region, grape, prices, ABV)
          'return_code' — Wine-Searcher return code (0 = success)
          'error'    — error message if any
    """
    if not WINESEARCHER_API_KEY:
        return {
            "scores": {},
            "metadata": {},
            "return_code": -1,
            "error": (
                "No API key set. Export WINESEARCHER_API_KEY environment variable. "
                "Get a free trial at https://www.wine-searcher.com/trade/api"
            ),
        }

    vintage_str = vintage if vintage else "2"  # "2" = any vintage
    url = build_api_url(wine_name, vintage_str)

    log.debug("Calling Wine-Searcher API: %s", url)

    try:
        req = Request(url, headers={
            "User-Agent": "50BestWines/1.0 (wine data enrichment; contact@50bestwines.com)",
            "Accept": "application/json",
        })
        with urlopen(req, timeout=30) as resp:
            raw = resp.read().decode("utf-8")

        # Parse JSON response
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            return {
                "scores": {},
                "metadata": {},
                "return_code": -1,
                "error": f"Invalid JSON response: {raw[:200]}",
            }

        # Wine-Searcher JSON wraps results in a root key (varies by account config)
        # Common patterns: data['search']['wine'][0], data['WS']['result'], etc.
        # Flatten if needed — look for return-code at any level
        if isinstance(data, dict):
            # Try to find the return code
            return_code = (
                data.get("return-code")
                or data.get("returncode")
                or data.get("return_code")
                or 0
            )

            # Normalize: some responses nest results under a wine/result key
            result = data
            for key in ("wine", "result", "search", "WS", "wines"):
                if key in data:
                    nested = data[key]
                    if isinstance(nested, list) and nested:
                        result = nested[0]
                    elif isinstance(nested, dict):
                        result = nested
                    break

            return_code = int(return_code)

            if return_code != 0:
                code_messages = {
                    1: "No matching wines found",
                    2: "Input values error",
                    4: "Invalid API key",
                    5: "Exceeded daily call limit",
                    6: "Access denied",
                    7: "Subscription ended",
                    8: "Query matches multiple wines — be more specific",
                    9: "Nothing found",
                    10: "Cannot access Wine Check data",
                    99: "Unknown server error",
                }
                return {
                    "scores": {},
                    "metadata": {},
                    "return_code": return_code,
                    "error": code_messages.get(return_code, f"API error code {return_code}"),
                }

            scores = map_api_response_to_scores(result, wine_name, vintage_str)
            metadata = map_api_response_to_metadata(result)

            return {
                "scores": scores,
                "metadata": metadata,
                "return_code": 0,
                "error": None,
            }

    except HTTPError as e:
        return {
            "scores": {},
            "metadata": {},
            "return_code": -1,
            "error": f"HTTP {e.code}: {e.reason}",
        }
    except URLError as e:
        return {
            "scores": {},
            "metadata": {},
            "return_code": -1,
            "error": f"Network error: {e.reason}",
        }
    except Exception as e:
        return {
            "scores": {},
            "metadata": {},
            "return_code": -1,
            "error": f"Unexpected error: {e}",
        }


# ─── PROGRESS TRACKING ────────────────────────────────────────────────────────

def load_progress() -> dict:
    """Load progress state from disk (tracks which wines we've already looked up)."""
    if PROGRESS_PATH.exists():
        try:
            with open(PROGRESS_PATH) as f:
                return json.load(f)
        except Exception:
            pass
    return {"processed": {}, "calls_today": 0, "last_reset_date": ""}


def save_progress(progress: dict) -> None:
    with open(PROGRESS_PATH, "w") as f:
        json.dump(progress, f, ensure_ascii=False, indent=2)


def reset_daily_counter_if_needed(progress: dict) -> dict:
    """Reset the daily call counter if it's a new day (midnight UK = UTC)."""
    today = datetime.utcnow().strftime("%Y-%m-%d")
    if progress.get("last_reset_date") != today:
        progress["calls_today"] = 0
        progress["last_reset_date"] = today
        log.info("New day detected — daily call counter reset to 0")
    return progress


# ─── MAIN ENRICHMENT LOOP ─────────────────────────────────────────────────────

def build_wine_query_name(wine: dict) -> str:
    """
    Build the best search string for a wine entry.
    Wine-Searcher requires a precise product name.
    """
    parts = []
    winery = wine.get("winery_name", "").strip()
    name = wine.get("name", "").strip()

    if winery and winery.lower() not in name.lower():
        parts.append(winery)
    if name:
        parts.append(name)

    return " ".join(parts) if parts else name


def needs_enrichment(wine: dict) -> bool:
    """Return True if this wine is missing professional critic scores."""
    scores = wine.get("scores", {})
    if not isinstance(scores, dict):
        return True
    professional_keys = {
        "wine_searcher_aggregate",
        "wine_spectator", "wine_advocate", "decanter",
        "james_suckling", "wine_enthusiast", "vinous",
        "jancis_robinson", "cellartracker",
    }
    return not bool(professional_keys & set(scores.keys()))


def enrich_wines(wines: list, max_calls: int = None) -> tuple[list, int]:
    """
    Look up critic scores for wines that don't have them yet.

    Returns:
        (enriched_wines, calls_made)
    """
    progress = load_progress()
    progress = reset_daily_counter_if_needed(progress)

    if max_calls is None:
        max_calls = DAILY_CALL_LIMIT - progress["calls_today"]

    if max_calls <= 0:
        log.warning(
            "Daily call limit reached (%d/%d). Try again after midnight UTC.",
            progress["calls_today"], DAILY_CALL_LIMIT
        )
        return wines, 0

    log.info(
        "Starting enrichment: %d wines total, %d calls remaining today",
        len(wines), max_calls
    )

    calls_made = 0
    enriched_count = 0
    skipped_count = 0

    for i, wine in enumerate(wines):
        # Check if we've already processed this wine
        wine_key = f"{wine.get('winery_name', '')}|{wine.get('name', '')}"

        if wine_key in progress["processed"]:
            skipped_count += 1
            continue

        if not needs_enrichment(wine):
            progress["processed"][wine_key] = "already_has_scores"
            skipped_count += 1
            continue

        if calls_made >= max_calls:
            log.warning("Reached call limit for this run (%d calls). Stopping.", max_calls)
            break

        query = build_wine_query_name(wine)
        if not query:
            progress["processed"][wine_key] = "no_query_name"
            continue

        # Try most recent vintage first, then fall back to any vintage
        vintages_to_try = []
        wine_vintages = wine.get("vintages", [])
        if wine_vintages:
            # Try the most recent vintage
            most_recent = str(max(v for v in wine_vintages if isinstance(v, int) and v > 1900))
            vintages_to_try.append(most_recent)
        vintages_to_try.append("2")  # "2" = any vintage as fallback

        result = None
        for vintage in vintages_to_try:
            log.info(
                "[%d/%d] Fetching: %s (vintage %s) — call %d today",
                i + 1, len(wines), query, vintage, progress["calls_today"] + 1
            )

            result = fetch_critic_scores(query, vintage)
            calls_made += 1
            progress["calls_today"] += 1
            time.sleep(DELAY_BETWEEN_CALLS)

            if result["return_code"] == 0 and result["scores"]:
                break
            elif result["return_code"] == 8:
                # Too broad — try appending winery name
                log.debug("Query too broad, trying with more context")
                break
            elif result["return_code"] in (4, 5, 6, 7):
                # Auth/limit errors — stop immediately
                log.error("Fatal API error: %s", result["error"])
                save_progress(progress)
                return wines, calls_made

        if result and result["return_code"] == 0 and result["scores"]:
            # Merge scores into wine entry
            if "scores" not in wine or not isinstance(wine["scores"], dict):
                wine["scores"] = {}
            wine["scores"].update(result["scores"])

            # Optionally enrich metadata if fields are missing
            meta = result.get("metadata", {})
            if not wine.get("region") and meta.get("ws_region"):
                wine["ws_region"] = meta["ws_region"]
            if not wine.get("grapes") and meta.get("ws_grape"):
                wine["ws_grapes"] = meta["ws_grape"]
            if meta.get("ws_price_avg_usd"):
                wine["ws_price_avg_usd"] = meta["ws_price_avg_usd"]

            enriched_count += 1
            progress["processed"][wine_key] = "enriched"
            log.info(
                "  Score: %.1f/100 | Region: %s | Price avg: %s",
                result["scores"].get("wine_searcher_aggregate", {}).get("score", 0),
                meta.get("ws_region", "n/a"),
                meta.get("ws_price_avg_usd", "n/a"),
            )
        else:
            error_msg = result["error"] if result else "no result"
            log.debug("  No scores found: %s", error_msg)
            progress["processed"][wine_key] = f"no_score:{error_msg[:50]}"

        # Save progress every 10 calls
        if calls_made % 10 == 0:
            save_progress(progress)

    save_progress(progress)
    log.info(
        "Done: %d enriched, %d skipped, %d API calls used today (%d this run)",
        enriched_count, skipped_count, progress["calls_today"], calls_made
    )
    return wines, calls_made


# ─── CLI ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Enrich wine data with professional critic scores from Wine-Searcher API"
    )
    parser.add_argument(
        "--wine", "-w",
        help="Single wine name to look up (test mode)"
    )
    parser.add_argument(
        "--vintage", "-v",
        help="Vintage year (e.g. 2015) or NV. Default: any vintage",
        default=None
    )
    parser.add_argument(
        "--max-calls", "-n",
        type=int,
        default=None,
        help=f"Maximum API calls to make (default: daily limit minus calls already made today)"
    )
    parser.add_argument(
        "--input", "-i",
        default=str(MERGED_WINES_PATH),
        help=f"Input JSON file (default: {MERGED_WINES_PATH})"
    )
    parser.add_argument(
        "--output", "-o",
        default=str(OUTPUT_PATH),
        help=f"Output JSON file (default: {OUTPUT_PATH})"
    )
    args = parser.parse_args()

    # Single-wine test mode
    if args.wine:
        log.info("Single wine lookup: %s (vintage: %s)", args.wine, args.vintage or "any")
        result = fetch_critic_scores(args.wine, args.vintage)
        print(json.dumps(result, indent=2, ensure_ascii=False))
        return

    # Full enrichment mode
    if not WINESEARCHER_API_KEY:
        print("ERROR: WINESEARCHER_API_KEY environment variable not set.")
        print("Get a free trial at: https://www.wine-searcher.com/trade/api")
        print("\nFor a single test lookup:")
        print("  python3 winesearcher-scraper.py --wine 'Chateau Margaux' --vintage 2015")
        sys.exit(1)

    # Load merged wine data
    input_path = Path(args.input)
    if not input_path.exists():
        print(f"ERROR: Input file not found: {input_path}")
        sys.exit(1)

    log.info("Loading wines from %s ...", input_path)
    with open(input_path) as f:
        wines = json.load(f)
    log.info("Loaded %d wines", len(wines))

    # Run enrichment
    enriched_wines, calls_made = enrich_wines(wines, max_calls=args.max_calls)

    # Save output
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(enriched_wines, f, ensure_ascii=False, indent=2)

    log.info("Saved %d wines to %s", len(enriched_wines), output_path)
    log.info("API calls used this run: %d", calls_made)

    if calls_made > 0:
        remaining = DAILY_CALL_LIMIT - calls_made
        log.info(
            "Approximate calls remaining today: %d (resets at midnight UTC)",
            max(0, remaining)
        )


if __name__ == "__main__":
    main()
