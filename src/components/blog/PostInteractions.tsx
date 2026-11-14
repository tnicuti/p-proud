"use client";

import { useEffect, useState } from "react";
import { CommentIcon, HeartIcon, LinkIcon } from "@/components/ui/icons";
import { deviceId } from "@/lib/device";

/** Thanh tiến trình đọc: vạch mảnh màu rose ở mép trên màn hình. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const done = Math.min(Math.max(-rect.top + window.innerHeight * 0.4, 0), Math.max(total, 1));
      setPct(total > 0 ? (done / total) * 100 : 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);
  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 h-1 bg-transparent"
      role="progressbar"
      aria-label="Tiến độ đọc bài"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
    >
      <div className="h-full bg-rose transition-[width] duration-100" style={{ width: `${pct}%` }} />
    </div>
  );
}

const LIKED_KEY = "pproud:liked-posts";

function readLiked(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(LIKED_KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Thanh tương tác: ♡ thích, 💬 tới phần bình luận, 🔗 sao chép link.
 * Desktop: dính bên trái cột đọc. Mobile: thanh cố định dưới đáy màn hình.
 */
export function PostActions({
  slug,
  initialLikes,
  comments,
}: {
  slug: string;
  initialLikes: number;
  comments: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    // Đọc trạng thái đã thích sau khi hydrate (localStorage chỉ có ở trình duyệt).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLiked(readLiked().includes(slug));
    fetch(`/api/blog/${slug}/like`, { headers: { "x-device-id": deviceId() } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { likes?: number; liked?: boolean } | null) => {
        if (!d) return;
        if (typeof d.likes === "number") setLikes((n) => Math.max(n, d.likes!));
        if (d.liked) setLiked(true);
      })
      .catch(() => {});
  }, [slug]);

  function flash(text: string) {
    setNote(text);
    window.setTimeout(() => setNote(""), 2500);
  }

  async function like() {
    if (liked) return;
    try {
      const res = await fetch(`/api/blog/${slug}/like`, { method: "POST", headers: { "x-device-id": deviceId() } });
      const data = (await res.json().catch(() => ({}))) as { likes?: number; error?: string };
      if (!res.ok) return flash(data.error ?? "Chưa thích được, bạn thử lại sau nhé.");
      setLiked(true);
      setLikes((n) => (typeof data.likes === "number" ? data.likes : n + 1));
      try {
        localStorage.setItem(LIKED_KEY, JSON.stringify([...readLiked(), slug]));
      } catch {
        /* bỏ qua */
      }
    } catch {
      flash("Chưa thích được, bạn thử lại sau nhé.");
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0]);
      flash("Đã sao chép link!");
    } catch {
      flash("Không sao chép được, bạn chép từ thanh địa chỉ nhé.");
    }
  }

  const btn =
    "flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border-2 border-line bg-white px-2.5 text-sm font-bold text-ink no-underline hover:border-rose";

  return (
    <div
      className="z-30 flex gap-2 max-lg:fixed max-lg:bottom-5 max-lg:left-3 max-lg:rounded-full max-lg:border max-lg:border-line max-lg:bg-white/95 max-lg:p-1.5 max-lg:shadow-card lg:sticky lg:top-28 lg:flex-col lg:items-center"
      role="group"
      aria-label="Tương tác với bài viết"
    >
      <button
        type="button"
        onClick={like}
        aria-pressed={liked}
        className={`${btn} ${liked ? "border-rose! text-ruby!" : ""}`}
      >
        <HeartIcon filled={liked} className={liked ? "text-ruby" : "text-rose"} />
        <span>{likes}</span>
        <span className="sr-only">{liked ? "Bạn đã thích bài này" : "Thích bài viết"}</span>
      </button>
      <a href="#binh-luan" className={btn}>
        <CommentIcon className="text-rose" />
        <span>{comments}</span>
        <span className="sr-only">Tới phần bình luận</span>
      </a>
      <button type="button" onClick={copy} className={btn} aria-label="Sao chép link bài viết">
        <LinkIcon className="text-rose" />
      </button>
      <span
        role="status"
        className={`pointer-events-none absolute rounded-full bg-ink px-3 py-1 text-xs whitespace-nowrap text-white max-lg:bottom-full max-lg:left-0 max-lg:mb-2 lg:top-full lg:left-0 lg:mt-2 ${
          note ? "" : "hidden"
        }`}
      >
        {note}
      </span>
    </div>
  );
}
