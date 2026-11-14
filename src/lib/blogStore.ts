/**
 * Lượt thích và bình luận của blog.
 * Chưa nối Supabase: mọi số đếm là 0, danh sách bình luận trống, thao tác ghi trả "đang được cài đặt".
 *
 * Bảng cần tạo khi nối Supabase:
 *   post_likes(post_slug, device_id, created_at), unique (post_slug, device_id)
 *   post_comments(id, post_slug, nickname, body, status mặc định "pending", is_expert, created_at)
 *   comment_reports(id, comment_id, device_id, created_at)
 */
export interface PublicComment {
  id: string;
  nickname: string;
  body: string;
  isExpert: boolean;
  createdAt: string;
}

export interface PostStats {
  likes: number;
  comments: number;
}

export const EMPTY_STATS: PostStats = { likes: 0, comments: 0 };

/** Số ♡ và 💬 của từng bài (chỉ tính bình luận đã duyệt). */
export async function getAllPostStats(): Promise<Record<string, PostStats>> {
  // TODO(Supabase): đếm từ post_likes và post_comments đã duyệt.
  return {};
}

export async function getApprovedComments(slug: string): Promise<PublicComment[]> {
  void slug;
  // TODO(Supabase): lấy post_comments theo post_slug, chỉ bình luận đã duyệt.
  return [];
}
