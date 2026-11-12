import type { HTMLAttributes, ReactNode } from "react";

export function cardClass(variant: "default" | "soft" = "default", extra = "") {
  return `rounded-card p-6 ${
    variant === "soft" ? "border border-transparent bg-blush-soft" : "border border-line bg-white shadow-card"
  } ${extra}`;
}

export function Card({
  variant = "default",
  className = "",
  children,
  ...rest
}: { variant?: "default" | "soft"; className?: string; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cardClass(variant, className)} {...rest}>
      {children}
    </div>
  );
}
