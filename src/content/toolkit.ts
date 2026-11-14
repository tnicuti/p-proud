/** Bộ công cụ và 6 bài học. Chép nguyên văn từ reference/index.html. */
import type { MascotName } from "@/content/mascot";
import type { Tone } from "./site";

export type Audience = "hs" | "gv" | "ph";

export interface Kit {
  title: string;
  audience: Audience;
  img: MascotName;
  tone: Tone;
  tags: [string, string];
  desc: string;
  outline: string[];
}

export const kitFilters: { value: Audience | ""; label: string }[] = [
  { value: "", label: "Tất cả" },
  { value: "hs", label: "Cho học sinh" },
  { value: "gv", label: "Cho thầy cô và nhà trường" },
  { value: "ph", label: "Cho phụ huynh" },
];

export const kits: Kit[] = [
  {
    title: "Cẩm nang nữ sinh",
    audience: "hs",
    img: "pipi-wonder",
    tone: "blush",
    tags: ["Học sinh", "A5 · 35 trang"],
    desc: "Sổ tay màu dễ thương giải thích chu kỳ, cách dùng băng vệ sinh và chăm sóc bản thân.",
    outline: [
      "Cơ thể mình đang lớn lên",
      "Kinh nguyệt là gì?",
      "Chu kỳ và các giai đoạn",
      "Chọn và dùng băng vệ sinh",
      "Chăm sóc bản thân trong kỳ kinh",
      "Khi nào cần hỏi người lớn?",
    ],
  },
  {
    title: "Sổ tay giáo viên",
    audience: "gv",
    img: "pipi-teach",
    tone: "gold",
    tags: ["Giáo viên", "A4 · 6 giáo án"],
    desc: "Giáo án chi tiết cho 6 buổi học, gợi ý trả lời câu hỏi nhạy cảm và cách xử lý khi học sinh bị trêu.",
    outline: [
      "Mục tiêu và cách dùng sổ tay",
      "6 giáo án chi tiết",
      "Ngân hàng câu hỏi Myth hay Fact",
      "Gợi ý trả lời câu hỏi khó",
      "Xử lý tình huống trêu chọc",
      "Phiếu đánh giá trước và sau",
    ],
  },
  {
    title: "Poster song ngữ",
    audience: "gv",
    img: "pipi-paint",
    tone: "mint",
    tags: ["Lớp học", "A3 · 20 tờ"],
    desc: "Bộ poster Việt – Anh về chu kỳ kinh nguyệt và vệ sinh cá nhân để treo trong lớp và phòng y tế.",
    outline: [
      "Chu kỳ kinh nguyệt của bạn",
      "5 bước thay băng vệ sinh",
      "Myth hay Fact?",
      "Kinh nguyệt là chuyện bình thường",
      "Bạn có thể hỏi ai?",
    ],
  },
  {
    title: "Hướng dẫn cho phụ huynh",
    audience: "ph",
    img: "pipi-flowers",
    tone: "blush",
    tags: ["Phụ huynh", "Bản điện tử"],
    desc: "Gợi ý cách trò chuyện cởi mở với con về kỳ kinh đầu tiên và chuẩn bị đồ dùng cùng con.",
    outline: [
      "Vì sao nên nói chuyện sớm?",
      "Gợi ý câu mở đầu",
      "Chuẩn bị túi kỳ đầu cùng con",
      "Dấu hiệu cần đưa con đi khám",
    ],
  },
  {
    title: "Hướng dẫn quản trị website",
    audience: "gv",
    img: "pipi-search",
    tone: "gold",
    tags: ["Nhà trường", "A4"],
    desc: "Cách đăng nhập, cập nhật bài viết, xem báo cáo học tập và duyệt câu hỏi trên diễn đàn.",
    outline: [
      "Đăng nhập tài khoản quản trị",
      "Cập nhật bài viết và bài học",
      "Xem tiến độ học với mã ẩn danh",
      "Duyệt và báo cáo nội dung diễn đàn",
    ],
  },
  {
    title: "Bộ vật dụng vệ sinh",
    audience: "hs",
    img: "pipi-happy",
    tone: "mint",
    tags: ["Học sinh", "120 bộ"],
    desc: "Túi vải nhỏ xinh kèm băng vệ sinh, trao tận tay mỗi bạn nữ tham gia lớp học.",
    outline: ["Túi vải rút dây 10 × 17,5 cm", "Băng vệ sinh siêu mỏng có cánh", "Thẻ hướng dẫn 5 bước thay băng"],
  },
];

export const lessons = [
  { title: "Cơ thể mình đang lớn lên", desc: "Những thay đổi bình thường ở tuổi dậy thì" },
  { title: "Kinh nguyệt là gì?", desc: "Vì sao có kinh và máu kinh đến từ đâu" },
  { title: "Chu kỳ kinh nguyệt", desc: "Các giai đoạn: hành kinh, nang trứng, rụng trứng, hoàng thể" },
  { title: "Băng vệ sinh và cách dùng", desc: "Chọn loại phù hợp, thay và bỏ đúng cách" },
  { title: "Chăm sóc bản thân", desc: "Vệ sinh, ăn uống, vận động và xử lý đau bụng kinh" },
  { title: "Tự tin và tôn trọng", desc: "Cảm xúc tuổi dậy thì, khi bị trêu và nơi tìm hỗ trợ" },
];

/** Câu hỏi soạn sẵn khi bấm "Hỏi PiPi" ở một bài học (giống prototype). */
export const lessonQuestion = (i: number) => `Kể mình nghe ngắn gọn về bài ${i + 1}: ${lessons[i].title}`;
