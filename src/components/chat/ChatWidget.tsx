"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Mascot } from "@/components/ui/Mascot";
import { useFocusTrap } from "@/components/ui/useFocusTrap";
import { pipiErrors, pipiGreeting, pipiNote, pipiSuggestions } from "@/content/pipi";
import { renderLightMarkdown } from "@/lib/markdown";

interface Msg {
  role: "user" | "assistant";
  content: string;
  /** true: tin hiển thị nhưng không gửi lên máy chủ (lời chào, thông báo lỗi) */
  local?: boolean;
}

interface ChatApi {
  openChat: () => void;
  /** Mở chatbot và gửi sẵn một câu hỏi (vd. nút "Hỏi PiPi" ở bài học). */
  askPiPi: (question: string) => void;
}

const ChatContext = createContext<ChatApi | null>(null);

export function useChat(): ChatApi {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat phải nằm trong <ChatProvider>");
  return ctx;
}

const DEVICE_KEY = "pproud:device";
function deviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [showSuggest, setShowSuggest] = useState(true);
  const [input, setInput] = useState("");
  const [queued, setQueued] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(panelRef, open, close);

  const openChat = useCallback(() => {
    setOpen(true);
    setMessages((m) => (m.length ? m : [{ role: "assistant", content: pipiGreeting, local: true }]));
  }, []);

  const askPiPi = useCallback(
    (q: string) => {
      openChat();
      setQueued(q);
    },
    [openChat],
  );

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || busyRef.current) return;
      busyRef.current = true;
      setBusy(true);
      setShowSuggest(false);
      setInput("");

      const history = [...messages, { role: "user" as const, content: q }];
      setMessages([...history, { role: "assistant", content: "", local: true }]);

      const setLast = (content: string, local: boolean) =>
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", content, local }]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json", "x-device-id": deviceId() },
          body: JSON.stringify({
            messages: history.filter((m) => !m.local).map(({ role, content }) => ({ role, content })),
          }),
        });
        if (!res.ok || !res.body) {
          const msg = (await res.text().catch(() => "")) || pipiErrors.generic;
          setMessages((m) => [
            ...m.slice(0, -2),
            { role: "user", content: q, local: true },
            { role: "assistant", content: msg, local: true },
          ]);
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setLast(acc, true);
        }
        setLast(acc.trim() || pipiErrors.empty, !acc.trim());
      } catch {
        setMessages((m) => [
          ...m.slice(0, -2),
          { role: "user", content: q, local: true },
          { role: "assistant", content: pipiErrors.generic, local: true },
        ]);
      } finally {
        busyRef.current = false;
        setBusy(false);
      }
    },
    [messages],
  );

  useEffect(() => {
    if (queued && open && !busyRef.current) {
      setQueued(null);
      void send(queued);
    }
  }, [queued, open, send]);

  // Sau khi đóng chat: nếu chỗ focus cũ không còn (vd. chính nút nổi), đưa focus về nút nổi.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (!active || active === document.body) fabRef.current?.focus({ preventScroll: true });
    });
  }, [open]);

  return (
    <ChatContext.Provider value={{ openChat, askPiPi }}>
      {children}

      {!open && (
        <button
          ref={fabRef}
          type="button"
          onClick={openChat}
          aria-label="Trò chuyện với PiPi"
          className="fixed right-5 bottom-5 z-60 flex items-end gap-2 border-0 bg-transparent p-0"
        >
          <span className="mb-[60px] rounded-[16px_16px_4px_16px] border-2 border-rose bg-white px-3 py-2 font-display text-[15px] font-bold text-ruby max-sm:hidden">
            Hỏi PiPi nè!
          </span>
          <Mascot
            name="pipi-hi"
            height={96}
            className="animate-bob-fast drop-shadow-[0_6px_12px_rgba(151,10,29,.25)] max-sm:h-[72px]!"
          />
        </button>
      )}

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Trò chuyện với PiPi"
          className="fixed right-5 bottom-5 z-70 flex h-[min(600px,calc(100vh-40px))] w-[min(400px,calc(100vw-24px))] flex-col overflow-hidden rounded-chat border-2 border-blush bg-white shadow-chat max-sm:right-3"
        >
          <div className="flex items-center gap-2.5 bg-ruby px-3.5 py-3 text-white">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blush">
              <Mascot name="pipi-main" height={44} />
            </div>
            <div>
              <b className="block font-display text-[19px] leading-[1.1]">PiPi</b>
              <small className="text-xs opacity-85">Bạn đồng hành của P-Proud</small>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Đóng"
              className="ml-auto h-[34px] w-[34px] rounded-full border-0 bg-white/20 text-lg text-white"
            >
              ×
            </button>
          </div>

          <div ref={bodyRef} className="flex flex-1 flex-col gap-2.5 overflow-auto bg-mist p-4" aria-live="polite">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div
                  key={i}
                  className="max-w-[85%] self-end rounded-[18px] rounded-br-[6px] bg-ruby px-3.5 py-2.5 text-[15px] leading-normal break-words text-white"
                >
                  {m.content}
                </div>
              ) : (
                <div
                  key={i}
                  className="chat-md max-w-[85%] self-start rounded-[18px] rounded-bl-[6px] border border-line bg-white px-3.5 py-2.5 text-[15px] leading-normal break-words"
                >
                  {m.content ? (
                    <div dangerouslySetInnerHTML={{ __html: renderLightMarkdown(m.content) }} />
                  ) : (
                    <span className="inline-flex gap-1" aria-label="PiPi đang trả lời">
                      <i className="h-[7px] w-[7px] animate-blink rounded-full bg-rose" />
                      <i className="h-[7px] w-[7px] animate-blink rounded-full bg-rose [animation-delay:.2s]" />
                      <i className="h-[7px] w-[7px] animate-blink rounded-full bg-rose [animation-delay:.4s]" />
                    </span>
                  )}
                </div>
              ),
            )}
          </div>

          {showSuggest && (
            <div className="flex flex-wrap gap-1.5 bg-mist px-4 pb-2.5">
              {pipiSuggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border-[1.5px] border-rose bg-white px-2.5 py-1 text-[13px] font-bold text-ruby"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex gap-2 border-t border-line p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Câu hỏi cho PiPi
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              maxLength={500}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi PiPi điều bạn thắc mắc…"
              autoComplete="off"
              className="rounded-full!"
            />
            <button
              type="submit"
              disabled={busy}
              className="rounded-full border-0 bg-ruby px-[18px] font-extrabold text-white"
            >
              Gửi
            </button>
          </form>
          <div className="px-3 pb-2.5 text-center text-[11px] text-ink-soft">{pipiNote}</div>
        </div>
      )}
    </ChatContext.Provider>
  );
}

/** Nút mở chatbot dùng được trong Server Component. */
export function OpenChatButton({
  className,
  question,
  children,
}: {
  className?: string;
  question?: string;
  children: ReactNode;
}) {
  const { openChat, askPiPi } = useChat();
  return (
    <button type="button" className={className} onClick={() => (question ? askPiPi(question) : openChat())}>
      {children}
    </button>
  );
}
