import { existsSync } from "node:fs";
import path from "node:path";
import type { Member } from "@/content/team";

/** Đường dẫn ảnh đại diện nếu file public/team/<slug>.webp tồn tại (kiểm tra lúc build). */
export function avatarPath(member: Member): string | null {
  const file = path.join(process.cwd(), "public", "team", `${member.slug}.webp`);
  return existsSync(file) ? `/team/${member.slug}.webp` : null;
}
