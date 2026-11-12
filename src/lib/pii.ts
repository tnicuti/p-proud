/**
 * Phát hiện thông tin liên lạc trong nội dung học sinh gửi (dùng cả client và server).
 * Chỉ bắt được số điện thoại, email và link mạng xã hội. Họ tên thật hay tên
 * trường không lọc tự động được, nên mọi bài diễn đàn đều qua bước duyệt tay.
 */
const PHONE = /(?:\+?84|\b0)(?:[\s.-]?\d){8,10}\b/;
const EMAIL = /[A-Za-z0-9._%+-]+\s*(?:@|\(at\))\s*[A-Za-z0-9-]+(?:\s*\.\s*[A-Za-z]{2,})+/i;
const SOCIAL = /\b(?:facebook\.com|fb\.com|zalo\.me|instagram\.com|tiktok\.com)\//i;

export function containsContactInfo(text: string): boolean {
  return PHONE.test(text) || EMAIL.test(text) || SOCIAL.test(text);
}

export const PII_MESSAGE = "Đừng chia sẻ số điện thoại hay email trên diễn đàn nhé.";
