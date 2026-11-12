import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import { cardClass } from "@/components/ui/Card";
import { Mascot } from "@/components/ui/Mascot";
import type { Post } from "@/content/posts";
import { toneBg } from "@/content/site";

export function SponsorCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="min-w-[180px] rounded-2xl border border-dashed border-rose bg-white px-5 py-3.5 text-center">
      <b className="block font-display text-lg text-ruby">{name}</b>
      <span className="text-[13px] text-ink-soft">{desc}</span>
    </div>
  );
}

export function SponsorList({ sponsors }: { sponsors: { n: string; d: string }[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {sponsors.map((s) => (
        <SponsorCard key={s.n} name={s.n} desc={s.d} />
      ))}
    </div>
  );
}

export function MemberCard({ initials, name, role }: { initials: string; name: string; role: string }) {
  return (
    <div className={cardClass("default", "text-center")}>
      <div
        aria-hidden="true"
        className="mx-auto mb-2.5 grid h-[72px] w-[72px] place-items-center rounded-full border-[3px] border-gold bg-blush-soft font-display text-2xl font-extrabold text-ruby"
      >
        {initials}
      </div>
      <b className="block text-[17px]">{name}</b>
      <span className="text-sm text-ink-soft">{role}</span>
    </div>
  );
}

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
