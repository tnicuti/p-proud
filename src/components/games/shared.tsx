"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Lead } from "@/components/ui/Layout";
import { Mascot } from "@/components/ui/Mascot";
import { isPass } from "@/lib/games";

export function ProgressHeader({ index, total, score }: { index: number; total: number; score: number }) {
  return (
    <>
      <div className="flex justify-between font-bold">
        <span>
          Câu {index + 1}/{total}
        </span>
        <span>Đúng: {score}</span>
      </div>
      <div
        className="mt-1.5 mb-[18px] h-2.5 overflow-hidden rounded-full bg-blush-soft"
        role="progressbar"
        aria-label="Tiến độ"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index}
      >
        <i
          className="block h-full rounded-full bg-rose transition-[width] duration-300"
          style={{ width: `${(index / total) * 100}%` }}
        />
      </div>
    </>
  );
}

export function Feedback({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div
      role="status"
      className={`mt-[18px] rounded-2xl p-3.5 text-left text-[15px] ${ok ? "bg-mint-soft text-mint-ink" : "bg-blush-soft text-ruby-dark"}`}
    >
      {children}
    </div>
  );
}

export function WinScreen({ score, total, onAgain }: { score: number; total: number; onAgain: () => void }) {
  const great = isPass(score, total);
  return (
    <div className="p-6 text-center">
      <Mascot name={great ? "pipi-drum" : "pipi-hi"} height={150} className="mx-auto mb-2.5" />
      <h2>{great ? "Tuyệt vời!" : "Cố lên nhé!"}</h2>
      <Lead className="mx-auto mb-4">
        Bạn đúng {score}/{total} câu
        {great ? " và nhận huy hiệu “Kiêu hãnh” 👑" : ". Chơi lại để nhận huy hiệu nhé!"}
      </Lead>
      <Button onClick={onAgain} autoFocus>
        Chơi lại
      </Button>
    </div>
  );
}
