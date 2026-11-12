export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-card border border-line bg-white p-5 text-center">
      <b className="block font-display text-[34px] leading-[1.1] text-ruby">{value}</b>
      <span className="text-sm text-ink-soft">{label}</span>
    </div>
  );
}
