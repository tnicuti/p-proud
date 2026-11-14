import Image from "next/image";
import Link from "next/link";
import { OpenChatButton } from "@/components/chat/ChatWidget";
import { logos } from "@/content/mascot";
import { Wrap } from "@/components/ui/Layout";

const linkClass = "mb-1.5 block text-white no-underline opacity-90 hover:opacity-100 hover:underline";

export function Footer() {
  return (
    <footer className="mt-10 bg-ruby pt-10 pb-7 text-white">
      <Wrap className="grid grid-cols-[2fr_1fr_1fr] gap-6 max-md:grid-cols-1">
        <div>
          <Image
            src={logos.white.src}
            alt={logos.white.alt}
            width={Math.round((logos.white.width / logos.white.height) * 40)}
            height={40}
            className="mb-3 w-auto"
            style={{ height: 40 }}
          />
          <p className="opacity-90">
            Kiêu hãnh đón “kỳ”, tự tin con gái. Dự án giáo dục sức khỏe kinh nguyệt cho nữ sinh lớp 6–7, thực hiện bởi
            Nhóm 1 – UEH.
          </p>
          <div className="rounded-2xl bg-white/12 p-3.5 text-sm">
            💬 Cần giúp đỡ ngay? Hãy nói với bố mẹ, thầy cô hoặc nhân viên y tế trường. Bạn cũng có thể gọi{" "}
            <b>Tổng đài quốc gia bảo vệ trẻ em 111</b> (miễn phí, 24/7).
          </div>
        </div>
        <div>
          <h4 className="text-gold">Khám phá</h4>
          <Link className={linkClass} href="/ve-chung-minh">
            Về chúng mình
          </Link>
          <Link className={linkClass} href="/bo-cong-cu">
            Bộ công cụ
          </Link>
          <Link className={linkClass} href="/blog">
            Blog
          </Link>
          <Link className={linkClass} href="/tro-choi">
            Góc trò chơi
          </Link>
        </div>
        <div>
          <h4 className="text-gold">Kết nối</h4>
          <Link className={linkClass} href="/cong-dong">
            Cộng đồng
          </Link>
          <Link className={linkClass} href="/dien-dan">
            Diễn đàn
          </Link>
          <OpenChatButton className={`${linkClass} border-0 bg-transparent p-0 text-left text-base`}>
            Hỏi PiPi
          </OpenChatButton>
        </div>
      </Wrap>
      <Wrap className="mt-5 text-[13px]">
        <span className="opacity-75">© 2026 P-Proud · Bản demo phục vụ môn Quản trị dự án kinh doanh quốc tế · </span>
        <Link href="/chinh-sach-rieng-tu" className="text-white opacity-90 hover:opacity-100">
          Chính sách riêng tư
        </Link>
      </Wrap>
    </footer>
  );
}
