import { pipiFallback, pipiScript, type ScriptEntry } from "@/content/pipiScript";
import { normalizeVi } from "@/lib/text";
import type { ChatMessage, ChatProvider } from "./types";

const index = pipiScript.map((e) => ({
  entry: e,
  keywords: e.keywords.map((k) => ` ${normalizeVi(k)} `),
}));

/** Tìm mục kịch bản đầu tiên có từ khóa xuất hiện trọn từ trong câu hỏi. */
export function matchScript(question: string): ScriptEntry | null {
  const q = ` ${normalizeVi(question)} `;
  for (const { entry, keywords } of index) {
    if (keywords.some((k) => q.includes(k))) return entry;
  }
  return null;
}

export function scriptedAnswer(question: string): string {
  return matchScript(question)?.answer ?? pipiFallback;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const scriptedProvider: ChatProvider = {
  name: "scripted",
  async *reply(messages: ChatMessage[]) {
    const last = [...messages].reverse().find((m) => m.role === "user");
    const answer = scriptedAnswer(last?.content ?? "");
    // Giả lập stream từng chữ cho giống AI thật.
    const parts = answer.match(/\S+\s*/g) ?? [answer];
    await sleep(350);
    for (const p of parts) {
      yield p;
      await sleep(28);
    }
  },
};
