/**
 * Nhà tài trợ và đối tác.
 *
 * QUY TẮC: chỉ đặt status = "confirmed" và thêm logo khi doanh nghiệp đã đồng ý BẰNG VĂN BẢN
 * cho P-Proud dùng logo. Khi còn "prospective", website chỉ hiện tên dạng chữ kèm chip "Dự kiến".
 *
 * Hiện logo: chép file vào public/sponsors/ (vd. da-huong.png), rồi sửa mục tương ứng thành
 *   { ..., status: "confirmed", logo: "/sponsors/da-huong.png", url: "https://..." }
 */
export interface Sponsor {
  name: string;
  description: string;
  status: "confirmed" | "prospective";
  /** Đường dẫn logo trong public/, vd. "/sponsors/da-huong.png". Chỉ dùng khi confirmed. */
  logo?: string;
  url?: string;
}

export const sponsors: Sponsor[] = [
  { name: "Dạ Hương", description: "Dược phẩm Hoa Linh", status: "prospective" },
  { name: "Diana", description: "Diana Unicharm Việt Nam", status: "prospective" },
  { name: "Laurier", description: "Kao Việt Nam", status: "prospective" },
  { name: "TELOS", description: "Thiết kế website", status: "prospective" },
];

export const hasConfirmedSponsor = sponsors.some((s) => s.status === "confirmed");

export const sponsorSection = {
  eyebrow: "ĐỐI TÁC ĐỒNG HÀNH",
  title: hasConfirmedSponsor ? "Doanh nghiệp đồng hành" : "Đối tác dự kiến",
  ctaText: "Logo của bạn ở đây?",
  ctaButton: "Liên hệ P-Proud",
};
