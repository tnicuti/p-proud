import { seedThreads, type ForumThread } from "@/content/forum";

/** Có cấu hình Supabase hay chưa (biến môi trường chỉ đọc ở máy chủ). */
export function isDbConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Danh sách thread đã duyệt để hiện công khai.
 * Chưa nối Supabase: trả 4 thread mẫu từ prototype.
 */
export async function getPublicThreads(): Promise<ForumThread[]> {
  return seedThreads;
}

export const NOT_READY = {
  forum: "Diễn đàn đang được cài đặt, bạn quay lại sau nhé.",
  ambassador: "Form đăng ký đang được cài đặt, bạn quay lại sau nhé.",
};
