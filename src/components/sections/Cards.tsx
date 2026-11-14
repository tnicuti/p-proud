import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import { cardClass } from "@/components/ui/Card";
import { Mascot } from "@/components/ui/Mascot";
import type { Post } from "@/content/posts";
import { toneBg } from "@/content/site";

export function PhaseCard({ n, weeks, title, desc }: { n: number; weeks: string; title: string; desc: string }) {
  return (
    <div className="relative rounded-[18px] border border-line bg-white p-[18px]">
      <div className="mb-2.5 grid h-[34px] w-[34px] place-items-center rounded-full bg-ruby font-display font-extrabold text-white">
        {n}
      </div>
      <small className="font-extrabold text-rose">{weeks}</small>
      <h4>{title}</h4>
      <p className="mt-1.5 mb-0 text-sm text-ink-soft">{desc}</p>
    </div>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cardClass(
        "default",
        "flex flex-col text-ink no-underline transition-transform duration-150 hover:-translate-y-1",
      )}
    >
      <div className={`mb-3.5 grid h-[150px] place-items-center rounded-2xl ${toneBg[post.tone]}`}>
        <Mascot name={post.img} height={120} />
      </div>
      <span>
        <Chip>{post.topic}</Chip>
      </span>
      <h3 className="mt-2.5 text-xl">{post.title}</h3>
      <p className="flex-1 text-[15px] text-ink-soft">{post.summary}</p>
      <div className="flex items-center justify-between text-[13px] text-ink-soft">
        <span>{post.minutes} phút đọc</span>
        <Chip tone="mint">✔ Chuyên gia duyệt</Chip>
      </div>
    </Link>
  );
}
