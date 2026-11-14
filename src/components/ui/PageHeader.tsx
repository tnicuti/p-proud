import type { ReactNode } from "react";
import type { MascotName } from "@/content/mascot";
import { Chip } from "./Chip";
import { Lead } from "./Layout";
import { Mascot } from "./Mascot";

export function PageHeader({
  mascot,
  chip,
  title,
  children,
}: {
  mascot: MascotName;
  chip: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-6 pt-12 pb-2">
      <Mascot name={mascot} height={150} priority />
      <div className="min-w-[260px] flex-1">
        <Chip>{chip}</Chip>
        <h1 className="mt-2">{title}</h1>
        <Lead>{children}</Lead>
      </div>
    </div>
  );
}
