"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { mfData, POINTS, type MythFact } from "@/content/games";
import { shuffle } from "@/lib/games";
import { Feedback, ProgressHeader, WinScreen } from "./shared";

export function MythFactGame({ addPoints }: { addPoints: (n: number) => void }) {
  // Thứ tự ban đầu cố định để HTML máy chủ và trình duyệt khớp nhau, xáo trộn ngay sau khi hiển thị.
  const [order, setOrder] = useState<MythFact[]>(mfData);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<"myth" | "fact" | null>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(shuffle(mfData));
  }, []);

  useEffect(() => {
    if (answer) nextRef.current?.focus();
  }, [answer]);

  function restart() {
    setOrder(shuffle(mfData));
    setI(0);
    setScore(0);
    setAnswer(null);
  }

  if (i >= order.length) return <WinScreen score={score} total={order.length} onAgain={restart} />;

  const item = order[i];
  const ok = answer === item.a;

  function choose(v: "myth" | "fact") {
    if (answer) return;
    setAnswer(v);
    if (v === item.a) {
      setScore((s) => s + 1);
      addPoints(POINTS.correctAnswer);
    }
  }

  const big =
    "max-w-[200px] flex-1 rounded-[18px] border-0 p-4 font-display text-[22px] font-extrabold disabled:opacity-70";

  return (
    <>
      <div className="mx-auto max-w-[560px]">
        <ProgressHeader index={i} total={order.length} score={score} />
      </div>
      <div className="mx-auto max-w-[560px] rounded-game border-[3px] border-blush bg-white p-8 text-center shadow-card max-sm:p-5">
        <Mascot name="pipi-search" height={90} className="mx-auto mb-2.5" />
        <p className="grid min-h-24 place-items-center font-display text-2xl font-bold text-ink">“{item.q}”</p>
        <div className="mt-[18px] flex justify-center gap-3.5">
          <button
            type="button"
            className={`${big} bg-blush-soft text-ruby`}
            disabled={!!answer}
            onClick={() => choose("myth")}
          >
            Myth
          </button>
          <button
            type="button"
            className={`${big} bg-mint-soft text-mint-ink`}
            disabled={!!answer}
            onClick={() => choose("fact")}
          >
            Fact
          </button>
        </div>
        {answer && (
          <Feedback ok={ok}>
            <b>{ok ? `Chính xác! +${POINTS.correctAnswer} điểm` : "Chưa đúng rồi"}</b> · Đây là{" "}
            <b>{item.a === "myth" ? "Myth (hiểu lầm)" : "Fact (sự thật)"}</b>.
            <br />
            {item.e}
            <div className="mt-2.5 text-right">
              <Button
                ref={nextRef}
                size="sm"
                onClick={() => {
                  setI((n) => n + 1);
                  setAnswer(null);
                }}
              >
                Câu tiếp theo
              </Button>
            </div>
          </Feedback>
        )}
      </div>
    </>
  );
}
