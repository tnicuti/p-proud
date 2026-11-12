/**
 * Ảnh mascot PiPi. Muốn thay bản chất lượng cao: chép đè file cùng tên trong
 * public/mascot/ rồi build lại. Kích thước được Next.js đọc tự động từ file.
 */
import logo from "../../public/mascot/logo.png";
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

export const mascots = {
  "pipi-calm": calm,
  "pipi-cloud": cloud,
  "pipi-drum": drum,
  "pipi-flowers": flowers,
  "pipi-happy": happy,
  "pipi-hi": hi,
  "pipi-jump": jump,
  "pipi-main": main,
  "pipi-paint": paint,
  "pipi-search": search,
  "pipi-sleep": sleep,
  "pipi-teach": teach,
  "pipi-wonder": wonder,
  "pipi-zen": zen,
} as const;

export type MascotName = keyof typeof mascots;
export const logoImage = logo;
