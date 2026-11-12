import { pipiErrors } from "@/content/pipi";
import { getChatProvider, type ChatMessage } from "@/lib/pipi";
import { clientIp, hit } from "@/lib/rateLimit";

const MAX_MESSAGES = 10;
const MAX_CHARS = 500;
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT_PER_DEVICE = 20;
/** Cả trường thường dùng chung một IP wifi, nên trần theo IP đặt cao hơn. */
const LIMIT_PER_IP = 300;

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const raw = (body as { messages: unknown[] }).messages;
  const out: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (text) out.push({ role, content: text });
  }
  return out.length && out[out.length - 1].role === "user" ? out : null;
}

const plain = (text: string, status: number) =>
  new Response(text, { status, headers: { "content-type": "text/plain; charset=utf-8" } });

export async function POST(req: Request) {
  const device = (req.headers.get("x-device-id") ?? "").slice(0, 64) || "no-device";
  const ip = clientIp(req.headers);
  if (!hit(`chat:ip:${ip}`, LIMIT_PER_IP, WINDOW_MS) || !hit(`chat:dev:${ip}:${device}`, LIMIT_PER_DEVICE, WINDOW_MS)) {
    return plain(pipiErrors.rateLimited, 429);
  }

  let messages: ChatMessage[] | null = null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    messages = null;
  }
  if (!messages) return plain(pipiErrors.generic, 400);

  const provider = getChatProvider();
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of provider.reply(messages)) controller.enqueue(encoder.encode(chunk));
      } catch {
        // Không ghi log nội dung trò chuyện.
        controller.enqueue(encoder.encode(`\n${pipiErrors.generic}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-pipi-provider": provider.name,
    },
  });
}
