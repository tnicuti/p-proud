export function PointsBadge({ points }: { points: number }) {
  return (
    <div className="rounded-full bg-gold px-4 py-1.5 font-display text-lg font-extrabold text-gold-ink">
      👑 <span aria-live="polite">{points}</span> điểm
    </div>
  );
}
