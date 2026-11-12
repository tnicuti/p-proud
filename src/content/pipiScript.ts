/**
 * KỊCH BẢN TRẢ LỜI CỦA PIPI (bản chưa dùng AI thật).
 *
 * Mỗi mục gồm từ khóa và câu trả lời. Từ khóa viết thường, KHÔNG DẤU
 * (ví dụ "dau bung"), hệ thống tự bỏ dấu câu hỏi trước khi so khớp.
 * Mục đứng trước được ưu tiên, nên các mục an toàn luôn nằm đầu danh sách.
 *
 * Nội dung trả lời được ghép từ các câu đã có trong website (blog, Myth hay Fact,
 * quiz, diễn đàn, PIPI_RULES). Những câu đánh dấu [CẦN DUYỆT] là câu mới,
 * cần nhóm nội dung và hội đồng chuyên môn xem lại.
 */

export interface ScriptEntry {
  id: string;
  keywords: string[];
  answer: string;
}

export const pipiScript: ScriptEntry[] = [
  // ---------- AN TOÀN (luôn ưu tiên) ----------
  {
    id: "safety-danger", // [CẦN DUYỆT]
    keywords: [
      "xam hai",
      "sam so",
      "so vao nguoi",
      "so mo",
      "danh dap",
      "bi danh",
      "de doa",
      "bat nat",
      "tu tu",
      "muon chet",
      "tu lam dau",
      "tu hai",
      "cat tay",
      "khong muon song",
    ],
    answer:
      "PiPi rất lo cho bạn và cảm ơn bạn đã kể với PiPi 💕\n**Đó không phải lỗi của bạn.**\n- Hãy nói ngay với một người lớn bạn tin: bố mẹ, thầy cô hoặc nhân viên y tế trường.\n- Gọi **Tổng đài quốc gia bảo vệ trẻ em 111** (miễn phí, 24/7). Ở đó có người sẵn sàng lắng nghe và giúp bạn.\nBạn không phải chịu đựng một mình đâu.",
  },
  {
    id: "safety-medicine", // [CẦN DUYỆT]
    keywords: [
      "uong thuoc",
      "thuoc gi",
      "thuoc nao",
      "loai thuoc",
      "thuoc giam dau",
      "lieu thuoc",
      "lieu luong",
      "paracetamol",
      "ibuprofen",
      "uong gi cho het",
    ],
    answer:
      "PiPi không thể gợi ý thuốc hay liều thuốc đâu bạn nhé, vì việc đó cần bác sĩ hoặc nhân viên y tế quyết định.\nKhi đau nhẹ, bạn có thể thử **chườm ấm bụng dưới**, nghỉ ngơi và uống đủ nước. Nếu đau nhiều, hãy **nói với bố mẹ hoặc nhân viên y tế trường** nha 🌸",
  },
  {
    id: "safety-warning-signs",
    keywords: [
      "keo dai",
      "hon 7 ngay",
      "ra nhieu",
      "ra qua nhieu",
      "thay bang moi 1",
      "chong mat",
      "choang vang",
      "sot",
      "met la",
      "dau du doi",
      "dau qua",
      "15 tuoi chua",
    ],
    answer:
      "**Hãy nói với người lớn và đi khám nếu:**\n- Đau dữ dội đến mức không đi học được.\n- Kỳ kinh kéo dài hơn 7 ngày.\n- Phải thay băng mỗi 1–2 giờ vì ra quá nhiều.\n- Choáng váng, mệt lả hoặc sốt.\nBạn hãy kể với bố mẹ, thầy cô hoặc nhân viên y tế trường ngay nhé 💕",
  },
  {
    id: "adult-topic", // [CẦN DUYỆT]
    keywords: ["quan he", "tinh duc", "sex", "mang thai", "co thai", "bao cao su", "tranh thai"],
    answer:
      "Câu hỏi này PiPi xin phép không đi vào chi tiết nha 🌸 Bạn hãy hỏi **bố mẹ, thầy cô hoặc nhân viên y tế trường**, họ sẽ giải thích cho bạn rõ ràng và phù hợp nhất.\nNếu bạn muốn, PiPi có thể kể về **chu kỳ kinh nguyệt** nhé!",
  },
  {
    id: "personal-info", // [CẦN DUYỆT]
    keywords: ["so dien thoai", "sdt", "email", "dia chi nha", "ten that", "zalo", "facebook"],
    answer:
      "Bạn nhớ **không chia sẻ họ tên thật, trường, địa chỉ, số điện thoại hay ảnh** khi trò chuyện trên mạng nhé, kể cả với PiPi 💕 PiPi vẫn trả lời bạn được mà không cần những thông tin đó!",
  },

  // ---------- 6 BÀI HỌC (nút "Hỏi PiPi" ở Bộ công cụ) ----------
  {
    id: "lesson-1",
    keywords: ["bai 1", "co the minh dang lon len"],
    answer:
      "**Bài 1: Cơ thể mình đang lớn lên** 🌸\nTuổi dậy thì ở bạn nữ thường bắt đầu trong khoảng 8–13 tuổi. Mỗi người có tốc độ riêng, nên đừng so sánh mình với bạn khác nhé.\n- Ngực bắt đầu phát triển, thường là thay đổi đầu tiên.\n- Cao nhanh hơn, hông rộng hơn.\n- Da có thể nhờn hơn và nổi mụn.\n- Cảm xúc thay đổi nhanh hơn, dễ vui dễ buồn.",
  },
  {
    id: "lesson-2",
    keywords: ["bai 2"],
    answer:
      "**Bài 2: Kinh nguyệt là gì?** 👑\nMỗi chu kỳ, niêm mạc tử cung dày lên rồi bong ra cùng máu nếu không có thai. Đó chính là kinh nguyệt.\nMáu kinh gồm máu và lớp niêm mạc tử cung bong ra. Đây là quá trình tự nhiên, **không phải “máu bẩn”**.",
  },
  {
    id: "lesson-3",
    keywords: ["bai 3"],
    answer:
      "**Bài 3: Chu kỳ kinh nguyệt** ✨\nChu kỳ tính từ ngày đầu có kinh đến ngày đầu của kỳ kinh tiếp theo, ở tuổi dậy thì thường dài khoảng 21–45 ngày. Có 4 giai đoạn:\n- **Hành kinh** (khoảng 2–7 ngày)\n- **Nang trứng**\n- **Rụng trứng**\n- **Hoàng thể**",
  },
  {
    id: "lesson-4",
    keywords: ["bai 4"],
    answer:
      "**Bài 4: Băng vệ sinh và cách dùng** 🌸\n- Chọn băng có cánh hoặc loại dài hơn cho ngày ra nhiều.\n- **Thay băng khoảng mỗi 4 giờ** hoặc sớm hơn nếu thấy cần.\n- Gói băng đã dùng vào giấy hoặc vỏ băng mới rồi bỏ vào thùng rác, **không vứt vào bồn cầu**.",
  },
  {
    id: "lesson-5",
    keywords: ["bai 5"],
    answer:
      "**Bài 5: Chăm sóc bản thân** 💕\n- Tắm bằng nước ấm giúp bạn sạch sẽ và dễ chịu hơn.\n- Uống đủ nước, ăn uống đủ chất.\n- Vận động nhẹ nhàng có thể giúp giảm đau bụng kinh.\n- Đau nhẹ thì chườm ấm bụng dưới và nghỉ ngơi. Đau nhiều đến mức không học được thì báo cô giáo hoặc nhân viên y tế nhé.",
  },
  {
    id: "lesson-6",
    keywords: ["bai 6", "tu tin va ton trong"],
    answer:
      "**Bài 6: Tự tin và tôn trọng** 👑\nCảm xúc tuổi dậy thì có thể lên xuống, đó là điều bình thường. Nếu bị trêu vì đến kỳ: **bạn không sai**. Hãy nói rõ “Mình không thích bị trêu như vậy” và kể với thầy cô hoặc người lớn tin cậy. Một lớp học tôn trọng nhau là nơi ai cũng thấy an toàn để học tập.",
  },

  // ---------- CÂU HỎI THƯỜNG GẶP ----------
  {
    id: "first-period",
    keywords: ["lan dau", "dau tien", "ky dau", "chuan bi gi", "tui ky dau"],
    answer:
      "Kỳ kinh đầu tiên thường đến trong khoảng 10–15 tuổi, là dấu hiệu cơ thể bạn đang phát triển bình thường 🌸\n- **Chuẩn bị sẵn một túi nhỏ** gồm băng vệ sinh, quần lót dự phòng và khăn giấy.\n- Lượng máu thường ít, có khi chỉ là vài vệt nâu hoặc đỏ nhạt.\n- **Thay băng khoảng mỗi 4 giờ.**\n- Hãy nói với người bạn tin cậy như mẹ, chị, cô giáo hoặc nhân viên y tế trường.",
  },
  {
    id: "no-period-yet",
    keywords: ["chua co kinh", "chua co ky", "chua thay kinh"],
    answer:
      "Không sao đâu bạn nhé 💕 Kỳ kinh đầu thường đến trong khoảng 10–15 tuổi, mỗi người một khác. Nếu **đến 15 tuổi vẫn chưa có kinh**, bạn nên cùng bố mẹ đi khám để yên tâm.",
  },
  {
    id: "cramps",
    keywords: ["dau bung", "dau kinh", "dau lung"],
    answer:
      "Nhiều bạn thấy đau âm ỉ ở bụng dưới trong 1–2 ngày đầu, điều này khá phổ biến 🌸\n**Bạn có thể thử:**\n- Chườm ấm bụng dưới.\n- Nghỉ ngơi, vận động nhẹ hoặc đi bộ.\n- Uống đủ nước, ăn uống đầy đủ.\nNếu **đau dữ dội đến mức không đi học được**, hãy nói với người lớn và đi khám nhé.",
  },
  {
    id: "irregular",
    keywords: ["khong deu", "chua deu", "tre kinh", "som kinh", "lech ngay"],
    answer:
      "Trong 1–2 năm đầu, chu kỳ kinh nguyệt **có thể chưa đều** đâu bạn ✨ Cơ thể cần thời gian để ổn định nội tiết, nên kỳ kinh lúc đầu có thể đến sớm hoặc muộn. Bạn có thể đánh dấu ngày có kinh trên lịch để dần quen với chu kỳ của mình.",
  },
  {
    id: "cycle",
    keywords: ["chu ky", "giai doan", "rung trung", "hoang the", "nang trung", "bao nhieu ngay"],
    answer:
      "Một chu kỳ được tính từ ngày đầu tiên có kinh đến ngày đầu tiên của kỳ kinh tiếp theo, ở tuổi dậy thì thường dài khoảng **21–45 ngày** ✨\n- **Hành kinh:** niêm mạc tử cung bong ra cùng máu, khoảng 2–7 ngày.\n- **Nang trứng:** cơ thể chuẩn bị một trứng mới.\n- **Rụng trứng:** thường vào khoảng giữa chu kỳ.\n- **Hoàng thể:** nếu trứng không được thụ tinh, kỳ kinh mới bắt đầu.",
  },
  {
    id: "pads",
    keywords: ["bang ve sinh", "thay bang", "vut bang", "bo bang", "loai bang"],
    answer:
      "Vài điều về băng vệ sinh nè 🌸\n- **Thay khoảng mỗi 4 giờ**, kể cả khi chưa đầy, để giữ vệ sinh và tránh mùi khó chịu.\n- Ngày ra nhiều thì chọn băng có cánh hoặc loại dài hơn.\n- Gói băng đã dùng vào giấy hoặc vỏ băng mới rồi bỏ vào thùng rác, **không vứt vào bồn cầu** nhé.",
  },
  {
    id: "what-is-period",
    keywords: ["kinh nguyet la gi", "la gi vay", "vi sao co kinh", "tai sao co kinh", "mau kinh", "mau ban"],
    answer:
      "**Kinh nguyệt** là khi lớp niêm mạc tử cung bong ra cùng máu 🌸 Mỗi chu kỳ, niêm mạc tử cung dày lên rồi bong ra nếu không có thai.\nĐây là quá trình tự nhiên, **không phải “máu bẩn”** và cũng không phải dấu hiệu của bệnh. Có kinh là một phần bình thường và đáng tự hào của việc lớn lên 👑",
  },
  {
    id: "teasing",
    keywords: ["treu", "che cuoi", "xau ho", "ngai", "bi cuoi"],
    answer:
      "**Bạn không làm gì sai cả** 💕\n- Hãy nói rõ “Mình không thích bị trêu như vậy”.\n- Kể với cô chủ nhiệm hoặc người lớn tin cậy. Thầy cô có trách nhiệm giúp lớp học trở thành nơi an toàn cho bạn.\nĐừng giấu một mình nhé, PiPi luôn ủng hộ bạn!",
  },
  {
    id: "stain-at-school",
    keywords: ["dinh ra quan", "dinh quan", "o truong", "den do"],
    answer:
      "Vài mẹo để tự tin ở trường trong những ngày “đèn đỏ” nè ✨\n- Luôn để một túi nhỏ đựng băng vệ sinh và quần lót dự phòng trong cặp.\n- Lỡ bị dính ra quần? Buộc áo khoác ngang hông và xin phép lên phòng y tế, đây là chuyện rất nhiều bạn từng gặp.\n- Đau nhiều đến mức không học được thì hãy báo cô giáo hoặc nhân viên y tế.",
  },
  {
    id: "puberty",
    keywords: ["day thi", "nguc", "moc long", "cao len", "thay doi"],
    answer:
      "Tuổi dậy thì ở bạn nữ thường bắt đầu trong khoảng 8–13 tuổi, mỗi người có tốc độ riêng 🌸\n- Ngực bắt đầu phát triển, thường là thay đổi đầu tiên.\n- Cao nhanh hơn, hông rộng hơn.\n- Mọc lông ở nách và vùng kín.\n- Da có thể nhờn hơn và nổi mụn.\nTất cả đều là chuyện **bình thường**, đừng so sánh mình với bạn khác nhé!",
  },
  {
    id: "acne-mood",
    keywords: ["mun", "cau gian", "de cau", "buon", "cam xuc", "khoc"],
    answer:
      "Nội tiết thay đổi ở tuổi dậy thì có thể làm **da nhờn hơn** và **cảm xúc lên xuống**, điều đó bình thường lắm 💕\nRửa mặt nhẹ nhàng 2 lần mỗi ngày, ngủ đủ giấc và chia sẻ với người bạn tin cậy sẽ giúp bạn dễ chịu hơn.",
  },
  {
    id: "boys",
    keywords: ["con trai", "ban nam", "nam sinh", "anh trai"],
    answer:
      "Có chứ! Hiểu về kinh nguyệt giúp bạn nam **tôn trọng bạn bè và người thân** ✨\n- Không đùa cợt khi thấy bạn nữ mang băng vệ sinh hay xin phép ra ngoài.\n- Nếu thấy bạn bị dính ra quần, hãy kín đáo nhắc bạn hoặc báo cô giáo.\nGhé mục Blog đọc bài “Con trai cũng nên hiểu về kinh nguyệt” nhé.",
  },
  {
    id: "bathing",
    keywords: ["tam goi", "goi dau", "di tam", "duoc tam", "tam duoc", "tam khong", "tam rua"],
    answer:
      "Bạn **hoàn toàn có thể tắm gội bình thường** khi đến kỳ nhé 🌸 Tắm bằng nước ấm còn giúp bạn sạch sẽ và dễ chịu hơn nữa.",
  },
  {
    id: "sports",
    keywords: ["the thao", "van dong", "the duc", "chay bo", "boi"],
    answer:
      "Đến kỳ **vẫn vận động được** nha ✨ Vận động nhẹ nhàng còn có thể giúp giảm đau bụng kinh. Hãy nghe cơ thể mình và nghỉ khi thấy mệt.",
  },
  {
    id: "food",
    keywords: ["do lanh", "nuoc da", "nen an gi", "an uong", "kieng an", "tac kinh"],
    answer:
      "Không có bằng chứng đồ lạnh làm “tắc kinh” đâu bạn 🌸 Bạn chỉ cần **ăn uống đủ chất và uống đủ nước** là được.",
  },
  {
    id: "project",
    keywords: ["p-proud", "pproud", "p proud", "du an", "nhom", "ueh", "website nay"],
    answer:
      "P-Proud là dự án của **6 sinh viên UEH**, kéo dài 23 tuần, dành cho **120 nữ sinh lớp 6–7** tại một trường THCS ở Quận 8, TP.HCM 👑\nDự án gồm website học tập, 6 buổi học tại trường, bộ vật dụng vệ sinh cho mỗi học sinh, cẩm nang nữ sinh, sổ tay giáo viên và poster song ngữ. Khẩu hiệu: **Kiêu hãnh đón “kỳ”, tự tin con gái!**",
  },
  {
    id: "site-sections",
    keywords: ["dien dan", "tro choi", "game", "quiz", "myth", "blog", "bo cong cu", "cam nang"],
    answer:
      "Website P-Proud có các mục nè ✨\n- **Bộ công cụ:** cẩm nang, sổ tay giáo viên, 6 bài học.\n- **Blog:** bài viết ngắn, dễ hiểu.\n- **Diễn đàn:** hỏi đáp ẩn danh, có chuyên gia trả lời.\n- **Góc trò chơi:** Myth hay Fact, Quiz 6 bài học, Túi kỳ đầu.\nBạn chọn ở thanh menu phía trên nhé!",
  },
  {
    id: "greeting",
    keywords: ["xin chao", "chao pipi", "chao ban", "hello", "hi pipi", "alo"],
    answer:
      "Chào bạn! PiPi đây 👑 Bạn muốn hỏi gì về **kinh nguyệt**, **tuổi dậy thì** hay chuyện **tự tin ở trường** nào?",
  },
  {
    id: "thanks",
    keywords: ["cam on", "thank"],
    answer: "Không có gì đâu bạn 💕 Có thắc mắc gì cứ hỏi PiPi tiếp nhé!",
  },
];

/** Khi không khớp từ khóa nào. [CẦN DUYỆT] */
export const pipiFallback =
  "Câu này PiPi chưa biết trả lời rồi 🌸 PiPi chỉ giỏi các chuyện về **kinh nguyệt**, **tuổi dậy thì**, **chăm sóc bản thân** và **tự tin ở trường** thôi.\nBạn thử hỏi “Đau bụng kinh thì làm sao?” hoặc đặt câu hỏi ở **Diễn đàn** để chuyên gia trả lời nhé!";
