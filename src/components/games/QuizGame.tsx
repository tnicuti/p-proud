"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { POINTS, quizData } from "@/content/games";
import { Feedback, ProgressHeader, WinScreen } from "./shared";

export function QuizGame({ addPoints }: { addPoints: (n: number) => void }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (picked !== null) nextRef.current?.focus();
  }, [picked]);

  if (i >= quizData.length) {
    return (
      <WinScreen
        score={score}
        total={quizData.length}
        onAgain={() => {
          setI(0);
          setScore(0);
          setPicked(null);
        }}
      />
    );
  }

  const item = quizData[i];
  const ok = picked === item.a;

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === item.a) {
      setScore((s) => s + 1);
      addPoints(POINTS.correctAnswer);
    }
  }

  return (
    <div className="mx-auto max-w-[620px]">
      <ProgressHeader index={i} total={quizData.length} score={score} />
      <h3 className="text-ink">{item.q}</h3>
      <div>
        {item.o.map((o, idx) => {
          const state = picked === null ? "" : idx === item.a ? "right" : idx === picked ? "wrong" : "";
          return (
            <button
              key={o}
              type="button"
              disabled={picked !== null}
              onClick={() => choose(idx)}
              className={`mb-2.5 block w-full rounded-2xl border-2 px-4 py-3 text-left text-base font-semibold ${
                state === "right"
                  ? "border-mint bg-mint-soft text-mint-ink"
                  : state === "wrong"
                    ? "border-ruby bg-blush-soft text-ruby-dark"
                    : "border-line bg-white text-ink enabled:hover:border-rose"
              }`}
            >
              {"ABCD"[idx]}. {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <Feedback ok={ok}>
          <b>{ok ? `Chính xác! +${POINTS.correctAnswer} điểm` : "Chưa đúng rồi"}</b>
          <br />
          {item.e}
          <div className="mt-2.5 text-right">
            <Button
              ref={nextRef}
              size="sm"
              onClick={() => {
                setI((n) => n + 1);
                setPicked(null);
              }}
            >
              {i + 1 < quizData.length ? "Câu tiếp theo" : "Xem kết quả"}
            </Button>
          </div>
        </Feedback>
      )}
    </div>
  );
}
