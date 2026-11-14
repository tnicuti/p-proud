/**
 * Hiệu ứng chuyển trang: fade + trượt lên 8px trong 0.35s.
 * Chừa 120px cuối trang để nút chat nổi không che nội dung.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page pb-[120px]">{children}</div>;
}
