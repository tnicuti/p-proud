import Link from "next/link";
import { cardClass } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { CommentIcon, HeartIcon } from "@/components/ui/icons";
import { formatDate, type Post } from "@/content/posts";
import { EMPTY_STATS, type PostStats } from "@/lib/blogStore";
import { PostCover } from "./PostCover";

function Counts({ stats }: { stats: PostStats }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex items-center gap-1">
        <HeartIcon size={15} className="text-rose" />
        {stats.likes}
        <span className="sr-only"> lượt thích</span>
      </span>
      <span className="flex items-center gap-1">
        <CommentIcon size={15} className="text-rose" />
        {stats.comments}
        <span className="sr-only"> bình luận</span>
      </span>
    </span>
  );
}

/** Card bài viết trong lưới: thumbnail 16:9, chip chủ đề, tiêu đề, tóm tắt 2 dòng, thời gian đọc, ♡ và 💬. */
export function PostCard({ post, stats = EMPTY_STATS }: { post: Post; stats?: PostStats }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cardClass(
        "default",
        "flex flex-col p-4! text-ink no-underline transition-transform duration-150 hover:-translate-y-1",
      )}
    >
      <PostCover post={post} sizes="(max-width: 600px) 100vw, 360px" mascotHeight={110} className="mb-3.5" />
      <span className="flex flex-wrap gap-1.5">
        <Chip>{post.category}</Chip>
        {post.reviewed && <Chip tone="mint">✔ Chuyên gia duyệt</Chip>}
      </span>
      <h3 className="mt-2.5 text-xl">{post.title}</h3>
      <p className="line-clamp-2 flex-1 text-[15px] text-ink-soft">{post.excerpt}</p>
      <div className="flex items-center justify-between text-[13px] text-ink-soft">
        <span>{post.readMinutes} phút đọc</span>
        <Counts stats={stats} />
      </div>
    </Link>
  );
}

/** Bài nổi bật đầu trang Blog: ảnh bìa lớn bên trái, thông tin bên phải. */
export function FeaturedPost({ post, stats = EMPTY_STATS }: { post: Post; stats?: PostStats }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cardClass(
        "default",
        "mt-4 grid grid-cols-[1.2fr_1fr] items-center gap-6 p-5! text-ink no-underline transition-transform duration-150 hover:-translate-y-1 max-hero:grid-cols-1",
      )}
    >
      <PostCover post={post} sizes="(max-width: 820px) 100vw, 620px" mascotHeight={200} priority />
      <div>
        <span className="flex flex-wrap gap-1.5">
          <Chip tone="gold">Bài nổi bật</Chip>
          <Chip>{post.category}</Chip>
        </span>
        <h2 className="mt-2.5 text-[clamp(26px,3.2vw,36px)]">{post.title}</h2>
        <p className="text-[17px] text-ink-soft">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
          <b className="text-ink">{post.author}</b>
          <span>{formatDate(post.date)}</span>
          <span>{post.readMinutes} phút đọc</span>
          <Counts stats={stats} />
        </div>
      </div>
    </Link>
  );
}

/** Danh sách "Đọc nhiều": ảnh nhỏ + tiêu đề. */
export function PopularList({ posts }: { posts: Post[] }) {
  return (
    <div className={cardClass("default", "p-5!")}>
      <h3 className="mb-3 text-lg">Đọc nhiều</h3>
      <ol className="m-0 grid list-none gap-3.5 p-0">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group flex items-center gap-3 text-ink no-underline">
              <PostCover post={p} sizes="96px" mascotHeight={44} className="w-24 shrink-0 rounded-xl!" />
              <span className="text-[15px] leading-snug font-bold group-hover:text-ruby">{p.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
