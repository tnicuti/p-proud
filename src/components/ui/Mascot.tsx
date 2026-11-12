import Image from "next/image";
import { mascots, type MascotName } from "@/lib/mascot";

interface Props {
  name: MascotName;
  /** Chiều cao hiển thị (px). Chiều rộng tự tính theo tỉ lệ ảnh. */
  height: number;
  /** Ảnh trang trí để alt rỗng; ảnh mang nghĩa truyền alt tiếng Việt. */
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function Mascot({ name, height, alt = "", className = "", priority }: Props) {
  const img = mascots[name];
  const width = Math.round((img.width / img.height) * height);
  return (
    <Image
      src={img}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`block w-auto max-w-full ${className}`}
      style={{ height }}
    />
  );
}
