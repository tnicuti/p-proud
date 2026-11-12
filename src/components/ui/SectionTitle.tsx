import type { ReactNode } from "react";

/** Tiêu đề khối có hành động bên phải (vd. "Bài viết mới" + "Xem tất cả"). */
export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <h2 className="m-0">{title}</h2>
      {action}
    </div>
  );
}
