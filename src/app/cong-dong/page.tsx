import type { Metadata } from "next";
import { AmbassadorForm } from "@/components/sections/AmbassadorForm";
import { SponsorList } from "@/components/sections/Cards";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Block, Grid, Wrap } from "@/components/ui/Layout";
import { Mascot } from "@/components/ui/Mascot";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { communityStats, highlights, sponsors, toneBg } from "@/content/site";

export const metadata: Metadata = {
  title: "Cộng đồng",
  description:
    "Học sinh, thầy cô, phụ huynh và nhà tài trợ cùng lan tỏa thông điệp “kiêu hãnh đón kỳ”. Đăng ký làm Đại sứ P-Proud.",
};

const chipTone = { blush: "pink", gold: "gold", mint: "mint" } as const;

export default function CommunityPage() {
  return (
    <Wrap>
      <PageHeader mascot="pipi-flowers" chip="Cộng đồng" title="Cộng đồng P-Proud">
        Nơi học sinh, thầy cô, phụ huynh và nhà tài trợ cùng lan tỏa thông điệp “kiêu hãnh đón kỳ”.
      </PageHeader>
      <Grid cols={4} className="mt-6">
        {communityStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </Grid>

      <Block>
        <h2>Hoạt động nổi bật</h2>
        <Grid cols={3} className="mt-6">
          {highlights.map((h) => (
            <Card key={h.title}>
              <div className={`mb-3.5 grid h-[150px] place-items-center rounded-2xl ${toneBg[h.tone]}`}>
                <Mascot name={h.img} height={120} />
              </div>
              <Chip tone={chipTone[h.tone]}>{h.chip}</Chip>
              <h3 className="mt-2.5">{h.title}</h3>
              <p>{h.desc}</p>
            </Card>
          ))}
        </Grid>
      </Block>

      <Block>
        <Grid cols={2}>
          <Card>
            <h3>Trở thành Đại sứ P-Proud</h3>
            <p>Bạn muốn lan tỏa thông điệp đến bạn bè? Để lại thông tin, nhóm sẽ liên hệ qua thầy cô chủ nhiệm.</p>
            <AmbassadorForm />
            <p className="mt-2.5 text-[13px] text-ink-soft">Không cần nhập họ tên thật hay số điện thoại.</p>
          </Card>
          <Card variant="soft" className="flex flex-col items-center justify-center text-center">
            <Mascot name="pipi-flowers" height={160} className="mb-2.5" />
            <h3>Cảm ơn nhà tài trợ</h3>
            <p>P-Proud trân trọng sự đồng hành của các nhà tài trợ dự kiến đã cùng chung tay vì sức khỏe nữ sinh.</p>
            <SponsorList sponsors={sponsors} />
          </Card>
        </Grid>
      </Block>
    </Wrap>
  );
}
