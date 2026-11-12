/** Điểm vương miện ở Góc trò chơi, lưu trên thiết bị (localStorage, có try/catch). */
const KEY = "pproud:points";

export function readPoints(): number {
  try {
    const n = Number(window.localStorage.getItem(KEY));
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}

export function writePoints(n: number): void {
  try {
    window.localStorage.setItem(KEY, String(n));
  } catch {
    /* trình duyệt chặn lưu trữ: vẫn chơi được, chỉ không nhớ điểm */
  }
}
