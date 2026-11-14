import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Wrap } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Chính sách riêng tư",
  description: "P-Proud thu thập những gì, không thu thập những gì và cách bảo vệ thông tin của bạn.",
};

const sections = [
  {
    title: "Bạn không cần tạo tài khoản",
    items: [
      "Bạn đọc bài, chơi game, hỏi PiPi và hỏi trên diễn đàn mà không cần đăng ký hay đăng nhập.",
      "Chúng mình không hỏi họ tên thật, trường, số điện thoại, email hay ảnh của học sinh.",
    ],
  },
  {
    title: "Những gì được lưu",
    items: [
      "Diễn đàn: chủ đề, câu hỏi, biệt danh (hoặc “Ẩn danh”) và thời gian đăng. Câu hỏi chỉ hiện sau khi người duyệt xem xong.",
      "Đăng ký Đại sứ: biệt danh, vai trò, lý do tham gia. Thầy cô và phụ huynh có thể để lại email hoặc số điện thoại nếu muốn.",
      "Bình luận dưới bài blog: biệt danh, nội dung và thời gian gửi. Bình luận chỉ hiện sau khi người duyệt xem xong.",
      "Lượt thích bài blog: chỉ lưu một mã ngẫu nhiên của thiết bị để mỗi thiết bị thích một lần.",
      "Trò chuyện với PiPi: không lưu nội dung trò chuyện.",
    ],
  },
  {
    title: "Lưu trên thiết bị của bạn",
    items: [
      "Điểm vương miện ở Góc trò chơi, các câu bạn đã bấm “thương” và một mã ngẫu nhiên để hạn chế gửi tin quá nhanh.",
      "Những thông tin này nằm trong trình duyệt của bạn, không gắn với tên bạn. Xóa dữ liệu trình duyệt là xóa hết.",
    ],
  },
  {
    title: "Không theo dõi",
    items: [
      "Website không dùng cookie quảng cáo hay công cụ theo dõi của bên thứ ba.",
      "Địa chỉ mạng (IP) chỉ được dùng tạm thời để chống gửi tin rác, không lưu lại.",
      "Cẩm nang lật trang do Heyzine cung cấp. Khi bạn mở cẩm nang, trình duyệt sẽ tải nội dung từ máy chủ của họ.",
    ],
  },
  {
    title: "Muốn xóa thông tin?",
    items: ["Nhờ thầy cô chủ nhiệm liên hệ nhóm P-Proud, chúng mình sẽ xóa giúp bạn."],
  },
];

export default function PrivacyPage() {
  return (
    <Wrap>
      <PageHeader mascot="pipi-zen" chip="Chính sách riêng tư" title="Thông tin của bạn được an toàn">
        P-Proud được làm cho các bạn 11–13 tuổi, nên chúng mình chỉ giữ những gì thật cần thiết.
      </PageHeader>
      <div className="mt-6 grid max-w-[820px] gap-4">
        {sections.map((s) => (
          <Card key={s.title}>
            <h3>{s.title}</h3>
            <ul className="m-0 pl-5">
              {s.items.map((i) => (
                <li key={i} className="mb-1">
                  {i}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Wrap>
  );
}
