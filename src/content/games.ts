/** Dữ liệu 3 trò chơi. Chép nguyên văn từ reference/index.html. */

export interface MythFact {
  q: string;
  a: "myth" | "fact";
  e: string;
}

export const mfData: MythFact[] = [
  {
    q: "Đang có kinh thì không được tắm gội.",
    a: "myth",
    e: "Tắm bằng nước ấm giúp bạn sạch sẽ và dễ chịu hơn. Bạn hoàn toàn có thể tắm gội bình thường.",
  },
  {
    q: "Máu kinh là máu bẩn.",
    a: "myth",
    e: "Máu kinh gồm máu và lớp niêm mạc tử cung bong ra. Đây là quá trình tự nhiên, không phải “máu bẩn”.",
  },
  {
    q: "Trong 1–2 năm đầu, chu kỳ kinh nguyệt có thể chưa đều.",
    a: "fact",
    e: "Cơ thể cần thời gian để ổn định nội tiết, nên chu kỳ lúc đầu có thể đến sớm hoặc muộn.",
  },
  {
    q: "Nên thay băng vệ sinh khoảng mỗi 4 giờ, kể cả khi chưa đầy.",
    a: "fact",
    e: "Thay băng thường xuyên giúp giữ vệ sinh và tránh mùi khó chịu.",
  },
  {
    q: "Đến kỳ thì không được vận động hay chơi thể thao.",
    a: "myth",
    e: "Vận động nhẹ nhàng còn có thể giúp giảm đau bụng kinh. Hãy nghe cơ thể mình và nghỉ khi thấy mệt.",
  },
  {
    q: "Con trai không cần biết gì về kinh nguyệt.",
    a: "myth",
    e: "Khi bạn nam hiểu đúng, lớp học sẽ bớt trêu chọc và mọi người tôn trọng nhau hơn.",
  },
  {
    q: "Đau bụng nhẹ trong 1–2 ngày đầu kỳ kinh là khá phổ biến.",
    a: "fact",
    e: "Đau nhẹ là thường gặp. Nếu đau dữ dội đến mức không đi học được, hãy báo người lớn và đi khám.",
  },
  {
    q: "Ăn đồ lạnh khi đến kỳ sẽ làm “tắc kinh”.",
    a: "myth",
    e: "Không có bằng chứng đồ lạnh làm tắc kinh. Bạn chỉ cần ăn uống đủ chất và uống đủ nước.",
  },
  {
    q: "Có kinh lần đầu là dấu hiệu cơ thể đang phát triển bình thường.",
    a: "fact",
    e: "Kỳ kinh đầu là một cột mốc tự nhiên của tuổi dậy thì, rất đáng tự hào!",
  },
  {
    q: "Băng vệ sinh đã dùng có thể vứt vào bồn cầu.",
    a: "myth",
    e: "Hãy gói băng đã dùng vào giấy hoặc vỏ băng mới rồi bỏ vào thùng rác để tránh tắc bồn cầu.",
  },
];

export interface QuizItem {
  q: string;
  o: [string, string, string, string];
  a: number;
  e: string;
}

export const quizData: QuizItem[] = [
  {
    q: "Kinh nguyệt là gì?",
    o: [
      "Máu bẩn tích tụ trong cơ thể",
      "Lớp niêm mạc tử cung bong ra cùng máu",
      "Dấu hiệu của bệnh",
      "Chỉ xảy ra khi bị ốm",
    ],
    a: 1,
    e: "Mỗi chu kỳ, niêm mạc tử cung dày lên rồi bong ra cùng máu nếu không có thai.",
  },
  {
    q: "Một chu kỳ kinh nguyệt được tính từ khi nào?",
    o: ["Ngày cuối của kỳ kinh", "Ngày đầu tiên có kinh", "Ngày rụng trứng", "Ngày đầu tháng dương lịch"],
    a: 1,
    e: "Chu kỳ tính từ ngày đầu có kinh đến ngày đầu của kỳ kinh tiếp theo.",
  },
  {
    q: "Nên thay băng vệ sinh bao lâu một lần?",
    o: ["Một lần mỗi ngày", "Khoảng mỗi 4 giờ hoặc sớm hơn", "Chỉ khi băng đầy hẳn", "Một lần mỗi kỳ"],
    a: 1,
    e: "Thay khoảng mỗi 4 giờ giúp sạch sẽ và thoải mái.",
  },
  {
    q: "Đâu thường là thay đổi đầu tiên ở tuổi dậy thì của bạn nữ?",
    o: ["Giọng trầm hơn", "Ngực bắt đầu phát triển", "Mọc râu", "Ngừng cao lên"],
    a: 1,
    e: "Ngực phát triển thường là dấu hiệu đầu tiên, vài năm sau mới có kinh.",
  },
  {
    q: "Khi đau bụng kinh nhẹ, bạn có thể làm gì?",
    o: ["Nhịn ăn cả ngày", "Chườm ấm và nghỉ ngơi", "Uống nhiều nước đá", "Chịu đựng, không nói với ai"],
    a: 1,
    e: "Chườm ấm, nghỉ ngơi và vận động nhẹ thường giúp dễ chịu hơn.",
  },
  {
    q: "Khi nào nên nói với người lớn và đi khám?",
    o: [
      "Kỳ kinh kéo dài 4 ngày",
      "Đau dữ dội hoặc kinh kéo dài hơn 7 ngày",
      "Thấy hơi mệt một chút",
      "Chu kỳ năm đầu chưa đều",
    ],
    a: 1,
    e: "Đau dữ dội, ra quá nhiều hoặc kéo dài hơn 7 ngày là dấu hiệu nên đi khám.",
  },
  {
    q: "Nếu bị trêu chọc vì đến kỳ, bạn nên làm gì?",
    o: [
      "Giấu đi và nghỉ học",
      "Nói với thầy cô hoặc người lớn tin cậy",
      "Trêu lại bạn ấy",
      "Không bao giờ mang băng đến trường",
    ],
    a: 1,
    e: "Bạn không sai. Người lớn tin cậy sẽ giúp bạn giải quyết.",
  },
  {
    q: "Băng vệ sinh đã dùng nên xử lý thế nào?",
    o: ["Vứt vào bồn cầu", "Gói lại và bỏ vào thùng rác", "Để trong cặp sách", "Vứt ra sân trường"],
    a: 1,
    e: "Gói kín bằng giấy hoặc vỏ băng mới rồi bỏ vào thùng rác.",
  },
];

export interface BagItem {
  e: string;
  n: string;
  ok: boolean;
}

export const bagItems: BagItem[] = [
  { e: "🩹", n: "Băng vệ sinh", ok: true },
  { e: "🩲", n: "Quần lót dự phòng", ok: true },
  { e: "🧻", n: "Khăn giấy / khăn ướt", ok: true },
  { e: "👝", n: "Túi nhỏ kín để gói băng đã dùng", ok: true },
  { e: "🧴", n: "Nước rửa tay khô", ok: true },
  { e: "🎮", n: "Máy chơi game", ok: false },
  { e: "💄", n: "Son bóng", ok: false },
  { e: "📚", n: "Truyện tranh", ok: false },
  { e: "🍬", n: "Kẹo cao su", ok: false },
];

/** Điểm thưởng (giữ đúng prototype). */
export const POINTS = {
  correctAnswer: 10,
  bagItem: 5,
  bagPerfectBonus: 15,
  passRatio: 0.7,
} as const;
