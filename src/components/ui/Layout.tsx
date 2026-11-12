import type { ReactNode } from "react";

/** Container 1160px, padding ngang 20px. */
export function Wrap({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1160px] px-5 ${className}`}>{children}</div>;
}

/** Khối nội dung, cách khối trước 56px. */
export function Block({ className = "", children }: { className?: string; children: ReactNode }) {
  return <section className={`pt-14 ${className}`}>{children}</section>;
}

export function Lead({ className = "", children }: { className?: string; children: ReactNode }) {
  return <p className={`max-w-[720px] text-lg text-ink-soft ${className}`}>{children}</p>;
}

const cols = {
  2: "grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]",
  3: "grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]",
  4: "grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))]",
};

export function Grid({
  cols: n,
  className = "",
  children,
}: {
  cols: 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}) {
  return <div className={`grid gap-5 ${cols[n]} ${className}`}>{children}</div>;
}
