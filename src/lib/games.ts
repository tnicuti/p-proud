/** Logic thuần của 3 trò chơi (không phụ thuộc React, có unit test). */
import { POINTS, type BagItem } from "@/content/games";

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Đạt khi đúng ≥ 70% (làm tròn lên số câu, giống prototype). */
export function isPass(score: number, total: number): boolean {
  return score >= Math.ceil(total * POINTS.passRatio);
}

export interface BagResult {
  right: number;
  wrong: number;
  need: number;
  perfect: boolean;
  points: number;
}

export function scoreBag(items: readonly BagItem[], selected: ReadonlySet<number>): BagResult {
  const need = items.filter((x) => x.ok).length;
  let right = 0;
  let wrong = 0;
  selected.forEach((i) => (items[i]?.ok ? right++ : wrong++));
  const perfect = right === need && wrong === 0;
  return { right, wrong, need, perfect, points: right * POINTS.bagItem + (perfect ? POINTS.bagPerfectBonus : 0) };
}
