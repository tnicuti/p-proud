import { scriptedProvider } from "./scripted";
import type { ChatProvider } from "./types";

/** Chọn nguồn trả lời theo biến môi trường PIPI_PROVIDER (mặc định "scripted"). */
export function getChatProvider(): ChatProvider {
  switch (process.env.PIPI_PROVIDER ?? "scripted") {
    // case "anthropic": return anthropicProvider;  // bật khi chuyển sang AI thật
    default:
      return scriptedProvider;
  }
}

export type { ChatMessage, ChatProvider } from "./types";
