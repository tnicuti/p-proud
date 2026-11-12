"use client";

import { Chip } from "@/components/ui/Chip";
import type { ForumThread } from "@/content/forum";

export function relativeTime(iso: string, now = Date.now()): string {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return "Vừa xong";
  if (min < 60) return `${min} phút trước`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} giờ trước`;
  const d = Math.floor(h / 24);
  if (d === 1) return "Hôm qua";
  if (d < 30) return `${d} ngày trước`;
  return new Date(iso).toLocaleDateString("vi-VN");
}

export function ThreadCard({
  thread,
  liked,
  reported,
  onLike,
  onReport,
}: {
  thread: ForumThread;
  liked: boolean;
  reported: boolean;
  onLike: () => void;
  onReport: () => void;
}) {
  const time = thread.timeLabel ?? (thread.createdAt ? relativeTime(thread.createdAt) : "");
  return (
    <article className="mb-3.5 rounded-[18px] border border-line bg-white px-5 py-[18px]">
      <div className="mb-2 flex flex-wrap items-center gap-2.5">
        <div
          aria-hidden="true"
          className="grid h-9 w-9 place-items-center rounded-full text-sm font-extrabold text-white"
          style={{ background: thread.color }}
        >
          {thread.nick.charAt(0)}
        </div>
        <b>{thread.nick}</b>
        <span className="text-[13px] text-ink-soft">· {time}</span>
        <Chip className="ml-auto">{thread.topic}</Chip>
      </div>
      <h4 className="mb-1.5 text-ink">{thread.question}</h4>
      {thread.answers.map((a, i) => (
        <div
          key={i}
          className={`mt-3 rounded-[14px] px-3.5 py-3 text-[15px] ${a.expert ? "bg-gold-soft" : "bg-blush-soft"}`}
        >
          <b className={a.expert ? "text-gold-ink" : "text-ruby"}>
            {a.expert && <span aria-label="Chuyên gia">👑 </span>}
            {a.name}
          </b>
          <br />
          {a.text}
        </div>
      ))}
      <div className="mt-2.5 flex flex-wrap gap-3.5 text-sm text-ink-soft">
        <button
          type="button"
          aria-pressed={liked}
          onClick={onLike}
          disabled={liked}
          className={`border-0 bg-transparent p-0 font-bold ${liked ? "text-ruby" : "text-ink-soft hover:text-ruby"}`}
        >
          {liked ? "♥" : "♡"} {thread.likes} thương
        </button>
        <span>💬 {thread.answers.length} trả lời</span>
        <button
          type="button"
          onClick={onReport}
          disabled={reported}
          className="border-0 bg-transparent p-0 font-bold text-ink-soft hover:text-ruby"
        >
          {reported ? "✓ Đã báo cáo" : "⚑ Báo cáo"}
        </button>
      </div>
    </article>
  );
}
