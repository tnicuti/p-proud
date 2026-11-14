/**
 * Kiểu dữ liệu và hằng số của blog (dùng được ở cả máy chủ và trình duyệt).
 * Nội dung bài nằm trong src/content/blog/<slug>.mdx, đọc bằng src/lib/posts.ts.
 */
import type { MascotName } from "@/content/mascot";
import type { Tone } from "./site";

export const blogTopics = ["Kinh nguyệt", "Tuổi dậy thì", "Chăm sóc bản thân", "Bình đẳng giới"] as const;
export type BlogTopic = (typeof blogTopics)[number];

export interface Post {
  slug: string;
  title: string;
  category: BlogTopic;
  excerpt: string;
  /** Ảnh thật làm cover, vd. "/blog/chon-bang-ve-sinh.webp". Bỏ trống thì dùng minh họa PiPi. */
  cover?: string;
  coverAlt?: string;
  /** Ghi nguồn ảnh, vd. "Ảnh: Tên tác giả / Unsplash". Bắt buộc khi có cover. */
  coverCredit?: string;
  coverCreditUrl?: string;
  /** Từ khóa tìm ảnh, hiện trong khung chờ khi chưa có file ảnh. */
  coverKeywords?: string;
  /** Minh họa PiPi dùng khi không có ảnh thật. */
  mascot: MascotName;
  tone: Tone;
  author: string;
  /** Ngày đăng, dạng YYYY-MM-DD. */
  date: string;
  readMinutes: number;
  /** true khi nhóm và chuyên gia đã duyệt: lúc đó mới hiện chip "Chuyên gia duyệt". */
  reviewed: boolean;
  /** Bài nổi bật ở đầu trang Blog (chỉ nên có một bài). */
  featured: boolean;
  /** Hiện trong mục "Đọc nhiều". */
  popular: boolean;
  /** true khi file cover đã có trong public/. */
  hasCover: boolean;
}

export const postDisclaimer = "Bài viết mang tính giáo dục, không thay thế lời khuyên của bác sĩ.";

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
