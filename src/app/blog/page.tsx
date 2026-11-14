import type { Metadata } from "next";
import { Suspense } from "react";
import { FeaturedPost, PopularList } from "@/components/blog/PostCards";
import { BlogList } from "@/components/sections/BlogList";
import { Wrap } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllPostStats } from "@/lib/blogStore";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog – Góc đọc của PiPi",
  description: "Bài viết ngắn, dễ hiểu về kinh nguyệt, tuổi dậy thì, chăm sóc bản thân và bình đẳng giới.",
};

export default async function BlogPage() {
  const posts = getAllPosts();
  const stats = await getAllPostStats();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const popular = posts.filter((p) => p.popular && p.slug !== featured.slug).slice(0, 4);

  return (
    <Wrap>
      <PageHeader mascot="pipi-calm" chip="Blog" title="Góc đọc của PiPi">
        Bài viết ngắn, dễ hiểu về kinh nguyệt, tuổi dậy thì, chăm sóc bản thân và bình đẳng giới.
      </PageHeader>

      <FeaturedPost post={featured} stats={stats[featured.slug]} />

      <div className="mt-10 grid grid-cols-[1fr_300px] items-start gap-6 max-lg:grid-cols-1">
        <div>
          <Suspense fallback={null}>
            <BlogList posts={posts} stats={stats} featuredSlug={featured.slug} />
          </Suspense>
        </div>
        <aside className="lg:sticky lg:top-24">
          <PopularList posts={popular} />
        </aside>
      </div>
    </Wrap>
  );
}
