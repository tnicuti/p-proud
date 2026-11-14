import Image from "next/image";
import { Mascot } from "@/components/ui/Mascot";
import type { Post } from "@/content/posts";
import { toneBg } from "@/content/site";

/**
 * Ảnh bìa 16:9 của bài: ảnh thật nếu file đã có trong public/, không thì minh họa PiPi trên nền màu.
 * `mascotHeight` là chiều cao PiPi trong khung (px).
 */
export function PostCover({
  post,
  sizes,
  mascotHeight = 120,
  priority,
  className = "",
}: {
  post: Pick<Post, "cover" | "coverAlt" | "hasCover" | "mascot" | "tone" | "title">;
  sizes: string;
  mascotHeight?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-video overflow-hidden rounded-2xl ${toneBg[post.tone]} ${className}`}>
      {post.hasCover && post.cover ? (
        <Image
          src={post.cover}
          alt={post.coverAlt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <Mascot name={post.mascot} height={mascotHeight} priority={priority} />
        </div>
      )}
    </div>
  );
}
