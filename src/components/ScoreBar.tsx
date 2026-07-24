interface ScoreBarProps {
  label: string;
  score: number;
  max?: number;
}

export default function ScoreBar({ label, score, max = 100 }: ScoreBarProps) {
  const pct = Math.min((score / max) * 100, 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text/70">{label}</span>
        <span className="font-serif text-sm font-bold text-wine">{score}{max === 100 ? '' : `/${max}`}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-card-border">
        <div
          className="h-full rounded-full bg-gradient-to-r from-wine/70 to-wine transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
