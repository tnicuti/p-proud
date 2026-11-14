/**
 * Đọc bài blog từ src/content/blog/*.mdx (chỉ chạy ở máy chủ, lúc build).
 * Thêm bài mới = thêm một file .mdx, không phải sửa code.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { mascots, type MascotName } from "@/content/mascot";
import { blogTopics, type BlogTopic, type Post } from "@/content/posts";
import type { Tone } from "@/content/site";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

/** Đọc khối frontmatter dạng `khóa: giá trị` (chuỗi, số, true/false). */
export function parseFrontmatter(source: string): Record<string, string | number | boolean> {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data: Record<string, string | number | boolean> = {};
  if (!match) return data;
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z][\w]*):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (value === "true" || value === "false") data[m[1]] = value === "true";
    else if (/^-?\d+(\.\d+)?$/.test(value)) data[m[1]] = Number(value);
    else {
      if (/^".*"$/.test(value) || /^'.*'$/.test(value)) value = value.slice(1, -1).replace(/\\"/g, '"');
      data[m[1]] = value;
    }
  }
  return data;
}

function toPost(file: string): Post {
  const fm = parseFrontmatter(readFileSync(path.join(BLOG_DIR, file), "utf8"));
  const slug = file.replace(/\.mdx$/, "");
  const s = (k: string) => (typeof fm[k] === "string" ? (fm[k] as string) : "");
  if (fm.slug && fm.slug !== slug) throw new Error(`Bài ${file}: slug trong frontmatter phải trùng tên file.`);
  const category = s("category") as BlogTopic;
  if (!blogTopics.includes(category)) throw new Error(`Bài ${file}: category "${category}" không hợp lệ.`);
  const mascot = (s("mascot") || "pipi-main") as MascotName;
  if (!(mascot in mascots)) throw new Error(`Bài ${file}: mascot "${mascot}" không có trong mascot.ts.`);
  const cover = s("cover");
  return {
    slug,
    title: s("title"),
    category,
    excerpt: s("excerpt"),
    cover: cover || undefined,
    coverAlt: s("coverAlt") || undefined,
    coverCredit: s("coverCredit") || undefined,
    coverCreditUrl: s("coverCreditUrl") || undefined,
    coverKeywords: s("coverKeywords") || undefined,
    mascot,
    tone: (s("tone") || "blush") as Tone,
    author: s("author"),
    date: s("date"),
    readMinutes: Number(fm.readMinutes) || 5,
    reviewed: fm.reviewed === true,
    featured: fm.featured === true,
    popular: fm.popular === true,
    hasCover: Boolean(cover) && publicFileExists(cover),
  };
}

export function publicFileExists(publicPath: string): boolean {
  return existsSync(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}

let cache: Post[] | null = null;

/** Trên máy chủ chạy thật có thể không còn thư mục nguồn: khi đó coi như không có bài (trang trả 404). */
function listPostFiles(): string[] {
  try {
    return readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

/** Tất cả bài, mới nhất trước. */
export function getAllPosts(): Post[] {
  // Khi chạy dev không nhớ đệm, để thêm hoặc sửa bài là thấy ngay.
  if (!cache || process.env.NODE_ENV !== "production") {
    cache = listPostFiles()
      .map(toPost)
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
  }
  return cache;
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

/** 3 bài cùng chủ đề (không gồm bài đang đọc); thiếu thì lấy thêm bài mới nhất. */
export function getRelatedPosts(post: Post, count = 3): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, count);
}
