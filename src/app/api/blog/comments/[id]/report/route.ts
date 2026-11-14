import { isDbConfigured } from "@/lib/forum";
import { json } from "@/lib/http";
import { clientIp, hit } from "@/lib/rateLimit";

export async function POST(req: Request) {
  if (!hit(`cmt-report:${clientIp(req.headers)}`, 20, 10 * 60 * 1000)) return json({ ok: false }, 429);
  if (!isDbConfigured()) return json({ ok: false }, 503);
  // TODO(Supabase): thêm vào comment_reports; đủ 3 báo cáo thì ẩn bình luận chờ admin xem.
  return json({ ok: false }, 503);
}
