import Image from "next/image";
import { buttonClass } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Wrap } from "@/components/ui/Layout";
import { CONTACT_EMAIL } from "@/content/site";
import { sponsors, sponsorSection, type Sponsor } from "@/content/sponsors";
import { Eyebrow } from "./LocationSection";

const cell =
  "flex min-h-24 flex-col items-center justify-center rounded-2xl border border-line bg-white px-4 py-3 text-center";

function SponsorCell({ sponsor }: { sponsor: Sponsor }) {
  const showLogo = sponsor.status === "confirmed" && sponsor.logo;
  const body = showLogo ? (
    <Image
      src={sponsor.logo!}
      alt={sponsor.name}
      width={160}
      height={48}
      className="max-h-12 w-auto object-contain opacity-80 grayscale-[60%] transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
    />
  ) : (
    <>
      <b className="block font-display text-lg leading-tight text-ruby">{sponsor.name}</b>
      <span className="text-[13px] text-ink-soft">{sponsor.description}</span>
      {sponsor.status === "prospective" && (
        <Chip tone="gold" className="mt-1.5 px-2! py-0! text-[11px]!">
          Dự kiến
        </Chip>
      )}
    </>
  );
  return sponsor.url && sponsor.status === "confirmed" ? (
    <a href={sponsor.url} target="_blank" rel="noopener" className={`group no-underline ${cell}`}>
      {body}
    </a>
  ) : (
    <div className={`group ${cell}`}>{body}</div>
  );
}

/** Lưới ô nhà tài trợ: 3 cột desktop, 2 cột mobile. Dùng chung cho Trang chủ và Cộng đồng. */
export function SponsorGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`grid w-full grid-cols-3 gap-3 max-md:grid-cols-2 ${className}`}>
      {sponsors.map((s) => (
        <SponsorCell key={s.name} sponsor={s} />
      ))}
      <div className={`${cell} border-dashed border-rose bg-transparent`}>
        <span className="mb-1.5 text-sm font-bold text-ink-soft">{sponsorSection.ctaText}</span>
        <a href={`mailto:${CONTACT_EMAIL}`} className={buttonClass("ghost", "sm", "px-3! py-1!")}>
          {sponsorSection.ctaButton}
        </a>
      </div>
    </div>
  );
}

/** Section đầy đủ ở Trang chủ (nền blush-soft tràn ngang). */
export function SponsorSection() {
  return (
    <section className="mt-14 bg-blush-soft py-12">
      <Wrap className="text-center">
        <Eyebrow>{sponsorSection.eyebrow}</Eyebrow>
        <h2 className="mb-6">{sponsorSection.title}</h2>
        <SponsorGrid className="mx-auto max-w-[820px]" />
      </Wrap>
    </section>
  );
}
