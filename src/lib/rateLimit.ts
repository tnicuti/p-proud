/**
 * Giới hạn tần suất đơn giản theo cửa sổ thời gian, lưu trong bộ nhớ máy chủ.
 * Đủ cho chatbot kịch bản (không tốn phí). Khi dùng AI thật hoặc diễn đàn có
 * cơ sở dữ liệu, chuyển sang lưu ở Supabase để mọi máy chủ dùng chung số đếm.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function hit(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
    }
    return true;
  }
  if (b.count >= limit) return false;
  b.count += 1;
  return true;
}

export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}
