# P-Proud – Kiêu hãnh đón “kỳ”, tự tin con gái

Website giáo dục sức khỏe kinh nguyệt cho nữ sinh lớp 6–7. Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Font: Agbalumo (tiêu đề lớn) và Montserrat (tiêu đề phụ, nút, nội dung).

Bản đang chạy: https://p-proud.vercel.app

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
| `site.ts` | Địa bàn (`LOCATION_SHORT`, `LOCATION_LONG`), email liên hệ, số liệu, giai đoạn, ba chữ P, hoạt động, bản đồ |
| `mascot.ts` | Danh sách ảnh mascot, logo và mô tả ảnh (alt) |
| `sponsors.ts` | Nhà tài trợ và trạng thái dự kiến / đã xác nhận |
| `team.ts` | Đội ngũ, vai trò, dòng "Phụ trách" |
| `kits.ts` | 6 tài liệu (kèm link bản lật trang) và 6 bài học |
| `blog/*.mdx` | Bài blog, mỗi bài một file |
| `forum.ts` | Chủ đề, nội quy, 4 câu hỏi mẫu |
| `games.ts` | Câu Myth hay Fact, quiz, món trong Túi kỳ đầu, điểm thưởng |
| `pipi.ts` | Lời chào, câu gợi ý, câu báo lỗi của PiPi, PIPI_RULES |
| `pipiScript.ts` | **Kịch bản trả lời của PiPi**: từ khóa (viết không dấu) và câu trả lời |

Đổi địa bàn dự án (ví dụ thành "các trường THCS ở Quận 8, TP.HCM"): chỉ sửa hai hằng số `LOCATION_SHORT` và `LOCATION_LONG` trong `site.ts`.

## Thay ảnh mascot và logo

Chép đè file cùng tên vào `public/mascot/` (PNG nền trong suốt), rồi build lại. Kích thước được đọc tự động, không phải sửa code.

| File | Dùng ở |
|---|---|
| `logo.png` | Header (nền sáng) |
| `logo-white.png` | Footer (nền ruby) |
| `pipi-main.png` | Hero trang chủ, avatar chatbot |
| `pipi-hi.png` | Nút chat nổi, trang Về chúng mình |
| `pipi-*.png` còn lại | Xem danh sách trong `src/content/mascot.ts` |

Thêm một tư thế mới: chép file vào `public/mascot/`, rồi thêm một dòng trong `src/content/mascot.ts`.
Ảnh chia sẻ link (Facebook, Zalo) là `public/og.png` (1200×630). Biểu tượng tab trình duyệt là `src/app/icon.png`.

## Thêm ảnh thành viên

1. Chuẩn bị ảnh vuông, từ 300×300 trở lên, định dạng WebP.
2. Đặt tên theo slug và chép vào `public/team/`: `nhat-ha.webp`, `kieu-trang.webp`, `uyen-phuong.webp`, `thuc-nhi.webp`, `xuan-tiep.webp`, `van-nhu.webp`.
3. Build lại. Ảnh tự hiện; ai chưa có ảnh thì vẫn hiện chữ cái viết tắt.

Chỉ dùng ảnh do chính thành viên cung cấp (ảnh thật hoặc tranh vẽ từ ảnh của chính mình). Không dùng ảnh stock hay ảnh người khác.

Hiện 5 ảnh (trừ Uyên Phương) là hình hoạt hình tạm do `scripts/make-team-avatars.py` vẽ ra, không theo ngoại hình thật của ai. Thành viên nào có ảnh riêng thì chép đè file tương ứng.
Dòng "Phụ trách" của từng người: điền trường `duty` trong `src/content/team.ts`.

## Đổi trạng thái nhà tài trợ

**Chỉ hiện logo khi doanh nghiệp đã đồng ý bằng văn bản cho P-Proud dùng logo.**

1. Chép file logo vào `public/sponsors/`, ví dụ `da-huong.png`.
2. Trong `src/content/sponsors.ts`, sửa mục tương ứng:

```ts
{ name: "Dạ Hương", description: "Dược phẩm Hoa Linh", status: "confirmed", logo: "/sponsors/da-huong.png", url: "https://..." }
```

Khi có ít nhất một nhà tài trợ `confirmed`, tiêu đề khối tự đổi từ "Đối tác dự kiến" thành "Doanh nghiệp đồng hành".

## Thêm bài blog

Mỗi bài là một file `src/content/blog/<slug>.mdx`. Tên file chính là đường dẫn bài (`/blog/<slug>`), viết không dấu, nối bằng gạch ngang. Sao chép một bài có sẵn rồi sửa là nhanh nhất.

Phần đầu file (frontmatter):

| Trường | Ý nghĩa |
|---|---|
| `title`, `excerpt` | Tiêu đề và đoạn mở đầu (sapo) |
| `category` | Một trong: Kinh nguyệt, Tuổi dậy thì, Chăm sóc bản thân, Bình đẳng giới |
| `author`, `date`, `readMinutes` | Tác giả, ngày đăng (YYYY-MM-DD), số phút đọc |
| `mascot`, `tone` | Minh họa PiPi và màu nền (`blush`, `gold`, `mint`) khi bài không có ảnh thật |
| `cover`, `coverAlt`, `coverCredit`, `coverCreditUrl` | Ảnh bìa thật trong `public/blog/`, mô tả ảnh, ghi nguồn và link nguồn |
| `reviewed` | Đặt `true` **sau khi** nhóm và chuyên gia đã duyệt: lúc đó mới hiện chip "✔ Chuyên gia duyệt" |
| `featured` | Bài nổi bật đầu trang Blog (chỉ một bài) |
| `popular` | Hiện trong mục "Đọc nhiều" (nên chọn 4 bài) |

Trong thân bài dùng được các khối sau:

```mdx
<PullQuote>Câu trích nổi bật.</PullQuote>

<PiPiNote>Mẹo quan trọng, hiện trong hộp vàng kèm PiPi.</PiPiNote>

<Figure mascot="pipi-zen" tone="mint" caption="Chú thích ảnh." />

<Figure src="/blog/ten-anh.webp" alt="Mô tả ảnh" caption="Chú thích." credit="Ảnh: Tên tác giả / Pexels" creditUrl="https://..." />

<Sources>

- Tên nguồn, [tên trang](https://...).

</Sources>
```

Quy tắc ảnh thật: chỉ dùng ảnh có giấy phép miễn phí cho mục đích thương mại (Pexels, Unsplash), ghi tên tác giả và link nguồn, tỉ lệ 16:9, WebP, rộng tối đa 1600px.
Không dùng ảnh có trẻ em nhận diện được khuôn mặt, không dùng ảnh máu thật.
Nếu file ảnh chưa có trong `public/blog/`, website tự hiện minh họa PiPi thay thế.

## Duyệt bình luận và lượt thích

Bình luận gửi lên luôn ở trạng thái chờ duyệt và chỉ hiện khi admin duyệt. Lượt thích tính mỗi thiết bị một lần.
Hai tính năng này cần Supabase (cùng với diễn đàn và form Đại sứ). Khi chưa cấu hình Supabase, nút thích và form bình luận báo "đang được cài đặt".
Các bảng cần tạo được ghi ở đầu file `src/lib/blogStore.ts`.

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
