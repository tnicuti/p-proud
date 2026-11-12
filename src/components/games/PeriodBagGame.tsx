"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { bagItems } from "@/content/games";
import { scoreBag, type BagResult } from "@/lib/games";
import { Feedback } from "./shared";

export function PeriodBagGame({ addPoints }: { addPoints: (n: number) => void }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [result, setResult] = useState<BagResult | null>(null);
  const [error, setError] = useState("");

  function toggle(i: number) {
    if (result) return;
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
    setError("");
  }

  function check() {
    if (result) return;
    if (!selected.size) return setError("Chọn ít nhất một món trước khi kiểm tra nhé.");
    const r = scoreBag(bagItems, selected);
    setResult(r);
    addPoints(r.points);
  }

  function reset() {
    setSelected(new Set());
    setResult(null);
    setError("");
  }

  return (
    <>
      <div className="my-[18px] mt-0 flex items-center gap-4">
        <Mascot name="pipi-happy" height={100} className="shrink-0" />
        <div>
          <h3 className="m-0">Chuẩn bị túi kỳ đầu</h3>
          <p className="m-0 text-ink-soft">
            Chọn những món nên có trong túi nhỏ mang đến trường, rồi bấm “Kiểm tra túi”.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        {bagItems.map((it, i) => {
          const sel = selected.has(i);
          const cls = result
            ? it.ok
              ? "border-mint bg-mint-soft"
              : sel
                ? "border-ruby bg-white opacity-60"
                : "border-line bg-white"
            : sel
              ? "border-ruby bg-blush-soft"
              : "border-line bg-white";
          return (
            <button
              key={it.n}
              type="button"
              aria-pressed={sel}
              aria-disabled={!!result}
              onClick={() => toggle(i)}
              className={`rounded-[18px] border-2 p-3.5 text-center text-[15px] font-bold text-ink ${cls}`}
            >
              <span aria-hidden="true" className="mb-1.5 block text-[34px]">
                {it.e}
              </span>
              {it.n}
            </button>
          );
        })}
      </div>
      <div className="mt-3 min-h-[1em] text-[13px] text-ruby" role="alert">
        {error}
      </div>
      <div className="mt-2 flex gap-2.5">
        <Button onClick={check} disabled={!!result}>
          Kiểm tra túi
        </Button>
        <Button variant="ghost" onClick={reset}>
          Làm lại
        </Button>
      </div>
      {result && (
        <Feedback ok={result.perfect}>
          {result.perfect ? (
            <>
              <b>Túi hoàn hảo! +{result.points} điểm</b>
              <br />
              Bạn đã sẵn sàng cho kỳ kinh đầu tiên ở trường rồi đó.
            </>
          ) : (
            <>
              <b>
                Bạn chọn đúng {result.right}/{result.need} món cần thiết (+{result.points} điểm)
              </b>
              <br />
              Những ô viền xanh là món nên có. Máy chơi game, son, truyện hay kẹo không sai, nhưng không cần cho “túi kỳ
              đầu” đâu nhé.
            </>
          )}
        </Feedback>
      )}
    </>
  );
}
