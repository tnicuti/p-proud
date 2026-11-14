import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoCredit } from "@/components/blog/ArticleBlocks";
import { Comments } from "@/components/blog/Comments";
import { PostCard } from "@/components/blog/PostCards";
import { PostCover } from "@/components/blog/PostCover";
import { PostActions, ReadingProgress } from "@/components/blog/PostInteractions";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ClockIcon } from "@/components/ui/icons";
import { Wrap } from "@/components/ui/Layout";
import { Mascot } from "@/components/ui/Mascot";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { shareImage } from "@/content/mascot";
import { formatDate, postDisclaimer } from "@/content/posts";
import { team } from "@/content/team";
import { EMPTY_STATS, getAllPostStats, getApprovedComments } from "@/lib/blogStore";
import { getPublicThreads } from "@/lib/forum";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/posts";

// Mỗi bài được dựng sẵn lúc build (generateStaticParams), nên không cần kiểm tra "instant" cho params.
export const instant = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: post.hasCover && post.cover ? [{ url: post.cover, alt: post.coverAlt ?? post.title }] : [shareImage],
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/blog/${post.slug}.mdx`);
  const [allStats, comments, threads] = await Promise.all([
    getAllPostStats(),
    getApprovedComments(post.slug),
    getPublicThreads(),
  ]);
  const stats = allStats[post.slug] ?? EMPTY_STATS;
  const related = getRelatedPosts(post);
  const sameTopicThreads = threads.filter((t) => t.topic === post.category).slice(0, 3);
  const topicQuery = `chu-de=${encodeURIComponent(post.category)}`;
  const authorInitials = team.find((m) => post.author.startsWith(m.name))?.initials ?? "PP";

  return (
    <Wrap>
      <ReadingProgress targetId="bai-viet" />

      <header className="mx-auto max-w-[820px] pt-8">
        <nav aria-label="Đường dẫn" className="mb-4 text-sm font-bold text-ink-soft">
          <Link href="/blog">Blog</Link> <span aria-hidden="true">/</span>{" "}
          <Link href={`/blog?${topicQuery}`}>{post.category}</Link>
        </nav>
        <Chip>{post.category}</Chip>
        <h1 className="mt-2.5 text-[clamp(32px,4.5vw,48px)]">{post.title}</h1>
        <p className="text-xl leading-[1.6] text-ink-soft italic">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-soft">
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full border-2 border-gold bg-blush-soft font-display text-sm font-extrabold text-ruby"
            >
              {authorInitials}
            </span>
            <b className="text-ink">{post.author}</b>
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1">
            <ClockIcon size={15} />
            {post.readMinutes} phút đọc
          </span>
          {post.reviewed && <Chip tone="mint">✔ Chuyên gia duyệt</Chip>}
        </div>
      </header>

      <figure className="mx-0 mt-7 mb-0">
        <PostCover
          post={post}
          sizes="(max-width: 1200px) 100vw, 1120px"
          mascotHeight={240}
          priority
          className="max-h-[560px] w-full rounded-card!"
        />
        {post.hasCover && post.coverCredit && (
          <figcaption className="mt-2 text-center text-sm text-ink-soft">
            <PhotoCredit credit={post.coverCredit} url={post.coverCreditUrl} />
          </figcaption>
        )}
      </figure>

      <div className="mt-9 grid justify-center gap-8 lg:grid-cols-[64px_minmax(0,680px)_64px]">
        <div>
          <PostActions slug={post.slug} initialLikes={stats.likes} comments={comments.length} />
        </div>

        <div className="min-w-0">
          <article id="bai-viet" className="prose-article">
            <Body />
          </article>

          <p className="mt-8 text-sm text-ink-soft">{postDisclaimer}</p>

          <section className="mt-8 rounded-card bg-blush-soft p-6">
            <div className="flex items-start gap-4 max-sm:flex-col">
              <Mascot name="pipi-search" height={84} className="shrink-0" />
              <div>
                <h2 className="mb-1.5 text-2xl">Còn thắc mắc?</h2>
                <p>Bạn còn câu hỏi về chủ đề này? Hỏi ẩn danh trên Diễn đàn, chuyên gia sẽ trả lời bạn.</p>
                <ButtonLink href={`/dien-dan?${topicQuery}&bai=${post.slug}`} size="sm">
                  Đặt câu hỏi trên Diễn đàn
                </ButtonLink>
              </div>
            </div>
            {sameTopicThreads.length > 0 && (
              <div className="mt-5 border-t border-blush pt-4">
                <b className="mb-2 block text-sm text-ink-soft">Mọi người đang hỏi về “{post.category}”</b>
                <ul className="m-0 grid list-none gap-2 p-0">
                  {sameTopicThreads.map((t) => (
                    <li key={t.id}>
                      <Link
                        href={`/dien-dan?${topicQuery}`}
                        className="block rounded-[14px] bg-white px-4 py-2.5 text-[15px] font-bold text-ink no-underline hover:text-ruby"
                      >
                        {t.question}
                        <span className="mt-0.5 block text-[13px] font-normal text-ink-soft">
                          {t.answers.length} trả lời · {t.likes} thương
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <div className="mt-10">
            <Comments slug={post.slug} initialComments={comments} />
          </div>
        </div>
      </div>

      <section className="pt-14">
        <SectionTitle
          title="Bài viết cùng chủ đề"
          action={
            <ButtonLink href={`/blog?${topicQuery}`} variant="ghost" size="sm">
              Đọc thêm
            </ButtonLink>
          }
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} stats={allStats[p.slug]} />
          ))}
        </div>
      </section>
    </Wrap>
  );
}
