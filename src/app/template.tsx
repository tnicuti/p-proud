/** Hiệu ứng chuyển trang: fade + trượt lên 8px trong 0.35s. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page pb-16">{children}</div>;
}
