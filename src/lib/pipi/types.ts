export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Nguồn trả lời của PiPi. Hiện dùng kịch bản (scripted). Muốn đổi sang AI thật,
 * viết thêm một provider cùng interface (ví dụ anthropic.ts) rồi đổi PIPI_PROVIDER.
 */
export interface ChatProvider {
  readonly name: string;
  /** Trả về từng đoạn chữ để stream về trình duyệt. */
  reply(messages: ChatMessage[]): AsyncIterable<string>;
}
