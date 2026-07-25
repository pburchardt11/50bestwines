interface ScoreComparisonProps {
  score: number;
}

function getPercentile(score: number): number {
  // Approximate percentile based on wine scoring distribution:
  // 98-100: top 1%
  // 95-97: top 3%
  // 90-94: top 5-10%
  // 85-89: top 20%
  // 80-84: top 50%
  // Below 80: bottom 50%
  if (score >= 98) return 99;
  if (score >= 95) return 97;
  if (score >= 93) return 93;
  if (score >= 90) return 90;
  if (score >= 88) return 82;
  if (score >= 85) return 75;
  if (score >= 83) return 60;
  if (score >= 80) return 50;
  if (score >= 75) return 30;
  return 15;
}

function getScoreLabel(score: number): string {
  if (score >= 98) return 'Perfect / Near-Perfect';
  if (score >= 95) return 'Classic';
  if (score >= 90) return 'Outstanding';
  if (score >= 85) return 'Very Good';
  if (score >= 80) return 'Good';
  return 'Average';
}

export default function ScoreComparison({ score }: ScoreComparisonProps) {
  const percentile = getPercentile(score);
  const label = getScoreLabel(score);

  return (
    <div className="rounded-2xl border border-card-border bg-card-bg p-6">
      <h2 className="mb-4 font-serif text-xl font-bold text-text">How This Wine Compares</h2>

      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-text/50">
          Better than <span className="font-bold text-wine">{percentile}%</span> of wines
        </span>
        <span className="rounded-full bg-wine/10 px-3 py-1 text-xs font-semibold text-wine/80">
          {label}
        </span>
      </div>

      {/* Score bar */}
      <div className="relative h-4 overflow-hidden rounded-full bg-card-border">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-wine/50 via-wine to-wine-light transition-all duration-700"
          style={{ width: `${percentile}%` }}
        />
        {/* Marker */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${percentile}%` }}
        >
          <div className="h-6 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
        </div>
      </div>

      {/* Scale labels */}
      <div className="mt-2 flex items-center justify-between text-[10px] text-text/30">
        <span>Average</span>
        <span>Good</span>
        <span>Outstanding</span>
        <span>Classic</span>
      </div>
    </div>
  );
}
