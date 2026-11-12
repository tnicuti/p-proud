/** Nội dung chung. Chép nguyên văn từ reference/index.html. */

export type Tone = "blush" | "gold" | "mint";

export const toneBg: Record<Tone, string> = {
  blush: "bg-blush-soft",
  gold: "bg-gold-soft",
  mint: "bg-mint-soft",
};

export const site = {
  name: "P-Proud",
  tagline: "Kiêu hãnh đón “kỳ”, tự tin con gái",
  taglineEn: "Be Proud of your Period",
  description:
    "P-Proud là người bạn đồng hành giúp nữ sinh lớp 6–7 hiểu đúng về kinh nguyệt và tuổi dậy thì, tự tin chăm sóc bản thân và biết tìm sự hỗ trợ khi cần.",
  demoBanner: "Bản demo website dự án P-Proud – nội dung và số liệu mang tính minh họa",
};

export const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/ve-chung-minh", label: "Về chúng mình" },
  { href: "/bo-cong-cu", label: "Bộ công cụ" },
  { href: "/cong-dong", label: "Cộng đồng" },
  { href: "/blog", label: "Blog" },
  { href: "/dien-dan", label: "Diễn đàn" },
  { href: "/tro-choi", label: "Góc trò chơi" },
] as const;

export const sponsors = [
  { n: "Dạ Hương", d: "Dược phẩm Hoa Linh" },
  { n: "Diana", d: "Diana Unicharm Việt Nam" },
  { n: "Laurier", d: "Kao Việt Nam" },
  { n: "TELOS", d: "Thiết kế website" },
];

export const team = [
  { initials: "NH", name: "Nhật Hà", role: "Quản lý dự án" },
  { initials: "KT", name: "Kiều Trang", role: "Trưởng nhóm đối tác" },
  { initials: "UP", name: "Uyên Phương", role: "Trưởng nhóm nội dung" },
  { initials: "TN", name: "Thục Nhi", role: "Trưởng nhóm website" },
  { initials: "XT", name: "Xuân Tiếp", role: "Trưởng nhóm vận hành" },
  { initials: "VN", name: "Vân Như", role: "Trưởng nhóm giám sát và đánh giá" },
];

export const phases = [
  {
    n: 1,
    weeks: "Tuần 1–7",
    title: "Khởi động và kết nối",
    desc: "Lập kế hoạch, làm việc với nhà trường và nhà tài trợ.",
  },
  {
    n: 2,
    weeks: "Tuần 8–13",
    title: "Website và tài liệu",
    desc: "Xây dựng website, soạn bài học, in cẩm nang và poster.",
  },
  {
    n: 3,
    weeks: "Tuần 14–17",
    title: "Chuẩn bị và thử nghiệm",
    desc: "Mua vật dụng, chạy thử với nhóm nhỏ và hoàn thiện.",
  },
  { n: 4, weeks: "Tuần 18–20", title: "Triển khai tại trường", desc: "6 bài học, trò chơi, trao bộ vật dụng vệ sinh." },
  {
    n: 5,
    weeks: "Tuần 20–23",
    title: "Đánh giá và bàn giao",
    desc: "Đo kết quả, tập huấn giáo viên, bàn giao cho nhà trường.",
  },
];

export const stakeholders = [
  {
    icon: "🏫",
    title: "Nhà trường",
    items: ["Trường THCS đối tác tại Quận 8, TP.HCM", "Ban giám hiệu, giáo viên chủ nhiệm và nhân viên y tế trường"],
  },
  {
    icon: "🩺",
    title: "Hội đồng chuyên môn",
    items: [
      "Bác sĩ Sản phụ khoa, ĐH Y Dược TP.HCM",
      "Chuyên gia tâm lý giáo dục",
      "Giáo viên Sinh học THCS",
      "Đại diện Hội Liên hiệp Phụ nữ",
    ],
  },
  {
    icon: "🤝",
    title: "Nhà tài trợ dự kiến",
    items: [
      "Dạ Hương – Dược phẩm Hoa Linh",
      "Diana Unicharm Việt Nam",
      "Kao Việt Nam – Laurier",
      "TELOS (hỗ trợ thiết kế website)",
    ],
  },
];

export const homeStats = [
  { value: "120", label: "nữ sinh lớp 6–7 tham gia" },
  { value: "6", label: "bài học tương tác" },
  { value: "100%", label: "học sinh nhận bộ vật dụng vệ sinh" },
  { value: "23", label: "tuần triển khai dự án" },
];

export const communityStats = [
  { value: "120", label: "nữ sinh tham gia" },
  { value: "≥ 3", label: "giáo viên được tập huấn" },
  { value: "20", label: "poster lớp học" },
  { value: "50", label: "đầu sách cho thư viện" },
];

export const pillars = [
  {
    img: "pipi-teach",
    p: "P – PERIOD",
    title: "Hiểu về kinh nguyệt",
    desc: "Chu kỳ là gì, vì sao có kinh, chăm sóc bản thân trong những ngày “đèn đỏ” ra sao.",
  },
  {
    img: "pipi-wonder",
    p: "P – PUBERTY",
    title: "Lớn lên tự tin",
    desc: "Những thay đổi của cơ thể và cảm xúc ở tuổi dậy thì đều là điều bình thường.",
  },
  {
    img: "pipi-paint",
    p: "P – PEER",
    title: "Tôn trọng lẫn nhau",
    desc: "Bạn nam và bạn nữ cùng hiểu đúng để không còn trêu chọc hay xấu hổ.",
  },
] as const;

export const highlights = [
  {
    img: "pipi-teach",
    tone: "blush",
    chip: "Tuần 18–20",
    title: "Lớp học P-Proud",
    desc: "6 buổi học tương tác tại trường, kết hợp thảo luận, trò chơi và quiz.",
  },
  {
    img: "pipi-drum",
    tone: "gold",
    chip: "Ngày hội",
    title: "Gian hàng Myth hay Fact",
    desc: "Học sinh cùng nhau “bóc mẽ” những hiểu lầm quen thuộc về kinh nguyệt.",
  },
  {
    img: "pipi-zen",
    tone: "mint",
    chip: "Bàn giao",
    title: "Góc nữ sinh tại phòng y tế",
    desc: "Tủ băng vệ sinh, sách và poster ở lại trường để hỗ trợ các khóa sau.",
  },
] as const;
