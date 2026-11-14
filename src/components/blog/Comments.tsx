"use client";

import { useState } from "react";
import { relativeTime } from "@/components/forum/ThreadCard";
import { Button } from "@/components/ui/Button";
import type { PublicComment } from "@/lib/blogStore";
import { COMMENT_LIMITS, validateComment } from "@/lib/validation";

/** Khu bình luận: danh sách đã duyệt + form gửi (bình luận mới chờ admin duyệt). */
export function Comments({ slug, initialComments }: { slug: string; initialComments: PublicComment[] }) {
  const [nickname, setNickname] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [reported, setReported] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { nickname, body };
    const check = validateComment(payload);
    if (!check.ok) return setError(check.error);
    setError("");
    setSending(true);
    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) return setError(data.error ?? "Chưa gửi được, bạn thử lại sau nhé.");
      setSent(true);
      setBody("");
    } catch {
      setError("Chưa gửi được, bạn thử lại sau nhé.");
    } finally {
      setSending(false);
    }
  }

  function report(id: string) {
    setReported((r) => [...r, id]);
    void fetch(`/api/blog/comments/${encodeURIComponent(id)}/report`, { method: "POST" }).catch(() => {});
  }

  const clear = () => {
    if (error) setError("");
    if (sent) setSent(false);
  };

  return (
    <section id="binh-luan" className="scroll-mt-24">
      <h2 className="text-[clamp(24px,3vw,30px)]">Bình luận ({initialComments.length})</h2>

      {initialComments.length === 0 ? (
        <p className="text-ink-soft">Chưa có bình luận nào. Bạn chia sẻ cảm nghĩ đầu tiên nhé!</p>
      ) : (
        <ul className="m-0 mb-5 grid list-none gap-3 p-0">
          {initialComments.map((c) => (
            <li
              key={c.id}
              className={`rounded-[14px] px-4 py-3 text-[15px] ${c.isExpert ? "bg-gold-soft" : "bg-blush-soft"}`}
            >
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <b className={c.isExpert ? "text-gold-ink" : "text-ruby"}>
                  {c.isExpert && <span aria-label="Chuyên gia">👑 </span>}
                  {c.nickname}
                </b>
                <span className="text-[13px] text-ink-soft">· {relativeTime(c.createdAt)}</span>
                <button
                  type="button"
                  disabled={reported.includes(c.id)}
                  onClick={() => report(c.id)}
                  className="ml-auto border-0 bg-transparent p-0 text-[13px] font-bold text-ink-soft hover:text-ruby"
                >
                  {reported.includes(c.id) ? "✓ Đã báo cáo" : "⚑ Báo cáo"}
                </button>
              </div>
              {c.body}
            </li>
          ))}
        </ul>
      )}

      <form noValidate onSubmit={onSubmit} className="rounded-card border border-line bg-white p-5 shadow-card">
        <h3 className="text-lg">Viết bình luận</h3>
        <label htmlFor="cmt-nick">Biệt danh</label>
        <input
          id="cmt-nick"
          value={nickname}
          maxLength={COMMENT_LIMITS.nickname}
          placeholder="Hoa Hướng Dương"
          aria-required="true"
          autoComplete="off"
          onChange={(e) => (setNickname(e.target.value), clear())}
        />
        <label htmlFor="cmt-body">Bình luận của bạn</label>
        <textarea
          id="cmt-body"
          rows={4}
          value={body}
          maxLength={COMMENT_LIMITS.bodyMax}
          aria-required="true"
          aria-describedby="cmt-hint"
          onChange={(e) => (setBody(e.target.value), clear())}
        />
        <p id="cmt-hint" className="mt-1.5 mb-0 text-[13px] text-ink-soft">
          Không cần tên thật. Đừng chia sẻ số điện thoại, email hay tên trường nhé. {body.length}/
          {COMMENT_LIMITS.bodyMax}
        </p>
        <div className="mt-1.5 min-h-[1em] text-[13px] text-ruby" role="alert">
          {error}
        </div>
        {sent && (
          <div role="status" className="mb-3 rounded-[14px] bg-gold-soft px-3.5 py-3 text-[15px] text-gold-ink">
            Cảm ơn bạn! Bình luận sẽ hiện sau khi được duyệt.
          </div>
        )}
        <Button type="submit" size="sm" disabled={sending}>
          {sending ? "Đang gửi…" : "Gửi bình luận"}
        </Button>
      </form>
    </section>
  );
}
