import type { Metadata } from "next";
import { ForumBoard } from "@/components/forum/ForumBoard";
import { Wrap } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPublicThreads } from "@/lib/forum";

export const metadata: Metadata = {
  title: "Diễn đàn hỏi đáp",
  description: "Hỏi điều bạn còn ngại hỏi về kinh nguyệt và tuổi dậy thì. Đăng ẩn danh, chuyên gia trả lời.",
};

export default async function ForumPage() {
  const threads = await getPublicThreads();
  return (
    <Wrap>
      <PageHeader mascot="pipi-search" chip="Diễn đàn" title="Diễn đàn hỏi đáp">
        Hỏi điều bạn còn ngại hỏi. Bạn có thể đăng ẩn danh, câu trả lời có vương miện vàng đến từ chuyên gia.
      </PageHeader>
      <ForumBoard initialThreads={threads} />
    </Wrap>
  );
}
