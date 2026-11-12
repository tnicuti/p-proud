import type { Metadata } from "next";
import { KitsSection, LessonList } from "@/components/sections/Toolkit";
import { Block, Lead, Wrap } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Bộ công cụ",
  description:
    "Cẩm nang nữ sinh, sổ tay giáo viên, poster song ngữ và 6 bài học trực tuyến về kinh nguyệt cho học sinh 11–13 tuổi.",
};

export default function ToolkitPage() {
  return (
    <Wrap>
      <PageHeader mascot="pipi-teach" chip="Bộ công cụ" title="Bộ công cụ P-Proud">
        Tài liệu được soạn cùng hội đồng chuyên môn, phù hợp với học sinh 11–13 tuổi. Thầy cô và phụ huynh có thể dùng
        lại mỗi năm học.
      </PageHeader>
      <KitsSection />
      <Block>
        <h2>6 bài học trực tuyến</h2>
        <Lead>Học theo thứ tự hoặc chọn bài bạn quan tâm. Cuối mỗi bài có một quiz nhỏ.</Lead>
        <LessonList />
      </Block>
    </Wrap>
  );
}
