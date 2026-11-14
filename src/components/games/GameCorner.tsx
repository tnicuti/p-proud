"use client";

import { useCallback, useEffect, useState } from "react";
import { cardClass } from "@/components/ui/Card";
import { Mascot } from "@/components/ui/Mascot";
import { PointsBadge } from "@/components/ui/PointsBadge";
import type { MascotName } from "@/content/mascot";
import { readPoints, writePoints } from "@/lib/points";
import { MythFactGame } from "./MythFactGame";
import { PeriodBagGame } from "./PeriodBagGame";
import { QuizGame } from "./QuizGame";

type GameId = "mf" | "quiz" | "bag";
const tabs: { id: GameId; label: string; img: MascotName }[] = [
  { id: "mf", label: "Myth hay Fact", img: "pipi-search" },
  { id: "quiz", label: "Quiz 6 bài học", img: "pipi-teach" },
  { id: "bag", label: "Túi kỳ đầu", img: "pipi-happy" },
];

export function GameCorner() {
  const [game, setGame] = useState<GameId>("mf");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Đọc điểm đã lưu sau khi hydrate (localStorage chỉ có ở trình duyệt).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPoints(readPoints());
  }, []);

  const addPoints = useCallback((n: number) => {
    setPoints((p) => {
      const next = p + n;
      writePoints(next);
      return next;
    });
  }, []);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div role="tablist" aria-label="Chọn trò chơi" className="flex flex-wrap gap-2.5">
          {tabs.map((t) => {
            const on = t.id === game;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={on}
                aria-controls="game-area"
                onClick={() => setGame(t.id)}
                className={`flex items-center gap-2 rounded-[18px] border-2 py-2 pr-4 pl-2 text-[15px] font-extrabold ${
                  on ? "border-ruby bg-blush-soft text-ruby" : "border-line bg-white text-ink"
                }`}
              >
                <Mascot name={t.img} height={42} />
                {t.label}
              </button>
            );
          })}
        </div>
        <PointsBadge points={points} />
      </div>
      <div
        id="game-area"
        role="tabpanel"
        aria-labelledby={`tab-${game}`}
        className={cardClass("default", "p-8 max-sm:p-5")}
      >
        {game === "mf" && <MythFactGame key="mf" addPoints={addPoints} />}
        {game === "quiz" && <QuizGame key="quiz" addPoints={addPoints} />}
        {game === "bag" && <PeriodBagGame key="bag" addPoints={addPoints} />}
      </div>
    </>
  );
}
