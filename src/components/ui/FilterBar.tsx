"use client";

export interface FilterOption<T extends string> {
  value: T;
  label: string;
}

export function FilterBar<T extends string>({
  options,
  value,
  onChange,
  label,
  className = "mt-4 mb-6",
}: {
  options: FilterOption<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`rounded-full border-2 px-4 py-2 font-bold ${
              on ? "border-ruby bg-ruby text-white" : "border-line bg-white text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
