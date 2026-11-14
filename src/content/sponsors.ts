/**
 * Nhà tài trợ và đối tác.
 *
 * - status "prospective": mới ở mức dự kiến, CHƯA có thỏa thuận tài trợ. Khối luôn mang tiêu đề
 *   "Đối tác dự kiến" và có dòng ghi chú bên dưới, để không ai hiểu nhầm là họ đã tài trợ.
 * - status "confirmed": doanh nghiệp đã đồng ý BẰNG VĂN BẢN. Khi có ít nhất một mục confirmed,
 *   tiêu đề tự đổi thành "Doanh nghiệp đồng hành".
 *
 * Logo: chép file vào public/sponsors/ rồi điền `logo`. Logo là nhãn hiệu của doanh nghiệp:
 * giữ nguyên màu và tỉ lệ, không chỉnh sửa. Gỡ ngay nếu doanh nghiệp yêu cầu.
 */
export interface Sponsor {
  name: string;
  description: string;
  status: "confirmed" | "prospective";
  /** Đường dẫn logo trong public/, vd. "/sponsors/da-huong.webp". Bỏ trống thì hiện tên dạng chữ. */
  logo?: string;
  /** Kích thước gốc của file logo (px), để ảnh không bị giật khi tải. */
  logoWidth?: number;
  logoHeight?: number;
  /** true khi logo chỉ là biểu tượng, không có chữ: website hiện thêm tên bên cạnh. */
  logoIsMarkOnly?: boolean;
  url?: string;
}

export const sponsors: Sponsor[] = [
  {
    name: "Dạ Hương",
    description: "Dược phẩm Hoa Linh",
    status: "prospective",
    logo: "/sponsors/da-huong.webp",
    logoWidth: 752,
    logoHeight: 240,
  },
  {
    name: "Diana",
    description: "Diana Unicharm Việt Nam",
    status: "prospective",
    logo: "/sponsors/diana.webp",
    logoWidth: 518,
    logoHeight: 209,
  },
  {
    name: "Laurier",
    description: "Kao Việt Nam",
    status: "prospective",
    logo: "/sponsors/laurier.webp",
    logoWidth: 236,
    logoHeight: 209,
  },
  {
    name: "TELOS",
    description: "Thiết kế website",
    status: "prospective",
    logo: "/sponsors/telos.webp",
    logoWidth: 144,
    logoHeight: 145,
    logoIsMarkOnly: true,
  },
];

export const hasConfirmedSponsor = sponsors.some((s) => s.status === "confirmed");
export const hasProspectiveSponsor = sponsors.some((s) => s.status === "prospective");

export const sponsorSection = {
  eyebrow: "ĐỐI TÁC ĐỒNG HÀNH",
  title: hasConfirmedSponsor ? "Doanh nghiệp đồng hành" : "Đối tác dự kiến",
  /** Hiện dưới lưới khi còn đối tác ở mức dự kiến. */
  prospectiveNote:
    "Các doanh nghiệp trên là đối tác dự kiến, chưa có thỏa thuận tài trợ chính thức. Logo thuộc về các doanh nghiệp tương ứng.",
  ctaText: "Logo của bạn ở đây?",
  ctaButton: "Liên hệ P-Proud",
};
