import Image from "next/image";
import { cardClass } from "@/components/ui/Card";
import type { Member } from "@/content/team";
import { avatarPath } from "@/lib/team";

/** Card thành viên: ảnh tròn 112px viền vàng; chưa có ảnh thì dùng chữ cái viết tắt. */
export function MemberCard({ member }: { member: Member }) {
  const avatar = avatarPath(member);
  return (
    <div className={cardClass("default", "group text-center transition-transform duration-200 hover:-translate-y-1")}>
      <div className="mx-auto mb-3 grid h-[132px] w-[132px] place-items-center rounded-full bg-blush-soft">
        <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-full border-[3px] border-gold bg-blush-soft">
          {avatar ? (
            <Image
              src={avatar}
              alt={`Ảnh đại diện của ${member.name}`}
              width={112}
              height={112}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
            />
          ) : (
            <span aria-hidden="true" className="font-display text-4xl font-extrabold text-ruby">
              {member.initials}
            </span>
          )}
        </div>
      </div>
      <b className="block font-display text-lg text-ink">{member.name}</b>
      <span className="block text-sm text-ink-soft">{member.role}</span>
      {member.duty && <span className="mt-1.5 block text-[13px] text-ink-soft">Phụ trách: {member.duty}</span>}
    </div>
  );
}
