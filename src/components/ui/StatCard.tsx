import { PinIcon } from "./icons";

export function StatCard({ value, label, pin }: { value: string; label: string; pin?: boolean }) {
  return (
    <div className="rounded-card border border-line bg-white p-5 text-center">
      <b className="flex items-center justify-center gap-1.5 font-display text-[34px] leading-[1.1] text-ruby">
        {pin && <PinIcon size={24} className="text-rose" />}
        {value}
      </b>
      <span className="text-sm text-ink-soft">{label}</span>
    </div>
  );
}
