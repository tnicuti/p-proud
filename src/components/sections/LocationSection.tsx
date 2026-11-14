import Image from "next/image";
import { CalendarIcon, PeopleIcon, PinIcon, SchoolIcon } from "@/components/ui/icons";
import { Mascot } from "@/components/ui/Mascot";
import { locationFacts, locationMap } from "@/content/site";

const icons = { pin: PinIcon, school: SchoolIcon, people: PeopleIcon, calendar: CalendarIcon };

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 text-[13px] font-extrabold tracking-[.18em] text-rose uppercase">{children}</div>;
}

export function LocationSection() {
  return (
    <div className="grid grid-cols-2 items-stretch gap-6 max-hero:grid-cols-1">
      <div className="relative">
        <Eyebrow>Địa bàn dự án</Eyebrow>
        <h2>Nơi P-Proud triển khai</h2>
        <ul className="m-0 grid list-none gap-3.5 p-0 pr-24 max-sm:pr-0">
          {locationFacts.map((f) => {
            const Icon = icons[f.icon];
            return (
              <li key={f.label} className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-ink">
                  <Icon size={22} />
                </span>
                <span>
                  <b className="block text-ruby">{f.label}</b>
                  {f.text}
                </span>
              </li>
            );
          })}
        </ul>
        <Mascot name="pipi-hi" height={110} className="absolute right-0 bottom-0 max-sm:hidden" />
      </div>
      <figure className="m-0 flex flex-col">
        <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-card border border-line bg-white shadow-card">
          <Image
            src={locationMap.image}
            alt={locationMap.alt}
            fill
            sizes="(max-width: 820px) 100vw, 560px"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-2 text-center text-[13px] text-ink-soft">{locationMap.caption}</figcaption>
      </figure>
    </div>
  );
}
