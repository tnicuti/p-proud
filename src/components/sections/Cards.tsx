export function PhaseCard({ n, weeks, title, desc }: { n: number; weeks: string; title: string; desc: string }) {
  return (
    <div className="relative rounded-[18px] border border-line bg-white p-[18px]">
      <div className="mb-2.5 grid h-[34px] w-[34px] place-items-center rounded-full bg-ruby font-display font-extrabold text-white">
        {n}
      </div>
      <small className="font-extrabold text-rose">{weeks}</small>
      <h4>{title}</h4>
      <p className="mt-1.5 mb-0 text-sm text-ink-soft">{desc}</p>
    </div>
  );
}
