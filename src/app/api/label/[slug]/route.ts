import { NextRequest } from 'next/server';
import { getWineBySlug } from '@/lib/wine-db';

export const revalidate = 86400; // cache for 24h

// Color accents per wine type
const typeAccents: Record<string, string> = {
  Red: '#8B2252',
  White: '#C4A94D',
  Rose: '#D4728C',
  Sparkling: '#B8A44C',
  Dessert: '#C49A3C',
  Fortified: '#7A3B5E',
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Wrap text to fit within a given width (approximate character count per line)
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (current.length + word.length + 1 > maxChars && current.length > 0) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3); // max 3 lines
}

function generateLabelSvg(
  name: string,
  producer: string,
  type: string,
  country: string,
): string {
  const accent = typeAccents[type] || '#8B2252';
  const nameLines = wrapText(name, 22);
  const nameStartY = nameLines.length === 1 ? 185 : nameLines.length === 2 ? 175 : 165;

  // Decorative grape cluster as a subtle element
  const grapeCluster = `
    <g opacity="0.12" transform="translate(150, 90)">
      <circle cx="0" cy="0" r="8" fill="${accent}"/>
      <circle cx="-10" cy="12" r="8" fill="${accent}"/>
      <circle cx="10" cy="12" r="8" fill="${accent}"/>
      <circle cx="-5" cy="-12" r="7" fill="${accent}"/>
      <circle cx="5" cy="-12" r="7" fill="${accent}"/>
      <circle cx="-15" cy="0" r="7" fill="${accent}"/>
      <circle cx="15" cy="0" r="7" fill="${accent}"/>
      <circle cx="0" cy="24" r="7" fill="${accent}"/>
      <line x1="0" y1="-20" x2="0" y2="-45" stroke="${accent}" stroke-width="1.5"/>
      <path d="M0,-45 Q10,-40 5,-30" stroke="${accent}" stroke-width="1" fill="none"/>
      <path d="M0,-45 Q-10,-40 -5,-30" stroke="${accent}" stroke-width="1" fill="none"/>
    </g>`;

  const nameTextElements = nameLines
    .map(
      (line, i) =>
        `<text x="150" y="${nameStartY + i * 30}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-weight="bold" fill="#E8DDD0">${escapeXml(line)}</text>`,
    )
    .join('\n      ');

  const producerY = nameStartY + nameLines.length * 30 + 10;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a0a10"/>
      <stop offset="100%" stop-color="#080808"/>
    </linearGradient>
    <linearGradient id="border" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="${accent}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.3"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="300" height="400" rx="12" fill="url(#bg)"/>

  <!-- Decorative border -->
  <rect x="12" y="12" width="276" height="376" rx="8" fill="none" stroke="url(#border)" stroke-width="1"/>
  <rect x="20" y="20" width="260" height="360" rx="6" fill="none" stroke="${accent}" stroke-opacity="0.15" stroke-width="0.5"/>

  <!-- Top accent line -->
  <line x1="60" y1="50" x2="240" y2="50" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Grape cluster decoration -->
  ${grapeCluster}

  <!-- Wine type label -->
  <rect x="100" y="130" width="100" height="22" rx="11" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-opacity="0.4" stroke-width="0.5"/>
  <text x="150" y="145" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="10" font-weight="600" letter-spacing="2" fill="${accent}">${escapeXml(type.toUpperCase())}</text>

  <!-- Wine name -->
  ${nameTextElements}

  <!-- Divider -->
  <line x1="80" y1="${producerY + 5}" x2="220" y2="${producerY + 5}" stroke="${accent}" stroke-opacity="0.25" stroke-width="0.5"/>

  <!-- Producer -->
  <text x="150" y="${producerY + 28}" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12" font-weight="400" letter-spacing="1" fill="#A09888">${escapeXml(producer.length > 35 ? producer.slice(0, 32) + '...' : producer)}</text>

  <!-- Country -->
  <text x="150" y="${producerY + 50}" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="300" letter-spacing="1.5" fill="#6B6055">${escapeXml(country.toUpperCase())}</text>

  <!-- Bottom accent line -->
  <line x1="60" y1="355" x2="240" y2="355" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Subtle diamond accent -->
  <polygon points="150,340 155,345 150,350 145,345" fill="${accent}" fill-opacity="0.3"/>
</svg>`;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const wine = await getWineBySlug(slug);

  // Fallback values if wine not found
  const name = wine?.name || slug.replace(/-/g, ' ');
  const producer = wine?.producer || '';
  const type = wine?.type || 'Red';
  const country = wine?.country || '';

  const svg = generateLabelSvg(name, producer, type, country);

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400',
    },
  });
}
