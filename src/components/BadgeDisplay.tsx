interface BadgeDisplayProps {
  badges: string[];
  size?: 'sm' | 'md';
}

const genericBadges = ['Exceptional', 'Outstanding', 'Highly Rated', 'Popular Choice', 'Well Known', 'Best Value'];

function getBadgeStyle(badge: string): string {
  if (badge.includes('Wine Spectator')) return 'bg-amber-900/30 text-amber-400 border-amber-800/30';
  if (badge.includes('Robert Parker') || badge.includes('Parker')) return 'bg-purple-900/30 text-purple-400 border-purple-800/30';
  if (badge.includes('Decanter')) return 'bg-yellow-900/30 text-yellow-400 border-yellow-800/30';
  if (badge.includes('James Suckling')) return 'bg-blue-900/30 text-blue-400 border-blue-800/30';
  if (badge.includes('Gambero Rosso')) return 'bg-red-900/30 text-red-400 border-red-800/30';
  if (badge.includes('Wine Enthusiast')) return 'bg-orange-900/30 text-orange-400 border-orange-800/30';
  if (badge.includes('Vinous')) return 'bg-indigo-900/30 text-indigo-400 border-indigo-800/30';
  if (badge.includes('Tim Atkin') || badge.includes("Platter")) return 'bg-teal-900/30 text-teal-400 border-teal-800/30';
  if (badge.includes('Halliday') || badge.includes('Tyson Stelzer')) return 'bg-lime-900/30 text-lime-400 border-lime-800/30';
  if (badge.includes('Guia Penin') || badge.includes('Peñín')) return 'bg-pink-900/30 text-pink-400 border-pink-800/30';
  if (badge.includes('Falstaff') || badge.includes('IWC')) return 'bg-cyan-900/30 text-cyan-400 border-cyan-800/30';
  if (genericBadges.includes(badge)) return 'bg-gold/10 text-gold/80 border-gold/20';
  return 'bg-wine/15 text-wine-light border-wine/25';
}

export default function BadgeDisplay({ badges, size = 'md' }: BadgeDisplayProps) {
  if (!badges || badges.length === 0) return null;

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-[10px]'
    : 'px-3 py-1 text-xs';

  return (
    <div className="flex flex-wrap gap-1.5">
      {/* Only show real ranking badges — filter out generic ones */}
      {badges.filter(b => !genericBadges.includes(b)).map((badge) => {
        const colors = getBadgeStyle(badge);
        return (
          <span
            key={badge}
            className={`inline-flex items-center gap-1 rounded-full border font-medium ${colors} ${sizeClasses}`}
          >
            <span className="text-[10px]">⭐</span>
            {badge}
          </span>
        );
      })}
    </div>
  );
}
