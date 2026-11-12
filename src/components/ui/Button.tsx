import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";

type Variant = "primary" | "ghost";

export function buttonClass(variant: Variant = "primary", size: "md" | "sm" = "md", extra = "") {
  return [
    "inline-flex items-center gap-2 rounded-full border-2 font-extrabold no-underline transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0",
    size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-base",
    variant === "primary"
      ? "border-ruby bg-ruby text-white hover:border-ruby-dark hover:bg-ruby-dark"
      : "border-ruby bg-white text-ruby",
    extra,
  ].join(" ");
}

interface Common {
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant, size, className, children }: Common & { href: string }) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  type = "button",
  ref,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement> }) {
  return (
    <button ref={ref} type={type} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
