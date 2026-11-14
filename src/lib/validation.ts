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
  /** Slug bài blog mà câu hỏi liên quan (khi đi từ nút "Đặt câu hỏi trên Diễn đàn"). */
  relatedPost: string | null;
}

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateQuestion(raw: Record<string, unknown>): Result<QuestionInput> {
  const topic = str(raw.topic) as ForumTopic;
  const question = str(raw.question).slice(0, 600);
  const anonymous = raw.anonymous !== false;
  const nickname = anonymous ? "Ẩn danh" : str(raw.nickname).slice(0, 30);

  if (!forumTopics.includes(topic)) return { ok: false, error: "Chọn một chủ đề trước nhé." };
  if (question.length < 10) return { ok: false, error: "Viết câu hỏi dài hơn một chút để mọi người hiểu ý bạn nhé." };
  if (!anonymous && !nickname) return { ok: false, error: "Nhập biệt danh hoặc chọn đăng ẩn danh nhé." };
  if (containsContactInfo(question) || containsContactInfo(nickname)) return { ok: false, error: PII_MESSAGE };
  const related = str(raw.relatedPost).slice(0, 120);
  const relatedPost = SLUG_RE.test(related) ? related : null;
  return { ok: true, value: { topic, question, anonymous, nickname, relatedPost } };
}

export interface CommentInput {
  nickname: string;
  body: string;
}

export const COMMENT_LIMITS = { nickname: 30, bodyMin: 10, bodyMax: 500 } as const;

/** Bình luận blog: biệt danh bắt buộc (≤ 30 ký tự), nội dung 10–500 ký tự, không số điện thoại/email. */
export function validateComment(raw: Record<string, unknown>): Result<CommentInput> {
  const nickname = str(raw.nickname);
  const body = str(raw.body);
  if (!nickname) return { ok: false, error: "Nhập một biệt danh nhé." };
  if (nickname.length > COMMENT_LIMITS.nickname) return { ok: false, error: "Biệt danh tối đa 30 ký tự nhé." };
  if (body.length < COMMENT_LIMITS.bodyMin) {
    return { ok: false, error: "Viết bình luận dài hơn một chút nhé (ít nhất 10 ký tự)." };
  }
  if (body.length > COMMENT_LIMITS.bodyMax) return { ok: false, error: "Bình luận tối đa 500 ký tự nhé." };
  if (containsContactInfo(nickname) || containsContactInfo(body)) {
    return { ok: false, error: "Đừng chia sẻ số điện thoại hay email trong bình luận nhé." };
  }
  return { ok: true, value: { nickname, body } };
}
