import { site } from "@/content/site";

/** Tắt bằng NEXT_PUBLIC_SHOW_DEMO_BANNER=false khi nội dung đã được chuyên gia thẩm định. */
export function DemoBanner() {
  if (process.env.NEXT_PUBLIC_SHOW_DEMO_BANNER === "false") return null;
  return <div className="bg-ruby px-3 py-1.5 text-center text-[13px] font-semibold text-white">{site.demoBanner}</div>;
}
