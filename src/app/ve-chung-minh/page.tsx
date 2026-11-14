import type { Metadata } from "next";
import { PhaseCard } from "@/components/sections/Cards";
import { MemberCard } from "@/components/sections/MemberCard";
import { Card } from "@/components/ui/Card";
import { Block, Grid, Lead, Wrap } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { phases, stakeholders } from "@/content/site";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Về chúng mình",
  description:
    "P-Proud là dự án giáo dục sức khỏe kinh nguyệt do 6 sinh viên UEH thực hiện cho 120 nữ sinh lớp 6–7 tại Quận 8, TP.HCM.",
};

export default function AboutPage() {
  return (
    <Wrap>
      <PageHeader mascot="pipi-hi" chip="Về chúng mình" title="Xin chào, đây là P-Proud!">
        P-Proud là dự án giáo dục sức khỏe kinh nguyệt do 6 sinh viên UEH thực hiện, dành cho 120 nữ sinh lớp 6–7 tại
        một trường THCS ở Quận 8, TP.HCM. Chúng mình tin rằng có kinh là một phần bình thường và đáng tự hào của việc
        lớn lên.
      </PageHeader>

      <Block>
        <Grid cols={2}>
          {[
            {
              ico: "🌸",
              title: "Tầm nhìn",
              text: "Mỗi bạn nữ đều bước vào tuổi dậy thì với đủ hiểu biết, sự tự tin và một môi trường học đường tôn trọng, không còn kỳ thị kinh nguyệt.",
            },
            {
              ico: "👑",
              title: "Sứ mệnh",
              text: "Mang kiến thức kinh nguyệt chính xác, phù hợp lứa tuổi đến học sinh qua website, bài học trực tiếp và bộ công cụ mà nhà trường có thể dùng lại lâu dài.",
            },
          ].map((v) => (
            <Card key={v.title} className="flex items-start gap-4">
              <div
                aria-hidden="true"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-gold-soft text-2xl"
              >
                {v.ico}
              </div>
              <div>
                <h3>{v.title}</h3>
                <p className="m-0">{v.text}</p>
              </div>
            </Card>
          ))}
        </Grid>
      </Block>

      <Block>
        <h2>Hoạt động của dự án</h2>
        <Lead>Dự án kéo dài 23 tuần, chia thành 5 giai đoạn.</Lead>
        <div className="mt-6 grid grid-cols-5 gap-3 max-lg:grid-cols-2 max-xs:grid-cols-1">
          {phases.map((p) => (
            <PhaseCard key={p.n} {...p} />
          ))}
        </div>
      </Block>

      <Block>
        <h2>Đội ngũ P-Proud</h2>
        <div className="mt-6 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-xs:grid-cols-1">
          {team.map((m) => (
            <MemberCard key={m.slug} member={m} />
          ))}
        </div>
      </Block>

      <Block>
        <h2>Các bên đồng hành</h2>
        <Grid cols={3} className="mt-6">
          {stakeholders.map((s) => (
            <Card key={s.title}>
              <h4 className="flex items-center gap-2">
                <span aria-hidden="true">{s.icon}</span> {s.title}
              </h4>
              <ul className="m-0 pl-[18px] text-[15px]">
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </Card>
          ))}
        </Grid>
      </Block>
    </Wrap>
  );
}
