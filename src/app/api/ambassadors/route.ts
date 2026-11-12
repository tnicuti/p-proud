import { isDbConfigured, NOT_READY } from "@/lib/forum";
import { json, readJson } from "@/lib/http";
import { clientIp, hit } from "@/lib/rateLimit";
import { validateAmbassador } from "@/lib/validation";

export async function POST(req: Request) {
  if (!hit(`amb:${clientIp(req.headers)}`, 20, 10 * 60 * 1000)) {
    return json({ error: "Bạn gửi hơi nhanh rồi, đợi một chút rồi thử lại nhé." }, 429);
  }
  const check = validateAmbassador(await readJson(req));
  if (!check.ok) return json({ error: check.error }, 400);
  if (!isDbConfigured()) return json({ error: NOT_READY.ambassador }, 503);
  // TODO(Supabase): lưu vào bảng ambassadors.
  return json({ error: NOT_READY.ambassador }, 503);
}
