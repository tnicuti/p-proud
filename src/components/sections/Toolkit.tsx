"use client";

import { useState } from "react";
import { OpenChatButton } from "@/components/chat/ChatWidget";
import { Button, buttonClass } from "@/components/ui/Button";
import { cardClass } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { FilterBar } from "@/components/ui/FilterBar";
import { ExternalIcon } from "@/components/ui/icons";
import { Grid } from "@/components/ui/Layout";
import { Mascot } from "@/components/ui/Mascot";
import { Modal } from "@/components/ui/Modal";
import { toneBg } from "@/content/site";
import { kitFilters, kits, lessonQuestion, lessons, type Audience, type Kit } from "@/content/kits";

function KitCard({ kit, onPreview, onRead }: { kit: Kit; onPreview: () => void; onRead: () => void }) {
  return (
    <div className={cardClass("default", "flex flex-col")}>
      <div className={`mb-4 grid h-[150px] place-items-center rounded-2xl ${toneBg[kit.tone]}`}>
        <Mascot name={kit.img} height={120} />
      </div>
      <div className="mb-2.5 flex flex-wrap gap-1.5">
        <Chip>{kit.tags[0]}</Chip>
        <Chip tone="gold">{kit.tags[1]}</Chip>
      </div>
      <h3>{kit.title}</h3>
      <p className="flex-1 text-[15px] text-ink-soft">{kit.desc}</p>
      {kit.flipbookUrl ? (
        <>
          <div className="flex flex-wrap gap-2">
            {/* Desktop: mở modal nhúng. Mobile: mở thẳng tab mới vì iframe lật trang khó dùng trên màn hình nhỏ. */}
            <Button size="sm" onClick={onRead} className="max-md:hidden">
              Đọc cẩm nang
            </Button>
            <a
              href={kit.flipbookUrl}
              target="_blank"
              rel="noopener"
              className={buttonClass("primary", "sm", "md:hidden")}
            >
              Đọc cẩm nang
            </a>
            <a
              href={kit.flipbookUrl}
              target="_blank"
              rel="noopener"
              className={buttonClass("ghost", "sm", "max-md:hidden")}
            >
              Mở trong tab mới <ExternalIcon size={15} />
            </a>
          </div>
          {kit.flipbookNote && <p className="mt-2.5 mb-0 text-[13px] text-ink-soft">{kit.flipbookNote}</p>}
        </>
      ) : (
        <span>
          <Button variant="ghost" size="sm" onClick={onPreview}>
            Xem trước
          </Button>
        </span>
      )}
    </div>
  );
}

export function KitsSection() {
  const [audience, setAudience] = useState<Audience | "">("");
  const [preview, setPreview] = useState<Kit | null>(null);
  const [reading, setReading] = useState<Kit | null>(null);
  const shown = kits.filter((k) => !audience || k.audience === audience);

  return (
    <>
      <FilterBar label="Lọc theo đối tượng" options={kitFilters} value={audience} onChange={setAudience} />
      <Grid cols={3}>
        {shown.map((k) => (
          <KitCard key={k.title} kit={k} onPreview={() => setPreview(k)} onRead={() => setReading(k)} />
        ))}
      </Grid>
      <Modal open={!!preview} onClose={() => setPreview(null)} labelledBy="kit-title">
        {preview && (
          <>
            <div className="flex items-center gap-4 pr-10">
              <Mascot name={preview.img} height={100} />
              <div>
                <h2 id="kit-title" className="m-0">
                  {preview.title}
                </h2>
                <p className="mt-1 mb-0 text-ink-soft">{preview.desc}</p>
              </div>
            </div>
            <h4 className="mt-6">Nội dung chính</h4>
            <ul className="pl-5">
              {preview.outline.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <p className="text-[13px] text-ink-soft">Bản đầy đủ sẽ được gửi cho nhà trường khi bàn giao dự án.</p>
          </>
        )}
      </Modal>
      <Modal open={!!reading} onClose={() => setReading(null)} labelledBy="flipbook-title" size="lg">
        {reading?.flipbookUrl && (
          <>
            <div className="mb-3 flex flex-wrap items-center gap-3 pr-12">
              <h2 id="flipbook-title" className="m-0 text-2xl">
                {reading.title}
              </h2>
              <a href={reading.flipbookUrl} target="_blank" rel="noopener" className="text-sm font-bold">
                Mở trong tab mới <ExternalIcon size={14} className="inline align-[-2px]" />
              </a>
            </div>
            <iframe
              src={reading.flipbookUrl}
              title={`${reading.title} P-Proud`}
              allowFullScreen
              loading="lazy"
              className="min-h-0 w-full flex-1 rounded-2xl border border-line bg-blush-soft"
            />
          </>
        )}
      </Modal>
    </>
  );
}

export function LessonList() {
  return (
    <ol className="mt-6 grid list-none gap-3 p-0">
      {lessons.map((l, i) => (
        <li
          key={l.title}
          className="flex items-center gap-3.5 rounded-[18px] border border-line bg-white px-[18px] py-3.5"
        >
          <div
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold font-display text-xl font-extrabold text-gold-ink"
          >
            {i + 1}
          </div>
          <div className="flex-1">
            <b>{l.title}</b>
            <br />
            <small className="text-ink-soft">{l.desc}</small>
          </div>
          <OpenChatButton question={lessonQuestion(i)} className={buttonClass("ghost", "sm", "shrink-0")}>
            Hỏi PiPi
          </OpenChatButton>
        </li>
      ))}
    </ol>
  );
}
