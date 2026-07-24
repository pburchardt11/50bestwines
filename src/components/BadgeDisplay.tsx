interface BadgeDisplayProps {
  badges: string[];
  size?: 'sm' | 'md';
}

const badgeColors: Record<string, string> = {
  'Wine Spectator Top 100': 'bg-amber-900/30 text-amber-400 border-amber-800/30',
  'Parker 95+': 'bg-purple-900/30 text-purple-400 border-purple-800/30',
  'Parker 90+': 'bg-purple-900/20 text-purple-400/80 border-purple-800/20',
  'Decanter World Wine Awards Gold': 'bg-yellow-900/30 text-yellow-400 border-yellow-800/30',
  'Decanter World Wine Awards Platinum': 'bg-slate-700/30 text-slate-300 border-slate-600/30',
  'James Suckling 95+': 'bg-blue-900/30 text-blue-400 border-blue-800/30',
  'James Suckling 100': 'bg-blue-900/40 text-blue-300 border-blue-700/40',
  'Best Value': 'bg-emerald-900/30 text-emerald-400 border-emerald-800/30',
  'Critics Choice': 'bg-wine/20 text-wine-light border-wine/30',
  'Editors Pick': 'bg-gold/10 text-gold border-gold/20',
};

export default function BadgeDisplay({ badges, size = 'md' }: BadgeDisplayProps) {
  if (!badges || badges.length === 0) return null;

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-[10px]'
    : 'px-3 py-1 text-xs';

  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((badge) => {
        const colors = badgeColors[badge] || 'bg-gold/10 text-gold/80 border-gold/20';
        return (
          <span
            key={badge}
            className={`inline-flex items-center gap-1 rounded-full border font-medium ${colors} ${sizeClasses}`}
          >
            <span className="text-[10px]">
              {badge.includes('Gold') || badge.includes('Platinum') ? '🏆' :
               badge.includes('Top 100') ? '⭐' :
               badge.includes('Best Value') ? '💎' :
               badge.includes('100') ? '🌟' : '🏅'}
            </span>
            {badge}
          </span>
        );
      })}
    </div>
  );
}
