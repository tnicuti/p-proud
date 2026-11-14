import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { forumTopics } from "@/content/forum";
import { kits } from "@/content/kits";
import { blogTopics } from "@/content/posts";
import { LOCATION_LONG, site } from "@/content/site";
import { hasConfirmedSponsor, sponsors, sponsorSection } from "@/content/sponsors";
import { team } from "@/content/team";
import { getAllPosts, getRelatedPosts, parseFrontmatter, publicFileExists } from "../posts";
import { validateComment, validateQuestion } from "../validation";

const body = (slug: string) =>
  readFileSync(path.join(process.cwd(), "src", "content", "blog", `${slug}.mdx`), "utf8")
    .split("---")
    .slice(2)
    .join("---");

const wordCount = (mdx: string) =>
  mdx
    .split("<Sources>")[0]
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

describe("frontmatter", () => {
  it("đọc chuỗi, số và true/false", () => {
    const fm = parseFrontmatter('---\ntitle: "A: b"\nreadMinutes: 6\nreviewed: false\nmascot: pipi-zen\n---\nNội dung');
    expect(fm).toEqual({ title: "A: b", readMinutes: 6, reviewed: false, mascot: "pipi-zen" });
  });
});

describe("bài blog", () => {
  const posts = getAllPosts();

  it("có 9 bài, slug không trùng, sắp xếp mới nhất trước", () => {
    expect(posts).toHaveLength(9);
    expect(new Set(posts.map((p) => p.slug)).size).toBe(9);
    expect([...posts].sort((a, b) => b.date.localeCompare(a.date)).map((p) => p.slug)).toEqual(
      posts.map((p) => p.slug),
    );
  });

  it("đủ thông tin bắt buộc và đúng chủ đề", () => {
    for (const p of posts) {
      expect(p.title, p.slug).toBeTruthy();
      expect(p.excerpt, p.slug).toBeTruthy();
      expect(p.author, p.slug).toBeTruthy();
      expect(p.date, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(blogTopics, p.slug).toContain(p.category);
    }
  });

  it("bài chưa được chuyên gia duyệt thì chưa hiện chip", () => {
    expect(posts.every((p) => p.reviewed === false)).toBe(true);
  });

  it("đúng một bài nổi bật và 4 bài Đọc nhiều", () => {
    expect(posts.filter((p) => p.featured)).toHaveLength(1);
    expect(posts.filter((p) => p.popular)).toHaveLength(4);
  });

  it("khoảng 30% bài dùng ảnh thật: có file, alt và ghi nguồn", () => {
    const photo = posts.filter((p) => p.cover);
    expect(photo).toHaveLength(3);
    for (const p of photo) {
      expect(p.hasCover, p.slug).toBe(true);
      expect(p.coverAlt, p.slug).toBeTruthy();
      expect(p.coverCredit, p.slug).toMatch(/^Ảnh: .+ \/ Pexels$/);
      expect(p.coverCreditUrl, p.slug).toMatch(/^https:\/\/www\.pexels\.com\/photo\//);
    }
  });

  it("mỗi bài dài 800–1.200 chữ, có ảnh minh họa, pull quote và nguồn tham khảo", () => {
    for (const p of posts) {
      const mdx = body(p.slug);
      const n = wordCount(mdx);
      expect(n, `${p.slug}: ${n} chữ`).toBeGreaterThanOrEqual(800);
      expect(n, `${p.slug}: ${n} chữ`).toBeLessThanOrEqual(1200);
      expect(mdx, p.slug).toContain("<Figure");
      expect(mdx, p.slug).toContain("<PullQuote>");
      expect(mdx, p.slug).toContain("<Sources>");
    }
  });

  it("ảnh trong bài: file tồn tại thì phải có ghi nguồn", () => {
    for (const p of posts) {
      for (const m of body(p.slug).matchAll(/<Figure\s[^>]*?src="([^"]+)"[^>]*>/g)) {
        expect(publicFileExists(m[1]), m[1]).toBe(true);
        expect(m[0], m[1]).toMatch(/credit="Ảnh: /);
        expect(m[0], m[1]).toMatch(/alt="[^"]+"/);
      }
    }
  });

  it("không nêu tên thuốc", () => {
    for (const p of posts) {
      expect(body(p.slug).toLowerCase(), p.slug).not.toMatch(/paracetamol|ibuprofen|\bmg\b/);
    }
  });

  it("bài liên quan: 3 bài, không gồm bài đang đọc, ưu tiên cùng chủ đề", () => {
    for (const p of posts) {
      const related = getRelatedPosts(p);
      expect(related).toHaveLength(3);
      expect(related.map((r) => r.slug)).not.toContain(p.slug);
      const sameTopic = posts.filter((x) => x.category === p.category && x.slug !== p.slug).length;
      expect(related.filter((r) => r.category === p.category)).toHaveLength(Math.min(3, sameTopic));
    }
  });

  it("mọi chủ đề blog đều có trong diễn đàn (để nút Đặt câu hỏi chọn sẵn được)", () => {
    for (const t of blogTopics) expect(forumTopics).toContain(t);
  });
});

describe("bình luận", () => {
  it("biệt danh bắt buộc, nội dung 10–500 ký tự, chặn SĐT và email", () => {
    expect(validateComment({ nickname: "", body: "Bài viết hay quá ạ" })).toMatchObject({ ok: false });
    expect(validateComment({ nickname: "Mây", body: "ngắn" })).toMatchObject({ ok: false });
    expect(validateComment({ nickname: "Mây", body: "a".repeat(501) })).toMatchObject({ ok: false });
    expect(validateComment({ nickname: "M".repeat(31), body: "Bài viết hay quá ạ" })).toMatchObject({ ok: false });
    expect(validateComment({ nickname: "Mây", body: "Nhắn mình 0912345678 nha" })).toMatchObject({ ok: false });
    expect(validateComment({ nickname: "Mây", body: "mail mình may@gmail.com nhé" })).toMatchObject({ ok: false });
    expect(validateComment({ nickname: "Mây", body: "Bài viết hay quá ạ" })).toMatchObject({ ok: true });
  });
});

describe("câu hỏi diễn đàn đi từ bài blog", () => {
  it("giữ slug bài hợp lệ, bỏ slug lạ", () => {
    const base = { topic: "Kinh nguyệt", question: "Lần đầu có kinh nên làm gì ạ?" };
    expect(validateQuestion({ ...base, relatedPost: "chon-bang-ve-sinh-phu-hop" })).toMatchObject({
      ok: true,
      value: { relatedPost: "chon-bang-ve-sinh-phu-hop" },
    });
    expect(validateQuestion({ ...base, relatedPost: "../etc/passwd" })).toMatchObject({
      ok: true,
      value: { relatedPost: null },
    });
  });
});

describe("nội dung đợt 2", () => {
  it("lead trang chủ nêu rõ địa bàn", () => {
    expect(site.description).toContain(LOCATION_LONG);
    expect(LOCATION_LONG).toContain("Quận 8, TP.HCM");
  });

  it("chưa ai xác nhận tài trợ thì khối phải ghi rõ là đối tác dự kiến", () => {
    expect(hasConfirmedSponsor).toBe(false);
    expect(sponsorSection.title).toBe("Đối tác dự kiến");
    expect(sponsorSection.prospectiveNote).toContain("chưa có thỏa thuận tài trợ chính thức");
  });

  it("logo nhà tài trợ: file tồn tại và có kích thước", () => {
    for (const s of sponsors) {
      if (!s.logo) continue;
      expect(publicFileExists(s.logo), s.logo).toBe(true);
      expect(s.logoWidth, s.name).toBeGreaterThan(0);
      expect(s.logoHeight, s.name).toBeGreaterThan(0);
    }
  });

  it("đội ngũ 6 người, slug đúng thứ tự", () => {
    expect(team.map((m) => m.slug)).toEqual([
      "nhat-ha",
      "kieu-trang",
      "uyen-phuong",
      "thuc-nhi",
      "xuan-tiep",
      "van-nhu",
    ]);
  });

  it("chỉ Cẩm nang nữ sinh có bản lật trang", () => {
    expect(kits.filter((k) => k.flipbookUrl).map((k) => k.title)).toEqual(["Cẩm nang nữ sinh"]);
  });
});
