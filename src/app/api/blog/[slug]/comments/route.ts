import { getApprovedComments } from "@/lib/blogStore";
import { isDbConfigured, NOT_READY } from "@/lib/forum";
import { json, readJson } from "@/lib/http";
import { clientIp, hit } from "@/lib/rateLimit";
import { SLUG_RE, validateComment } from "@/lib/validation";

/** Bình luận đã duyệt của một bài. */
export async function GET(_req: Request, ctx: RouteContext<"/api/blog/[slug]/comments">) {
  const { slug } = await ctx.params;
  if (!SLUG_RE.test(slug)) return json({ error: "Bài viết không hợp lệ." }, 400);
  return json({ comments: await getApprovedComments(slug) });
}

/** Gửi bình luận mới: luôn ở trạng thái chờ duyệt. Giới hạn 5 bình luận / 10 phút / IP. */
export async function POST(req: Request, ctx: RouteContext<"/api/blog/[slug]/comments">) {
  const { slug } = await ctx.params;
  if (!SLUG_RE.test(slug)) return json({ error: "Bài viết không hợp lệ." }, 400);
  const check = validateComment(await readJson(req));
  if (!check.ok) return json({ error: check.error }, 400);
  if (!hit(`cmt:${clientIp(req.headers)}`, 5, 10 * 60 * 1000)) {
    return json({ error: "Bạn gửi hơi nhanh rồi, đợi một chút rồi thử lại nhé." }, 429);
  }
  if (!isDbConfigured()) return json({ error: NOT_READY.comment }, 503);
  // TODO(Supabase): thêm vào post_comments với trạng thái chờ duyệt.
  return json({ error: NOT_READY.comment }, 503);
}
