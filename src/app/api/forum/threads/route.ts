import { isDbConfigured, NOT_READY } from "@/lib/forum";
import { json, readJson } from "@/lib/http";
import { clientIp, hit } from "@/lib/rateLimit";
import { validateQuestion } from "@/lib/validation";

/** Gửi câu hỏi mới: luôn ở trạng thái chờ duyệt, không hiện ngay. */
export async function POST(req: Request) {
  if (!hit(`ask:${clientIp(req.headers)}`, 30, 10 * 60 * 1000)) {
    return json({ error: "Bạn gửi hơi nhanh rồi, đợi một chút rồi thử lại nhé." }, 429);
  }
  const check = validateQuestion(await readJson(req));
  if (!check.ok) return json({ error: check.error }, 400);
  if (!isDbConfigured()) return json({ error: NOT_READY.forum }, 503);
  // TODO(Supabase): lưu vào bảng threads với status = 'pending'.
  return json({ error: NOT_READY.forum }, 503);
}
