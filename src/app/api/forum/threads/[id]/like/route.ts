import { isDbConfigured } from "@/lib/forum";
import { json } from "@/lib/http";

export async function POST() {
  if (!isDbConfigured()) return json({ ok: false }, 503);
  // TODO(Supabase): ghi bảng likes (mỗi thiết bị một lần).
  return json({ ok: false }, 503);
}
