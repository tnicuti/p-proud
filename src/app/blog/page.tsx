import type { Metadata } from "next";
import { BlogList } from "@/components/sections/BlogList";
import { Wrap } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Blog – Góc đọc của PiPi",
  description: "Bài viết ngắn, dễ hiểu về kinh nguyệt, tuổi dậy thì, chăm sóc bản thân và bình đẳng giới.",
};

export default function BlogPage() {
  return (
    <Wrap>
      <PageHeader mascot="pipi-calm" chip="Blog" title="Góc đọc của PiPi">
        Bài viết ngắn, dễ hiểu về kinh nguyệt, tuổi dậy thì, chăm sóc bản thân và bình đẳng giới.
      </PageHeader>
      <BlogList />
    </Wrap>
  );
}
