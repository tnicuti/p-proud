/** Diễn đàn: chủ đề, nội quy và 4 thread mẫu. Chép nguyên văn từ reference/index.html. */

export const forumTopics = ["Kinh nguyệt", "Tuổi dậy thì", "Cảm xúc", "Bình đẳng giới"] as const;
export type ForumTopic = (typeof forumTopics)[number];

export interface ForumAnswer {
  /** true = chuyên gia (nền vàng, có 👑); false = bạn bè hoặc PiPi (nền hồng) */
  expert: boolean;
  name: string;
  text: string;
}

export interface ForumThread {
  id: string;
  topic: ForumTopic;
  nick: string;
  color: string;
  question: string;
  /** Thời điểm đăng (ISO). Thread mẫu dùng `timeLabel` cố định như prototype. */
  createdAt?: string;
  timeLabel?: string;
  likes: number;
  answers: ForumAnswer[];
}

/** Màu avatar chữ cái đầu cho nickname (lấy từ 4 thread mẫu). */
export const avatarColors = ["#E999A7", "#970A1D", "#F0BF49", "#5FB894"];

export const forumRules = [
  "Không chia sẻ họ tên thật, trường, địa chỉ hay số điện thoại.",
  "Tôn trọng mọi câu hỏi, không chê cười hay trêu chọc.",
  "Câu trả lời trên diễn đàn không thay thế việc đi khám.",
  "Thấy nội dung không phù hợp, hãy bấm “Báo cáo”.",
  "Cần giúp đỡ khẩn cấp? Gọi Tổng đài 111 (miễn phí, 24/7).",
];

export const seedThreads: ForumThread[] = [
  {
    id: "seed-1",
    topic: "Kinh nguyệt",
    nick: "Mây Hồng",
    color: "#E999A7",
    question: "Mình 12 tuổi mà chưa có kinh, vậy có sao không ạ?",
    timeLabel: "2 giờ trước",
    likes: 14,
    answers: [
      {
        expert: true,
        name: "BS. Sản phụ khoa",
        text: "Không sao đâu bạn nhé. Kỳ kinh đầu thường đến trong khoảng 10–15 tuổi, mỗi người một khác. Nếu đến 15 tuổi vẫn chưa có kinh, bạn nên cùng bố mẹ đi khám để yên tâm.",
      },
    ],
  },
  {
    id: "seed-2",
    topic: "Cảm xúc",
    nick: "Ẩn danh",
    color: "#970A1D",
    question: "Bạn nam trong lớp hay trêu khi thấy mình mang băng vệ sinh, mình nên làm gì?",
    timeLabel: "5 giờ trước",
    likes: 22,
    answers: [
      {
        expert: true,
        name: "Chuyên gia tâm lý",
        text: "Bạn không làm gì sai cả. Hãy nói rõ “Mình không thích bị trêu như vậy” và kể với cô chủ nhiệm. Thầy cô có trách nhiệm giúp lớp học trở thành nơi an toàn cho bạn.",
      },
      {
        expert: false,
        name: "Nắng Mai",
        text: "Mình cũng từng bị vậy, kể với cô xong là các bạn ấy thôi luôn. Cố lên nha!",
      },
    ],
  },
  {
    id: "seed-3",
    topic: "Tuổi dậy thì",
    nick: "Bánh Bao",
    color: "#F0BF49",
    question: "Dạo này mình hay nổi mụn và dễ cáu, có phải do dậy thì không?",
    timeLabel: "Hôm qua",
    likes: 9,
    answers: [
      {
        expert: true,
        name: "Giáo viên Sinh học",
        text: "Đúng rồi, nội tiết thay đổi ở tuổi dậy thì có thể làm da nhờn hơn và cảm xúc lên xuống. Rửa mặt nhẹ nhàng 2 lần mỗi ngày, ngủ đủ giấc và chia sẻ với người bạn tin cậy sẽ giúp bạn dễ chịu hơn.",
      },
    ],
  },
  {
    id: "seed-4",
    topic: "Bình đẳng giới",
    nick: "Gấu Trúc",
    color: "#5FB894",
    question: "Mình là con trai, mình có nên đọc về kinh nguyệt không?",
    timeLabel: "2 ngày trước",
    likes: 31,
    answers: [
      {
        expert: false,
        name: "PiPi",
        text: "Có chứ! Hiểu về kinh nguyệt giúp bạn tôn trọng bạn bè và người thân. Ghé mục Blog đọc bài “Con trai cũng nên hiểu về kinh nguyệt” nhé.",
      },
    ],
  },
];
