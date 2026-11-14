import Image from "next/image";
import { mascots, type MascotName } from "@/content/mascot";

interface Props {
  name: MascotName;
  /** Chiều cao hiển thị (px). Chiều rộng tự tính theo tỉ lệ ảnh. */
  height: number;
  /** Mặc định alt rỗng (ảnh trang trí). Truyền `true` để dùng alt trong mascot.ts, hoặc một chuỗi riêng. */
  alt?: string | true;
  className?: string;
  priority?: boolean;
}

export function Mascot({ name, height, alt = "", className = "", priority }: Props) {
  const img = mascots[name];
  const width = Math.round((img.width / img.height) * height);
  const altText = alt === true ? img.alt : alt;
  return (
    <Image
      src={img.src}
      alt={altText}
      width={width}
      height={height}
      priority={priority}
      className={`block w-auto max-w-full ${className}`}
      style={{ height }}
    />
  );
}
