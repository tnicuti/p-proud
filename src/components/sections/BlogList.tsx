"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PostCard } from "@/components/blog/PostCards";
import { FilterBar } from "@/components/ui/FilterBar";
import { Mascot } from "@/components/ui/Mascot";
import { blogTopics, type BlogTopic, type Post } from "@/content/posts";
import type { PostStats } from "@/lib/blogStore";

const options: { value: BlogTopic | ""; label: string }[] = [
  { value: "", label: "Tất cả" },
  ...blogTopics.map((t) => ({ value: t, label: t })),
];

/** Lưới bài viết có lọc theo chủ đề. Chủ đề nằm trên URL (?chu-de=...) để chia sẻ và quay lại được. */
export function BlogList({
  posts,
  stats,
  featuredSlug,
}: {
  posts: Post[];
  stats: Record<string, PostStats>;
  /** Bài đã hiện ở khối nổi bật: ẩn khỏi lưới khi xem "Tất cả", vẫn hiện khi lọc theo chủ đề. */
  featuredSlug?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const raw = params.get("chu-de") ?? "";
  const topic = (blogTopics as readonly string[]).includes(raw) ? (raw as BlogTopic) : "";

  function setTopic(t: BlogTopic | "") {
    router.replace(t ? `${pathname}?chu-de=${encodeURIComponent(t)}` : pathname, { scroll: false });
  }

  const shown = posts.filter((p) => (topic ? p.category === topic : p.slug !== featuredSlug));

  return (
    <>
      <FilterBar label="Lọc theo chủ đề" options={options} value={topic} onChange={setTopic} className="mb-6" />
      {shown.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-5">
          {shown.map((p) => (
            <PostCard key={p.slug} post={p} stats={stats[p.slug]} />
          ))}
        </div>
      ) : (
        <div className="rounded-card border border-line bg-white p-6 text-center">
          <Mascot name="pipi-sleep" height={120} className="mx-auto" />
          <p className="m-0">Chưa có bài viết nào ở chủ đề này.</p>
        </div>
      )}
    </>
  );
}
