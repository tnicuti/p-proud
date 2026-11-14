/** Các khối dùng trong bài MDX: <PullQuote>, <PiPiNote>, <Figure>, <Sources>. */
import Image from "next/image";
import type { ReactNode } from "react";
import { Mascot } from "@/components/ui/Mascot";
import type { MascotName } from "@/content/mascot";
import { toneBg, type Tone } from "@/content/site";
import { publicFileExists } from "@/lib/posts";

/** Câu trích nổi bật: chữ lớn màu ruby, viền trái rose. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-8 border-l-[5px] border-rose py-1 pl-5 font-display text-[clamp(22px,3vw,28px)] leading-[1.35] font-bold text-ruby">
      {children}
    </blockquote>
  );
}

/** Hộp mẹo quan trọng, nền vàng nhạt kèm PiPi. */
export function PiPiNote({ title = "PiPi nhắc nhỏ", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-8 flex items-start gap-4 rounded-card bg-gold-soft p-5 text-[16px] leading-[1.65] text-gold-ink max-sm:flex-col max-sm:gap-2">
      <Mascot name="pipi-teach" height={72} className="shrink-0" />
      <div>
        <b className="block font-display text-lg">{title}</b>
        {children}
      </div>
    </aside>
  );
}

export function PhotoCredit({ credit, url }: { credit?: string; url?: string }) {
  if (!credit) return null;
  return url ? (
    <a href={url} target="_blank" rel="noopener nofollow" className="font-normal text-ink-soft">
      {credit}
    </a>
  ) : (
    <span>{credit}</span>
  );
}

/**
 * Ảnh minh họa giữa bài.
 * - Ảnh thật: <Figure src="/blog/ten-anh.webp" alt="..." caption="..." credit="Ảnh: A / Unsplash" creditUrl="..." />
 *   Nếu file chưa có trong public/, tự hiện minh họa PiPi thay thế.
 * - Minh họa PiPi: <Figure mascot="pipi-zen" tone="mint" caption="..." />
 */
export function Figure({
  src,
  alt = "",
  caption,
  credit,
  creditUrl,
  mascot = "pipi-main",
  tone = "blush",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  credit?: string;
  creditUrl?: string;
  mascot?: MascotName;
  tone?: Tone;
}) {
  const hasPhoto = Boolean(src) && publicFileExists(src!);
  return (
    <figure className="mx-0 my-8">
      <div className={`relative aspect-video overflow-hidden rounded-card ${toneBg[tone]}`}>
        {hasPhoto ? (
          <Image src={src!} alt={alt} fill sizes="(max-width: 720px) 100vw, 680px" className="object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <Mascot name={mascot} height={170} className="max-sm:h-[120px]!" />
          </div>
        )}
      </div>
      {(caption || (hasPhoto && credit)) && (
        <figcaption className="mt-2 text-center text-sm leading-normal text-ink-soft">
          {caption}
          {caption && hasPhoto && credit ? " · " : ""}
          {hasPhoto && <PhotoCredit credit={credit} url={creditUrl} />}
        </figcaption>
      )}
    </figure>
  );
}

/** Danh sách nguồn tham khảo cuối bài. Viết các gạch đầu dòng markdown bên trong. */
export function Sources({ children }: { children: ReactNode }) {
  return (
    <section className="mt-10 rounded-card border border-line bg-white p-5 text-[15px] leading-[1.6] [&_ul]:m-0 [&_ul]:pl-5">
      <h2 className="mb-2 text-xl">Nguồn tham khảo</h2>
      {children}
    </section>
  );
}
