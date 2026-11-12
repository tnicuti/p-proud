import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/sections/Cards";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Block, Grid, Wrap } from "@/components/ui/Layout";
import { Mascot } from "@/components/ui/Mascot";
import { getPost, postDisclaimer, posts } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", title: post.title, description: post.summary },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug && p.topic === post.topic).slice(0, 3);

  return (
    <Wrap>
      <nav aria-label="Đường dẫn" className="pt-8 text-sm">
        <Link href="/blog" className="font-bold">
          ← Góc đọc của PiPi
        </Link>
      </nav>
      <Card className="mx-auto mt-4 max-w-[760px] p-7 max-sm:p-5">
        <article>
          <Chip>{post.topic}</Chip>
          <h1 className="mt-2.5 text-[clamp(28px,3.6vw,40px)] font-bold">{post.title}</h1>
          <div className="mb-3 flex items-center gap-4">
            <Mascot name={post.img} height={90} className="shrink-0" />
            <p className="m-0 text-ink-soft">{post.summary}</p>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-[13px] text-ink-soft">
            <span>{post.minutes} phút đọc</span>
            <Chip tone="mint">✔ Chuyên gia duyệt</Chip>
          </div>
          {/* Nội dung tĩnh do nhóm soạn trong src/content/posts.ts */}
          <div className="prose-post" dangerouslySetInnerHTML={{ __html: post.body }} />
          <p className="mt-4 text-[13px] text-ink-soft">{postDisclaimer}</p>
        </article>
      </Card>
      {related.length > 0 && (
        <Block>
          <h2>Bài cùng chủ đề</h2>
          <Grid cols={3}>
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </Grid>
        </Block>
      )}
    </Wrap>
  );
}
