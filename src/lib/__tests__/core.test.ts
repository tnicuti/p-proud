import { describe, expect, it } from "vitest";
import { bagItems, mfData, quizData } from "@/content/games";
import { pipiSuggestions } from "@/content/pipi";
import { pipiFallback } from "@/content/pipiScript";
import { lessonQuestion, lessons } from "@/content/toolkit";
import { isPass, scoreBag, shuffle } from "../games";
import { renderLightMarkdown } from "../markdown";
import { containsContactInfo } from "../pii";
import { matchScript, scriptedAnswer, scriptedProvider } from "../pipi/scripted";
import { hit } from "../rateLimit";
import { normalizeVi } from "../text";
import { validateAmbassador, validateQuestion } from "../validation";

describe("normalizeVi", () => {
  it("bỏ dấu, đ → d, viết thường", () => {
    expect(normalizeVi("Đau bụng KINH thì làm sao?")).toBe("dau bung kinh thi lam sao");
  });
});

describe("renderLightMarkdown", () => {
  it("escape HTML trước khi chèn thẻ", () => {
    const out = renderLightMarkdown('<img src=x onerror="alert(1)"> **đậm**');
    expect(out).not.toContain("<img");
    expect(out).toContain("&lt;img");
    expect(out).toContain("<b>đậm</b>");
  });
  it("gạch đầu dòng thành danh sách", () => {
    expect(renderLightMarkdown("Mở đầu\n- một\n- hai\nKết")).toBe(
      "<p>Mở đầu</p><ul><li>một</li><li>hai</li></ul><p>Kết</p>",
    );
  });
});

describe("containsContactInfo", () => {
  it.each([
    "gọi mình 0912345678 nha",
    "0912 345 678",
    "+84 912345678",
    "mail mình abc@gmail.com",
    "fb: facebook.com/abc",
  ])("phát hiện: %s", (s) => expect(containsContactInfo(s)).toBe(true));
  it.each(["Mình 12 tuổi mà chưa có kinh", "Kinh kéo dài 7 ngày", "lớp 6–7, 120 bạn"])("không báo nhầm: %s", (s) =>
    expect(containsContactInfo(s)).toBe(false),
  );
});

describe("PiPi kịch bản", () => {
  it("5 câu gợi ý đều có câu trả lời riêng", () => {
    const ids = pipiSuggestions.map((s) => matchScript(s)?.id);
    expect(ids).toEqual(["what-is-period", "first-period", "cramps", "teasing", "project"]);
  });
  it("6 nút Hỏi PiPi ở bài học khớp đúng bài", () => {
    lessons.forEach((_, i) => expect(matchScript(lessonQuestion(i))?.id).toBe(`lesson-${i + 1}`));
  });
  it("tình huống nguy hiểm luôn ưu tiên và nhắc Tổng đài 111", () => {
    for (const q of ["Mình bị bạn bắt nạt và đánh", "mình muốn tự làm đau bản thân", "có người sờ vào người mình"]) {
      const a = scriptedAnswer(q);
      expect(a).toContain("111");
      expect(a).toContain("không phải lỗi của bạn");
    }
  });
  it("không gợi ý thuốc", () => {
    expect(matchScript("đau bụng kinh uống thuốc gì")?.id).toBe("safety-medicine");
  });
  it("không bắt nhầm từ phổ biến", () => {
    expect(matchScript("liệu có sao không")?.id).not.toBe("safety-medicine");
    expect(matchScript("chuyên gia tâm lý nói gì")?.id).not.toBe("bathing");
  });
  it("câu ngoài phạm vi dùng câu trả lời mặc định", () => {
    expect(scriptedAnswer("giải giúp mình bài toán lớp 7")).toBe(pipiFallback);
  });
  it("mọi câu trả lời ngắn (≤ 120 chữ)", async () => {
    const { pipiScript } = await import("@/content/pipiScript");
    for (const e of pipiScript) expect(e.answer.split(/\s+/).length, e.id).toBeLessThanOrEqual(120);
  });
  it("provider stream ghép lại đúng câu trả lời", async () => {
    let text = "";
    for await (const c of scriptedProvider.reply([{ role: "user", content: "Đau bụng kinh thì làm sao?" }])) text += c;
    expect(text).toBe(scriptedAnswer("Đau bụng kinh thì làm sao?"));
  });
});

describe("trò chơi", () => {
  it("dữ liệu đúng như prototype", () => {
    expect(mfData).toHaveLength(10);
    expect(quizData).toHaveLength(8);
    expect(bagItems.filter((b) => b.ok)).toHaveLength(5);
    expect(bagItems.filter((b) => !b.ok)).toHaveLength(4);
  });
  it("xáo trộn giữ nguyên phần tử", () => {
    expect(
      shuffle(mfData)
        .map((x) => x.q)
        .sort(),
    ).toEqual(mfData.map((x) => x.q).sort());
  });
  it("ngưỡng đạt 70%", () => {
    expect(isPass(7, 10)).toBe(true);
    expect(isPass(6, 10)).toBe(false);
    expect(isPass(6, 8)).toBe(true);
    expect(isPass(5, 8)).toBe(false);
  });
  it("Túi kỳ đầu: 5 điểm mỗi món đúng, +15 nếu hoàn hảo", () => {
    expect(scoreBag(bagItems, new Set([0, 1, 2, 3, 4])).points).toBe(40);
    expect(scoreBag(bagItems, new Set([0, 1, 5]))).toMatchObject({ right: 2, wrong: 1, perfect: false, points: 10 });
    expect(scoreBag(bagItems, new Set([0, 1, 2, 3, 4, 8])).perfect).toBe(false);
  });
});

describe("form", () => {
  it("câu hỏi diễn đàn: bắt buộc chủ đề, ≥ 10 ký tự, chặn SĐT/email", () => {
    expect(validateQuestion({ topic: "", question: "abcdefghijk" })).toMatchObject({ ok: false });
    expect(validateQuestion({ topic: "Kinh nguyệt", question: "ngắn" })).toMatchObject({ ok: false });
    expect(validateQuestion({ topic: "Kinh nguyệt", question: "gọi mình 0912345678 nhé" })).toMatchObject({
      ok: false,
    });
    expect(validateQuestion({ topic: "Kinh nguyệt", question: "Lần đầu có kinh nên làm gì?" })).toMatchObject({
      ok: true,
      value: { nickname: "Ẩn danh", anonymous: true },
    });
  });
  it("Đại sứ: học sinh không được lưu liên hệ, người lớn thì có", () => {
    const hs = validateAmbassador({ nickname: "Mây", role: "Học sinh", contact: "0912345678" });
    expect(hs).toMatchObject({ ok: true, value: { contact: null } });
    const gv = validateAmbassador({ nickname: "Cô Lan", role: "Thầy cô", contact: "co.lan@truong.edu.vn" });
    expect(gv).toMatchObject({ ok: true, value: { contact: "co.lan@truong.edu.vn" } });
    expect(validateAmbassador({ nickname: "Cô Lan", role: "Thầy cô", contact: "abc" })).toMatchObject({ ok: false });
    expect(validateAmbassador({ nickname: "", role: "Thầy cô" })).toMatchObject({ ok: false });
  });
});

describe("rate limit", () => {
  it("chặn khi vượt giới hạn và mở lại sau cửa sổ", () => {
    const t = 1_000_000;
    for (let i = 0; i < 3; i++) expect(hit("k", 3, 1000, t)).toBe(true);
    expect(hit("k", 3, 1000, t)).toBe(false);
    expect(hit("k", 3, 1000, t + 1001)).toBe(true);
  });
});
