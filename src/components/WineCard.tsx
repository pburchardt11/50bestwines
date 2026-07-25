import Link from 'next/link';
import WishlistButton from '@/components/WishlistButton';

interface WineCardWine {
  slug: string;
  name: string;
  producer: string;
  type: string;
  grape: string;
  region: string;
  country: string;
  vintage: number | null;
  aggregateScore: number;
  price: number;
  priceRange: string;
  badges: string[];
  tastingNotes: string;
}

interface WineCardProps {
  wine: WineCardWine;
  rank?: number;
}

const typeEmoji: Record<string, string> = {
  Red: '🍷',
  White: '🥂',
  Rosé: '🌸',
  Sparkling: '🍾',
  Dessert: '🍯',
  Fortified: '🏺',
};

export default function WineCard({ wine, rank }: WineCardProps) {
  return (
    <Link href={`/wine/${wine.slug}`} className="group block">
      <div className="relative cursor-pointer overflow-hidden rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-200 hover:border-wine/30 hover:shadow-lg hover:shadow-wine/5">
        {rank && (
          <div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-br-xl bg-wine/20 font-serif text-sm font-bold text-wine">
            {rank}
          </div>
        )}
        <div className="absolute top-3 right-3">
          <WishlistButton slug={wine.slug} size="sm" />
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-wine/5 text-3xl">
            {typeEmoji[wine.type] || '🍷'}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="truncate font-serif text-lg font-bold text-text group-hover:text-wine transition-colors">
                {wine.name}
              </h3>
              {wine.vintage && (
                <span className="shrink-0 rounded-full bg-wine/10 px-2 py-0.5 text-[11px] font-medium text-wine/80">
                  {wine.vintage}
                </span>
              )}
            </div>

            <p className="mt-0.5 text-sm text-text/50">{wine.producer}</p>
            <p className="mt-0.5 text-xs text-text/30">{wine.region}, {wine.country} &middot; {wine.grape}</p>

            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-wine/30 bg-wine/5 font-serif text-lg font-bold text-wine shadow-[0_0_12px_rgba(139,34,82,0.15)]">
                {wine.aggregateScore}
              </span>
              <div className="flex flex-wrap gap-1">
                {(() => {
                  const generic = ['Exceptional', 'Outstanding', 'Highly Rated', 'Popular Choice', 'Well Known', 'Best Value'];
                  const rankingBadges = wine.badges.filter(b => !generic.includes(b));
                  const displayBadges = rankingBadges.length > 0
                    ? rankingBadges.slice(0, 2)
                    : wine.badges.slice(0, 2);
                  return displayBadges.map((badge) => (
                    <span key={badge} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      generic.includes(badge)
                        ? 'bg-gold/10 text-gold/80'
                        : 'bg-wine/15 text-wine-light border border-wine/20'
                    }`}>
                      {!generic.includes(badge) && <span className="mr-0.5">⭐</span>}
                      {badge}
                    </span>
                  ));
                })()}
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="rounded bg-wine/10 px-2 py-0.5 text-[11px] font-medium text-wine/80">
                {wine.type}
              </span>
              {wine.price > 0 && (
                <span className="text-xs text-gold font-medium">
                  ${wine.price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
