import type { MDXComponents } from "mdx/types";
import { Figure, PiPiNote, PullQuote, Sources } from "@/components/blog/ArticleBlocks";

/** Component dùng được trong mọi bài MDX mà không cần import. */
const components: MDXComponents = {
  PullQuote,
  PiPiNote,
  Figure,
  Sources,
  a: ({ href = "", children, ...rest }) =>
    /^https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noopener nofollow" {...rest}>
        {children}
      </a>
    ) : (
      <a href={href} {...rest}>
        {children}
      </a>
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
