import { isDbConfigured, NOT_READY } from "@/lib/forum";
import { json } from "@/lib/http";
import { clientIp, hit } from "@/lib/rateLimit";
import { SLUG_RE } from "@/lib/validation";

/** Trạng thái thích của bài với thiết bị hiện tại. */
export async function GET(_req: Request, ctx: RouteContext<"/api/blog/[slug]/like">) {
  const { slug } = await ctx.params;
  if (!SLUG_RE.test(slug)) return json({ error: "Bài viết không hợp lệ." }, 400);
  // TODO(Supabase): đếm post_likes theo slug, kiểm tra device_id (header x-device-id).
  return json({ likes: 0, liked: false });
}

/** Thích bài: mỗi thiết bị một lần (unique post_slug + device_id ở máy chủ). */
export async function POST(req: Request, ctx: RouteContext<"/api/blog/[slug]/like">) {
  const { slug } = await ctx.params;
  if (!SLUG_RE.test(slug)) return json({ error: "Bài viết không hợp lệ." }, 400);
  if (!hit(`like:${clientIp(req.headers)}`, 60, 10 * 60 * 1000)) {
    return json({ error: "Bạn bấm hơi nhanh rồi, đợi một chút nhé." }, 429);
  }
  const device = (req.headers.get("x-device-id") ?? "").slice(0, 64);
  if (!device) return json({ error: "Trình duyệt chưa cho phép lưu lượt thích." }, 400);
  if (!isDbConfigured()) return json({ error: NOT_READY.like }, 503);
  // TODO(Supabase): thêm vào post_likes (bỏ qua nếu đã có), trả số đếm mới.
  return json({ error: NOT_READY.like }, 503);
}
