"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cardClass } from "@/components/ui/Card";
import { FilterBar } from "@/components/ui/FilterBar";
import { Mascot } from "@/components/ui/Mascot";
import { forumRules, forumTopics, type ForumThread, type ForumTopic } from "@/content/forum";
import { validateQuestion } from "@/lib/validation";
import { ThreadCard } from "./ThreadCard";

const LIKED_KEY = "pproud:liked";
const filterOptions: { value: ForumTopic | ""; label: string }[] = [
  { value: "", label: "Tất cả" },
  ...forumTopics.map((t) => ({ value: t, label: t })),
];

function readLiked(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(LIKED_KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function ForumBoard({ initialThreads }: { initialThreads: ForumThread[] }) {
  const [threads, setThreads] = useState(initialThreads);
  const [topic, setTopic] = useState<ForumTopic | "">("");
  const [liked, setLiked] = useState<string[]>([]);
  const [reported, setReported] = useState<string[]>([]);

  useEffect(() => {
    // Đọc danh sách đã thương sau khi hydrate để tránh lệch HTML giữa máy chủ và trình duyệt.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLiked(readLiked());
  }, []);

  function like(id: string) {
    if (liked.includes(id)) return;
    const next = [...liked, id];
    setLiked(next);
    setThreads((ts) => ts.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t)));
    try {
      localStorage.setItem(LIKED_KEY, JSON.stringify(next));
    } catch {
      /* bỏ qua */
    }
    void fetch(`/api/forum/threads/${encodeURIComponent(id)}/like`, { method: "POST" }).catch(() => {});
  }

  function report(id: string) {
    setReported((r) => [...r, id]);
    void fetch(`/api/forum/threads/${encodeURIComponent(id)}/report`, { method: "POST" }).catch(() => {});
  }

  const shown = threads.filter((t) => !topic || t.topic === topic);

  return (
    <div className="mt-6 grid grid-cols-[1fr_300px] items-start gap-6 max-lg:grid-cols-1">
      <div>
        <FilterBar label="Lọc theo chủ đề" options={filterOptions} value={topic} onChange={setTopic} className="mb-6" />
        {shown.length ? (
          shown.map((t) => (
            <ThreadCard
              key={t.id}
              thread={t}
              liked={liked.includes(t.id)}
              reported={reported.includes(t.id)}
              onLike={() => like(t.id)}
              onReport={() => report(t.id)}
            />
          ))
        ) : (
          <div className={cardClass("default", "text-center")}>
            <Mascot name="pipi-sleep" height={120} className="mx-auto" />
            <p>Chưa có câu hỏi nào ở chủ đề này. Bạn hỏi đầu tiên nhé!</p>
          </div>
        )}
      </div>
      <aside>
        <div className={cardClass("default", "mb-4")}>
          <AskForm />
        </div>
        <div className={cardClass("soft")}>
          <h4>📌 Nội quy cộng đồng</h4>
          <ul className="m-0 pl-[18px]">
            {forumRules.map((r) => (
              <li key={r} className="mb-1.5 text-[15px]">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function AskForm() {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { topic, question, anonymous, nickname };
    const check = validateQuestion(payload);
    if (!check.ok) return setError(check.error);
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/forum/threads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) return setError(data.error ?? "Chưa gửi được, bạn thử lại sau nhé.");
      setSent(true);
      setTopic("");
      setQuestion("");
      setNickname("");
      setAnonymous(true);
    } catch {
      setError("Chưa gửi được, bạn thử lại sau nhé.");
    } finally {
      setSending(false);
    }
  }

  const clear = () => {
    if (error) setError("");
    if (sent) setSent(false);
  };

  return (
    <>
      <h4>Đặt câu hỏi mới</h4>
      <form noValidate onSubmit={onSubmit}>
        <label htmlFor="ask-topic">Chủ đề</label>
        <select id="ask-topic" value={topic} aria-required="true" onChange={(e) => (setTopic(e.target.value), clear())}>
          <option value="">Chọn chủ đề</option>
          {forumTopics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <label htmlFor="ask-q">Câu hỏi của bạn</label>
        <textarea
          id="ask-q"
          rows={4}
          value={question}
          maxLength={600}
          aria-required="true"
          placeholder="Lần đầu có kinh thì nên chuẩn bị gì?"
          onChange={(e) => (setQuestion(e.target.value), clear())}
        />
        <label className="flex items-center gap-2 font-semibold">
          <input type="checkbox" checked={anonymous} onChange={(e) => (setAnonymous(e.target.checked), clear())} /> Đăng
          ẩn danh
        </label>
        {!anonymous && (
          <>
            <label htmlFor="ask-nick">Biệt danh</label>
            <input
              id="ask-nick"
              value={nickname}
              maxLength={30}
              placeholder="Hoa Hướng Dương"
              onChange={(e) => (setNickname(e.target.value), clear())}
            />
          </>
        )}
        <div className="mt-1.5 min-h-[1em] text-[13px] text-ruby" role="alert">
          {error}
        </div>
        {sent && (
          <div role="status" className="mb-3 rounded-[14px] bg-gold-soft px-3.5 py-3 text-[15px] text-gold-ink">
            Cảm ơn bạn! Câu hỏi đang chờ duyệt và sẽ hiện khi chuyên gia xem xong.
          </div>
        )}
        <Button type="submit" size="sm" disabled={sending}>
          {sending ? "Đang gửi…" : "Đăng câu hỏi"}
        </Button>
      </form>
    </>
  );
}
