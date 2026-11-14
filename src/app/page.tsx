import { OpenChatButton } from "@/components/chat/ChatWidget";
import { PostCard } from "@/components/sections/Cards";
import { LocationSection } from "@/components/sections/LocationSection";
import { SponsorSection } from "@/components/sections/SponsorGrid";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PinIcon } from "@/components/ui/icons";
import { Block, Grid, Lead, Wrap } from "@/components/ui/Layout";
import { Mascot } from "@/components/ui/Mascot";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatCard } from "@/components/ui/StatCard";
import { posts } from "@/content/posts";
import { homeStats, LOCATION_SHORT, pillars, site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Wrap>
        <div className="grid grid-cols-[1.15fr_.85fr] items-center gap-6 pt-12 pb-6 max-hero:grid-cols-1 max-sm:pt-6">
          <div>
            <div className="mb-1.5 font-display text-xl font-bold text-rose">{site.taglineEn}</div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blush-soft px-3 py-1 text-sm font-bold text-ruby">
              <PinIcon size={16} />
              {LOCATION_SHORT}
            </div>
            <h1>
              Kiêu hãnh đón “kỳ”,
              <br />
              <span className="text-rose">tự tin con gái</span>
            </h1>
            <Lead>{site.description}</Lead>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/bo-cong-cu">Bắt đầu học</ButtonLink>
              <OpenChatButton className={buttonClass("ghost")}>Trò chuyện với PiPi</OpenChatButton>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div
              aria-hidden="true"
              className="absolute inset-x-[6%] inset-y-[8%] z-0 rounded-[46%_54%_50%_50%/55%_45%_55%_45%] bg-blush"
            />
            <Mascot
              name="pipi-main"
              height={420}
              alt
              priority
              className="relative z-[1] animate-bob max-hero:h-[300px]!"
            />
            <div className="absolute top-[6%] right-[4%] z-[2] rounded-[20px] border-2 border-rose bg-white px-4 py-2 font-display font-bold text-ruby">
              Chào bạn, mình là PiPi!
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-4 max-md:grid-cols-2">
          {homeStats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <Block>
          <div className="text-center">
            <h2>Ba chữ P của chúng mình</h2>
            <Lead className="mx-auto mb-7">
              Mỗi nội dung trên P-Proud đều xoay quanh ba trụ cột giúp bạn hiểu cơ thể mình và tự tin hơn mỗi ngày.
            </Lead>
          </div>
          <Grid cols={3}>
            {pillars.map((p) => (
              <Card key={p.p} className="text-center">
                <Mascot name={p.img} height={120} className="mx-auto mb-3" />
                <div className="font-display text-[15px] font-extrabold tracking-[.5px] text-rose">{p.p}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Card>
            ))}
          </Grid>
        </Block>

        <Block>
          <LocationSection />
        </Block>

        <Block>
          <Grid cols={2}>
            <Card variant="soft" className="flex items-center gap-5 max-[560px]:flex-col max-[560px]:text-center">
              <Mascot name="pipi-jump" height={130} className="shrink-0" />
              <div>
                <h3>Vừa chơi vừa học</h3>
                <p>Thử thách “Myth hay Fact”, quiz 6 bài học và trò chơi chuẩn bị túi kỳ đầu đang chờ bạn.</p>
                <ButtonLink href="/tro-choi" size="sm">
                  Vào Góc trò chơi
                </ButtonLink>
              </div>
            </Card>
            <Card
              variant="soft"
              className="flex items-center gap-5 bg-gold-soft max-[560px]:flex-col max-[560px]:text-center"
            >
              <Mascot name="pipi-teach" height={130} className="shrink-0" />
              <div>
                <h3>Bộ công cụ miễn phí</h3>
                <p>Cẩm nang nữ sinh, sổ tay giáo viên và poster song ngữ cho lớp học của bạn.</p>
                <ButtonLink href="/bo-cong-cu" size="sm">
                  Xem bộ công cụ
                </ButtonLink>
              </div>
            </Card>
          </Grid>
        </Block>

        <Block>
          <SectionTitle
            title="Bài viết mới"
            action={
              <ButtonLink href="/blog" variant="ghost" size="sm">
                Xem tất cả
              </ButtonLink>
            }
          />
          <Grid cols={3}>
            {posts.slice(0, 3).map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </Grid>
        </Block>
      </Wrap>
      <SponsorSection />
    </>
  );
}
