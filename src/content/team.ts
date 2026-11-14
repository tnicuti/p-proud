/**
 * Đội ngũ P-Proud.
 *
 * Thêm ảnh đại diện: chép file vào public/team/<slug>.webp (ảnh vuông, từ 300×300 trở lên)
 * rồi build lại. Website tự nhận ảnh; thiếu ảnh nào thì tự dùng chữ cái viết tắt.
 * Chỉ dùng ảnh do chính thành viên cung cấp (ảnh thật hoặc tranh vẽ từ ảnh của chính mình).
 *
 * `duty`: một dòng "Phụ trách" ngắn theo bảng RACI. Để trống thì dòng này không hiện.
 */
export interface Member {
  slug: string;
  initials: string;
  name: string;
  role: string;
  duty?: string;
}

export const team: Member[] = [
  { slug: "nhat-ha", initials: "NH", name: "Nhật Hà", role: "Quản lý dự án" },
  { slug: "kieu-trang", initials: "KT", name: "Kiều Trang", role: "Trưởng nhóm đối tác" },
  { slug: "uyen-phuong", initials: "UP", name: "Uyên Phương", role: "Trưởng nhóm nội dung" },
  { slug: "thuc-nhi", initials: "TN", name: "Thục Nhi", role: "Trưởng nhóm website" },
  { slug: "xuan-tiep", initials: "XT", name: "Xuân Tiếp", role: "Trưởng nhóm vận hành" },
  { slug: "van-nhu", initials: "VN", name: "Vân Như", role: "Trưởng nhóm giám sát và đánh giá" },
];
