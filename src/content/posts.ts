/**
 * Bài blog. Chép nguyên văn từ reference/index.html.
 * `body` là HTML tĩnh do nhóm soạn (không nhận dữ liệu người dùng).
 * Thêm bài mới: thêm một phần tử với slug không dấu, không trùng.
 */
import type { MascotName } from "@/lib/mascot";
import type { Tone } from "./site";

export const blogTopics = ["Kinh nguyệt", "Tuổi dậy thì", "Chăm sóc bản thân", "Bình đẳng giới"] as const;
export type BlogTopic = (typeof blogTopics)[number];

export interface Post {
  slug: string;
  title: string;
  topic: BlogTopic;
  img: MascotName;
  tone: Tone;
  minutes: number;
  summary: string;
  body: string;
}

export const posts: Post[] = [
  {
    slug: "ky-kinh-dau-tien-5-dieu-ban-nen-biet",
    title: "Kỳ kinh đầu tiên: 5 điều bạn nên biết",
    topic: "Kinh nguyệt",
    img: "pipi-wonder",
    tone: "blush",
    minutes: 4,
    summary: "Lần đầu có kinh có thể làm bạn bối rối. Đây là những điều giúp bạn bình tĩnh hơn.",
    body: `<p>Kỳ kinh đầu tiên thường đến trong khoảng 10–15 tuổi. Đây là dấu hiệu cơ thể bạn đang phát triển bình thường.</p><ul><li><b>Lượng máu thường ít.</b> Nhiều bạn chỉ thấy vài vệt nâu hoặc đỏ nhạt ở quần lót.</li><li><b>Chu kỳ chưa đều là bình thường.</b> Trong 1–2 năm đầu, kỳ kinh có thể đến sớm hoặc muộn.</li><li><b>Chuẩn bị sẵn một túi nhỏ</b> gồm băng vệ sinh, quần lót dự phòng và khăn giấy.</li><li><b>Thay băng khoảng mỗi 4 giờ</b> hoặc sớm hơn nếu thấy cần.</li><li><b>Hãy nói với người bạn tin cậy</b> như mẹ, chị, cô giáo hoặc nhân viên y tế trường.</li></ul>`,
  },
  {
    slug: "chu-ky-kinh-nguyet-gom-nhung-giai-doan-nao",
    title: "Chu kỳ kinh nguyệt gồm những giai đoạn nào?",
    topic: "Kinh nguyệt",
    img: "pipi-teach",
    tone: "gold",
    minutes: 5,
    summary: "Hiểu 4 giai đoạn của chu kỳ giúp bạn biết cơ thể mình đang thay đổi ra sao.",
    body: `<p>Một chu kỳ được tính từ ngày đầu tiên có kinh đến ngày đầu tiên của kỳ kinh tiếp theo. Ở tuổi dậy thì, chu kỳ thường dài khoảng 21–45 ngày.</p><ul><li><b>Hành kinh:</b> lớp niêm mạc tử cung bong ra cùng với máu, kéo dài khoảng 2–7 ngày.</li><li><b>Giai đoạn nang trứng:</b> cơ thể chuẩn bị một trứng mới và lớp niêm mạc dày lên trở lại.</li><li><b>Rụng trứng:</b> trứng được phóng ra khỏi buồng trứng, thường vào khoảng giữa chu kỳ.</li><li><b>Giai đoạn hoàng thể:</b> nếu trứng không được thụ tinh, nội tiết thay đổi và kỳ kinh mới bắt đầu.</li></ul><p>Bạn có thể đánh dấu ngày có kinh trên lịch để dần quen với chu kỳ của mình.</p>`,
  },
  {
    slug: "co-the-thay-doi-the-nao-o-tuoi-day-thi",
    title: "Cơ thể thay đổi thế nào ở tuổi dậy thì?",
    topic: "Tuổi dậy thì",
    img: "pipi-calm",
    tone: "mint",
    minutes: 4,
    summary: "Ngực phát triển, cao nhanh, mọc lông… tất cả đều là chuyện bình thường.",
    body: `<p>Tuổi dậy thì ở bạn nữ thường bắt đầu trong khoảng 8–13 tuổi. Mỗi người có tốc độ riêng, nên đừng so sánh mình với bạn khác nhé.</p><ul><li>Ngực bắt đầu phát triển, thường là thay đổi đầu tiên.</li><li>Cao nhanh hơn, hông rộng hơn.</li><li>Mọc lông ở nách và vùng kín.</li><li>Da có thể nhờn hơn và nổi mụn.</li><li>Cảm xúc thay đổi nhanh hơn, dễ vui dễ buồn.</li><li>Vài năm sau khi ngực phát triển, kỳ kinh đầu tiên sẽ đến.</li></ul>`,
  },
  {
    slug: "tu-tin-o-truong-trong-nhung-ngay-den-do",
    title: "Tự tin ở trường trong những ngày “đèn đỏ”",
    topic: "Chăm sóc bản thân",
    img: "pipi-zen",
    tone: "blush",
    minutes: 3,
    summary: "Vài mẹo nhỏ để bạn vẫn học, chơi và vận động thoải mái khi đến kỳ.",
    body: `<ul><li>Luôn để một túi nhỏ đựng băng vệ sinh và quần lót dự phòng trong cặp.</li><li>Chọn băng có cánh hoặc loại dài hơn cho ngày ra nhiều.</li><li>Lỡ bị dính ra quần? Buộc áo khoác ngang hông và xin phép lên phòng y tế, đây là chuyện rất nhiều bạn từng gặp.</li><li>Uống đủ nước và vận động nhẹ nhàng có thể giúp bạn dễ chịu hơn.</li><li>Đau nhiều đến mức không học được thì hãy báo cô giáo hoặc nhân viên y tế.</li></ul>`,
  },
  {
    slug: "con-trai-cung-nen-hieu-ve-kinh-nguyet",
    title: "Con trai cũng nên hiểu về kinh nguyệt",
    topic: "Bình đẳng giới",
    img: "pipi-paint",
    tone: "gold",
    minutes: 3,
    summary: "Khi bạn nam hiểu đúng, lớp học sẽ bớt trêu chọc và mọi người tôn trọng nhau hơn.",
    body: `<p>Kinh nguyệt là chuyện sinh học bình thường của khoảng một nửa dân số. Hiểu về nó không làm ai “kỳ cục” cả.</p><ul><li>Biết về kinh nguyệt giúp bạn nam tôn trọng chị em, bạn bè và sau này là người thân của mình.</li><li>Không đùa cợt khi thấy bạn nữ mang băng vệ sinh hay xin phép ra ngoài.</li><li>Nếu thấy bạn bị dính ra quần, hãy kín đáo nhắc bạn hoặc báo cô giáo.</li></ul><p>Một lớp học tôn trọng nhau là nơi ai cũng thấy an toàn để học tập.</p>`,
  },
  {
    slug: "dau-bung-kinh-khi-nao-la-binh-thuong",
    title: "Đau bụng kinh: khi nào là bình thường?",
    topic: "Kinh nguyệt",
    img: "pipi-cloud",
    tone: "mint",
    minutes: 4,
    summary: "Đau nhẹ thì có thể tự chăm sóc, nhưng có những dấu hiệu bạn nên báo người lớn.",
    body: `<p>Nhiều bạn thấy đau âm ỉ ở bụng dưới trong 1–2 ngày đầu. Đây là điều khá phổ biến.</p><p><b>Bạn có thể thử:</b></p><ul><li>Chườm ấm bụng dưới.</li><li>Nghỉ ngơi, vận động nhẹ hoặc đi bộ.</li><li>Uống đủ nước, ăn uống đầy đủ.</li></ul><p><b>Hãy nói với người lớn và đi khám nếu:</b></p><ul><li>Đau dữ dội đến mức không đi học được.</li><li>Kỳ kinh kéo dài hơn 7 ngày.</li><li>Phải thay băng mỗi 1–2 giờ vì ra quá nhiều.</li><li>Choáng váng, mệt lả hoặc sốt.</li></ul>`,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const postDisclaimer = "Bài viết mang tính giáo dục, không thay thế lời khuyên của bác sĩ.";
