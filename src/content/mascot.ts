/**
 * Nguồn duy nhất cho mọi ảnh mascot và logo. Component chỉ lấy ảnh từ file này.
 * Thay ảnh: chép đè file cùng tên trong public/mascot/ (PNG nền trong suốt) rồi build lại.
 * Chiều rộng, chiều cao được Next.js đọc tự động từ file nên không phải sửa số nào.
 */
import type { StaticImageData } from "next/image";
import logo from "../../public/mascot/logo.png";
import logoWhite from "../../public/mascot/logo-white.png";
import calm from "../../public/mascot/pipi-calm.png";
import cloud from "../../public/mascot/pipi-cloud.png";
import drum from "../../public/mascot/pipi-drum.png";
import flowers from "../../public/mascot/pipi-flowers.png";
import happy from "../../public/mascot/pipi-happy.png";
import hi from "../../public/mascot/pipi-hi.png";
import jump from "../../public/mascot/pipi-jump.png";
import main from "../../public/mascot/pipi-main.png";
import paint from "../../public/mascot/pipi-paint.png";
import search from "../../public/mascot/pipi-search.png";
import sleep from "../../public/mascot/pipi-sleep.png";
import teach from "../../public/mascot/pipi-teach.png";
import wonder from "../../public/mascot/pipi-wonder.png";
import zen from "../../public/mascot/pipi-zen.png";

const m = (image: StaticImageData, alt: string) => ({ src: image, width: image.width, height: image.height, alt });

export const mascots = {
  "pipi-calm": m(calm, "PiPi nhắm mắt mỉm cười"),
  "pipi-cloud": m(cloud, "PiPi ngủ trên đám mây"),
  "pipi-drum": m(drum, "PiPi đánh trống ăn mừng"),
  "pipi-flowers": m(flowers, "PiPi ôm bó hoa"),
  "pipi-happy": m(happy, "PiPi chắp tay vui vẻ"),
  "pipi-hi": m(hi, "PiPi vẫy tay chào"),
  "pipi-jump": m(jump, "PiPi nhảy dây"),
  "pipi-main": m(main, "Mascot PiPi"),
  "pipi-paint": m(paint, "PiPi vẽ trái tim"),
  "pipi-search": m(search, "PiPi cầm kính lúp"),
  "pipi-sleep": m(sleep, "PiPi ngủ trên đám mây"),
  "pipi-teach": m(teach, "PiPi đeo kính chỉ bảng"),
  "pipi-wonder": m(wonder, "PiPi mắt long lanh"),
  "pipi-zen": m(zen, "PiPi ngồi thiền"),
} as const;

export type MascotName = keyof typeof mascots;

/** Logo màu (nền sáng) và logo trắng (nền ruby). */
export const logos = {
  color: m(logo, "P-Proud"),
  white: m(logoWhite, "P-Proud"),
} as const;

/** Ảnh hiện khi chia sẻ link (Facebook, Zalo). File: public/og.png, 1200×630. */
export const shareImage = { url: "/og.png", width: 1200, height: 630, alt: "P-Proud" };
