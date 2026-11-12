/**
 * Kiểm tra dữ liệu form, dùng chung ở trình duyệt (báo lỗi ngay) và máy chủ (chặn thật).
 * Câu báo lỗi lấy từ prototype.
 */
import { forumTopics, type ForumTopic } from "@/content/forum";
import { containsContactInfo, PII_MESSAGE } from "./pii";

export const ambassadorRoles = ["Học sinh", "Thầy cô", "Phụ huynh"] as const;
export type AmbassadorRole = (typeof ambassadorRoles)[number];

/** Chỉ người lớn mới được để lại email/số điện thoại (học sinh liên hệ qua thầy cô). */
export const rolesWithContact: AmbassadorRole[] = ["Thầy cô", "Phụ huynh"];

export interface AmbassadorInput {
  nickname: string;
  role: AmbassadorRole;
  contact: string | null;
  reason: string | null;
}

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(?:\+?84|0)\d{9,10}$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function validateAmbassador(raw: Record<string, unknown>): Result<AmbassadorInput> {
  const nickname = str(raw.nickname).slice(0, 40);
  const role = str(raw.role) as AmbassadorRole;
  const reason = str(raw.reason).slice(0, 500);
  let contact = str(raw.contact).slice(0, 80);

  if (!nickname) return { ok: false, error: "Nhập một biệt danh nhé." };
  if (!ambassadorRoles.includes(role)) return { ok: false, error: "Cho chúng mình biết bạn là ai nhé." };
  if (containsContactInfo(nickname) || containsContactInfo(reason)) return { ok: false, error: PII_MESSAGE };

  if (!rolesWithContact.includes(role)) contact = "";
  if (contact) {
    const phone = contact.replace(/[\s.-]/g, "");
    if (!EMAIL_RE.test(contact) && !PHONE_RE.test(phone)) {
      return { ok: false, error: "Email hoặc số điện thoại chưa đúng, bạn kiểm tra lại nhé." };
    }
  }
  return { ok: true, value: { nickname, role, contact: contact || null, reason: reason || null } };
}

export interface QuestionInput {
  topic: ForumTopic;
  question: string;
  anonymous: boolean;
  nickname: string;
}

export function validateQuestion(raw: Record<string, unknown>): Result<QuestionInput> {
  const topic = str(raw.topic) as ForumTopic;
  const question = str(raw.question).slice(0, 600);
  const anonymous = raw.anonymous !== false;
  const nickname = anonymous ? "Ẩn danh" : str(raw.nickname).slice(0, 30);

  if (!forumTopics.includes(topic)) return { ok: false, error: "Chọn một chủ đề trước nhé." };
  if (question.length < 10) return { ok: false, error: "Viết câu hỏi dài hơn một chút để mọi người hiểu ý bạn nhé." };
  if (!anonymous && !nickname) return { ok: false, error: "Nhập biệt danh hoặc chọn đăng ẩn danh nhé." };
  if (containsContactInfo(question) || containsContactInfo(nickname)) return { ok: false, error: PII_MESSAGE };
  return { ok: true, value: { topic, question, anonymous, nickname } };
}
