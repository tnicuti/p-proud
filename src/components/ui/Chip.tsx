import type { ReactNode } from "react";

const tones = {
  pink: "bg-blush-soft text-ruby",
  gold: "bg-gold-soft text-gold-ink",
  mint: "bg-mint-soft text-mint-ink",
};

export function Chip({
  tone = "pink",
  className = "",
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[13px] font-bold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
