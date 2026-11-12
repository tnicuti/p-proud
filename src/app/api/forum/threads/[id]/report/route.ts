import { isDbConfigured } from "@/lib/forum";
import { json } from "@/lib/http";

export async function POST() {
  if (!isDbConfigured()) return json({ ok: false }, 503);
  // TODO(Supabase): ghi bảng reports, đủ 3 báo cáo thì ẩn thread chờ admin xem.
  return json({ ok: false }, 503);
}
