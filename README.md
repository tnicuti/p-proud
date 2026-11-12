# P-Proud – Kiêu hãnh đón “kỳ”, tự tin con gái

Website giáo dục sức khỏe kinh nguyệt cho nữ sinh lớp 6–7. Next.js 16 (App Router) + TypeScript + Tailwind CSS 4.

## Chạy trên máy

Cần Node.js 20 trở lên.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở http://localhost:3000.

| Lệnh | Việc làm |
|---|---|
| `npm run dev` | Chạy thử khi đang sửa |
| `npm run build` | Build bản chính thức |
| `npm run typecheck` | Kiểm tra kiểu TypeScript |
| `npm run lint` | ESLint |
| `npm test` | Unit test (Vitest) |
| `npm run format` | Định dạng code (Prettier) |

## Sửa nội dung

Toàn bộ chữ nằm trong `src/content/`, không cần đụng vào giao diện:

| File | Nội dung |
|---|---|
| `site.ts` | Số liệu, đội ngũ, giai đoạn, nhà tài trợ, ba chữ P, hoạt động |
| `toolkit.ts` | 6 tài liệu và 6 bài học |
| `posts.ts` | Bài blog. Thêm bài: thêm một phần tử, `slug` không dấu, không trùng |
| `forum.ts` | Chủ đề, nội quy, 4 câu hỏi mẫu |
| `games.ts` | Câu Myth hay Fact, quiz, món trong Túi kỳ đầu, điểm thưởng |
| `pipi.ts` | Lời chào, câu gợi ý, câu báo lỗi của PiPi, PIPI_RULES |
| `pipiScript.ts` | **Kịch bản trả lời của PiPi**: từ khóa (viết không dấu) và câu trả lời |

## Thay ảnh mascot

Chép đè file cùng tên vào `public/mascot/` (PNG nền trong suốt), rồi build lại. Kích thước được đọc tự động, không phải sửa code.

## Chatbot PiPi

Hiện PiPi trả lời theo kịch bản trong `src/content/pipiScript.ts`, không gọi AI, không tốn phí và không lưu nội dung trò chuyện.
Các mục an toàn (xâm hại, tự làm đau, thuốc, dấu hiệu bất thường) đứng đầu danh sách nên luôn được ưu tiên.

Khi muốn chuyển sang AI thật: viết thêm một provider trong `src/lib/pipi/` theo interface `ChatProvider`
(system prompt đã có sẵn là `PIPI_RULES` trong `src/content/pipi.ts`), rồi đổi `PIPI_PROVIDER`.

## Deploy lên Vercel

1. Đưa thư mục này lên một repository GitHub.
2. Vào https://vercel.com/new, chọn repository vừa tạo, bấm **Import**. Vercel tự nhận ra Next.js.
3. Mở **Environment Variables**, nhập các biến trong `.env.example` (ít nhất `NEXT_PUBLIC_SITE_URL`).
4. Bấm **Deploy**. Vài phút sau website chạy ở địa chỉ dạng `https://ten-du-an.vercel.app`.
5. Mỗi lần đẩy code mới lên GitHub, Vercel tự deploy lại.

## Quyền riêng tư

Người dùng chính là trẻ 11–13 tuổi: không tài khoản, không cookie theo dõi, không thu họ tên thật, trường, số điện thoại hay ảnh của học sinh.
Chỉ thầy cô và phụ huynh mới thấy ô email/số điện thoại trong form Đại sứ. Xem thêm trang `/chinh-sach-rieng-tu`.
