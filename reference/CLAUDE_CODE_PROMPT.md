# Prompt cho Claude Code: Xây dựng website P-Proud (production)

> Dán toàn bộ file này vào Claude Code, kèm thư mục `reference/` (bản prototype HTML + ảnh mascot) và file `P-Proud_UI_Reference.pdf`.

---

## 0. Bối cảnh và mục tiêu

Bạn sẽ xây dựng website thật cho **P-Proud**, một dự án giáo dục sức khỏe kinh nguyệt dành cho nữ sinh lớp 6–7 (11–13 tuổi) tại một trường THCS ở Quận 8, TP.HCM. Dự án do 6 sinh viên UEH thực hiện trong 23 tuần.

- **Tên dự án:** P-Proud
- **Tagline:** "Kiêu hãnh đón 'kỳ', tự tin con gái" (tiếng Anh: *Be Proud of your Period*)
- **Mascot:** **PiPi**, một giọt máu màu hồng đội vương miện vàng có chữ "PP"
- **Ngôn ngữ giao diện:** **100% tiếng Việt** (`<html lang="vi">`). Không làm song ngữ.

Mình đã có một **prototype hoàn chỉnh** (một file HTML duy nhất) đúng giao diện và nội dung mong muốn:
- `reference/index.html`: prototype chạy được. Mở trực tiếp bằng trình duyệt để xem. **Đây là nguồn sự thật về giao diện, nội dung và hành vi.**
- `reference/assets/`: logo và 14 tư thế mascot PiPi (PNG nền trong suốt).
- `P-Proud_UI_Reference.pdf`: ảnh chụp từng trang và từng trạng thái, kèm design system.

**Nhiệm vụ:** chuyển prototype thành một website production. Giao diện phải giống prototype (pixel-close), code sạch và chia component. Chatbot PiPi phải gọi AI thật qua backend. Diễn đàn và form đăng ký phải lưu dữ liệu thật.

**Trước khi code:** đọc kỹ `reference/index.html` và file PDF. Sau đó đưa ra kế hoạch ngắn (cấu trúc thư mục, danh sách component, các bước) để mình duyệt. Ở bất kỳ điểm nào không chắc, hãy hỏi mình thay vì tự đoán.

---

## 1. Tech stack đề xuất

| Hạng mục | Lựa chọn |
| --- | --- |
| Framework | **Next.js (App Router) + TypeScript** |
| Styling | **Tailwind CSS**, khai báo design token trong `tailwind.config` / CSS variables |
| Font | `next/font/google`: **Baloo 2** (500, 600, 700, 800) cho tiêu đề, **Nunito** (400, 600, 700, 800) cho nội dung. Bắt buộc có subset `vietnamese` |
| Chatbot AI | Route `app/api/chat/route.ts` gọi **Anthropic API** qua `@anthropic-ai/sdk`, streaming. Model: `claude-haiku-5-5`, để trong biến môi trường `ANTHROPIC_MODEL` cho dễ đổi. API key chỉ nằm ở server (`ANTHROPIC_API_KEY`) |
| Database | **Supabase** (Postgres) cho diễn đàn và đăng ký đại sứ. Nếu bạn thấy phương án khác hợp hơn, đề xuất với mình trước |
| Deploy | **Vercel**. Có file `.env.example` và README hướng dẫn deploy từng bước cho người không chuyên |
| Chất lượng | ESLint + Prettier, Lighthouse ≥ 90 cho Performance, Accessibility và Best Practices |

---

## 2. Design system (phải giữ đúng)

### 2.1 Màu sắc

| Token | Hex | Vai trò |
| --- | --- | --- |
| `ruby` | `#970A1D` | Màu chủ đạo: logo, nút chính, tiêu đề, footer, nav đang chọn |
| `ruby-dark` | `#6E0715` | Hover của nút chính |
| `rose` | `#E999A7` | Màu mascot, điểm nhấn, chữ phụ trong hero, thanh tiến trình |
| `blush` | `#EAB5C0` | Viền card game, blob nền hero |
| `blush-soft` | `#FBE3E8` | Nền card phụ, chip mặc định, hover nav |
| `gold` | `#F0BF49` | Điểm thưởng, số thứ tự bài học, viền avatar, tiêu đề cột footer |
| `gold-soft` | `#FDF1D3` | Nền card vàng nhạt, khung trả lời của chuyên gia |
| `gold-ink` | `#5A3D00` | Chữ trên nền vàng |
| `mist` | `#FFF6F7` | Nền trang |
| `white` | `#FFFFFF` | Nền card |
| `ink` | `#3B1820` | Chữ nội dung |
| `ink-soft` | `#7A5560` | Chữ phụ |
| `mint` / `mint-soft` / `mint-ink` | `#5FB894` / `#E3F4EC` / `#1E5B42` | Đáp án đúng, chip "Fact", nhãn "Chuyên gia duyệt" |
| `line` | `#F3D3DA` | Viền card, đường kẻ |

Ràng buộc:
- 5 màu brand gốc (ruby, rose, blush, white, gold) lấy từ brand asset, **không đổi**.
- Chữ trên nền màu luôn dùng tông đậm cùng họ màu.

### 2.2 Typography

- **Tiêu đề (h1–h4, số liệu, nút game):** Baloo 2, line-height 1.2, màu ruby.
  - h1: `clamp(34px, 5vw, 56px)` / 800
  - h2: `clamp(28px, 3.6vw, 40px)` / 700
  - h3: 22px / 700
  - h4: 18px / 700
- **Nội dung:** Nunito 16px, line-height 1.65, màu ink. Đoạn dẫn (lead) 18px màu ink-soft, max-width 720px.

### 2.3 Hình khối và hiệu ứng

- **Bo góc:**
  - Card: 20px
  - Card game Myth hay Fact: 28px
  - Modal: 24px
  - Chatbot: 26px
  - Nút và chip: dạng pill (999px)
- **Shadow card:** `0 6px 24px rgba(151,10,29,.08)`
- **Viền card:** 1px `line`
- **Animation:**
  - Mascot hero và nút chat nổi nhấp nhô lên xuống: 3–3.5s, ±10px.
  - Chuyển trang: fade + trượt lên 8px trong 0.35s.
  - Nút: nhích lên 2px khi hover.
  - Tôn trọng `prefers-reduced-motion`.
- **Container:** max-width 1160px, padding ngang 20px. Khoảng cách giữa các khối 56px.

### 2.4 Component cần tạo (xem prototype để biết chi tiết)

`Button` (primary / ghost / sm), `Chip` (pink / gold / mint), `Card` (default / soft), `StatCard`, `PageHeader` (mascot + chip + h1 + lead), `FilterBar`, `Modal`, `SectionTitle`, `SponsorCard`, `MemberCard`, `PhaseCard`, `KitCard`, `LessonRow`, `PostCard`, `ThreadCard`, `ChatWidget`, `MythFactGame`, `QuizGame`, `PeriodBagGame`, `PointsBadge`, `DemoBanner`, `Header` (sticky, nền mist trong mờ có blur), `Footer`.

---

## 3. Mascot PiPi: file và nơi dùng

Tất cả nằm trong `reference/assets/` (PNG nền trong suốt). Chuyển vào `public/mascot/` và dùng `next/image`.

| File | Mô tả | Dùng ở |
| --- | --- | --- |
| `logo.png` | Logo P-Proud | Header (cao 44px) |
| `pipi-main.png` | PiPi đứng, mắt to | Hero trang chủ (tối đa 420px), avatar header chatbot |
| `pipi-hi.png` | Vẫy tay, bong bóng "HI!" | Nút chat nổi, header trang Về chúng mình, màn hình kết quả game chưa đạt |
| `pipi-teach.png` | Đeo kính, chỉ bảng | Trụ cột Period, Bộ công cụ, Sổ tay giáo viên, Quiz |
| `pipi-wonder.png` | Mắt long lanh | Trụ cột Puberty, Cẩm nang nữ sinh |
| `pipi-paint.png` | Vẽ trái tim | Trụ cột Peer, Poster, bài Bình đẳng giới |
| `pipi-jump.png` | Nhảy dây | Teaser game, header Góc trò chơi |
| `pipi-search.png` | Kính lúp | Header Diễn đàn, game Myth hay Fact |
| `pipi-drum.png` | Đánh trống | Màn hình chiến thắng, cảm ơn sau khi gửi form |
| `pipi-flowers.png` | Ôm hoa | Trang Cộng đồng, cảm ơn nhà tài trợ |
| `pipi-zen.png` | Ngồi thiền | Bài Self-care, hoạt động Góc nữ sinh |
| `pipi-calm.png` | Nhắm mắt mỉm cười | Header Blog |
| `pipi-cloud.png` / `pipi-sleep.png` | Ngủ trên mây | Bài đau bụng kinh, trạng thái trống, trang 404 |
| `pipi-happy.png` | Chắp tay vui vẻ | Game Túi kỳ đầu |
| `pipi-wordmark.png` | Chữ "PiPi" | Dự phòng (chưa dùng) |

Ảnh mascot đang có độ phân giải thấp (được cắt từ ảnh chụp màn hình). Hãy để cấu trúc sao cho chỉ cần thay file là xong. Nhóm sẽ gửi bản chất lượng cao sau.

---

## 4. Sơ đồ trang (routes)

Prototype đang dùng hash routing trong một file. Bản thật dùng route riêng:

| Route | Trang |
| --- | --- |
| `/` | Trang chủ |
| `/ve-chung-minh` | Về chúng mình |
| `/bo-cong-cu` | Bộ công cụ (+ 6 bài học) |
| `/cong-dong` | Cộng đồng |
| `/blog` và `/blog/[slug]` | Blog (danh sách) và trang chi tiết bài viết |
| `/dien-dan` | Diễn đàn |
| `/tro-choi` | Góc trò chơi |
| `not-found` | Trang 404 có PiPi ngủ trên mây |

**Header nav** (theo đúng thứ tự): Trang chủ · Về chúng mình · Bộ công cụ · Cộng đồng · Blog · Diễn đàn · Góc trò chơi.
- Mục đang chọn: pill nền ruby, chữ trắng.
- Dưới 1020px: nút ☰ mở menu xổ xuống.

Mỗi trang có metadata (title, description, Open Graph) bằng tiếng Việt.

---

## 5. Nội dung và bố cục từng trang

Toàn bộ chữ, số liệu và mảng dữ liệu (`sponsors`, `team`, `kits`, `lessons`, `posts`, `threads`, `mfData`, `quizData`, `bagItems`) nằm trong `<script>` của `reference/index.html`.

- **Sao chép nguyên văn**, không tự viết lại nội dung.
- Tách dữ liệu ra `src/content/*.ts`. Bài blog nên chuyển sang MDX hoặc file `.ts` có `slug`.

### 5.1 Trang chủ
1. **Hero 2 cột (1.15fr / 0.85fr):**
   - Cột trái: dòng nhỏ "Be Proud of your Period" màu rose, h1 "Kiêu hãnh đón 'kỳ'," + dòng thứ hai "tự tin con gái" màu rose, đoạn lead, nút "Bắt đầu học" (đi tới Bộ công cụ) và "Trò chuyện với PiPi" (mở chatbot).
   - Cột phải: blob hồng (blush) phía sau `pipi-main`, kèm bong bóng "Chào bạn, mình là PiPi!".
   - Trên mobile chuyển thành 1 cột.
2. **4 stat card:** 120 nữ sinh lớp 6–7 tham gia · 6 bài học tương tác · 100% học sinh nhận bộ vật dụng vệ sinh · 23 tuần triển khai. Trên mobile hiển thị 2×2.
3. **"Ba chữ P của chúng mình":** 3 card P–PERIOD / P–PUBERTY / P–PEER, mỗi card có mascot riêng.
4. **2 card teaser:**
   - Góc trò chơi: nền blush-soft.
   - Bộ công cụ: nền gold-soft.
5. **"Bài viết mới":** 3 bài đầu tiên, nút "Xem tất cả".
6. **"Đồng hành cùng P-Proud":** 4 card nhà tài trợ dự kiến, viền nét đứt màu rose. **Chỉ hiện tên dạng chữ, không dùng logo thương hiệu thật** cho đến khi có thỏa thuận tài trợ.

### 5.2 Về chúng mình
1. PageHeader với `pipi-hi`.
2. 2 card Tầm nhìn 🌸 và Sứ mệnh 👑.
3. Timeline 5 giai đoạn:
   - Tuần 1–7: Khởi động và kết nối
   - Tuần 8–13: Website và tài liệu
   - Tuần 14–17: Chuẩn bị và thử nghiệm
   - Tuần 18–20: Triển khai tại trường
   - Tuần 20–23: Đánh giá và bàn giao
   Hiển thị 5 cột trên desktop, 2 cột trên tablet, 1 cột trên mobile.
4. Đội ngũ 6 người, chia 3 + 3: avatar chữ cái, viền vàng, tên và vai trò.
5. 3 card "Các bên đồng hành": Nhà trường · Hội đồng chuyên môn · Nhà tài trợ dự kiến.

### 5.3 Bộ công cụ
1. FilterBar: Tất cả / Cho học sinh / Cho thầy cô và nhà trường / Cho phụ huynh.
2. 6 KitCard. Nút "Xem trước" mở Modal hiển thị mục lục.
3. Danh sách "6 bài học trực tuyến": số thứ tự trên ô vàng, tên bài và mô tả. Nút "Hỏi PiPi" mở chatbot với câu hỏi soạn sẵn về bài đó.

### 5.4 Cộng đồng
1. 4 stat: 120 · ≥ 3 · 20 · 50.
2. 3 card hoạt động nổi bật.
3. Form "Trở thành Đại sứ P-Proud", gồm 3 trường:
   - Biệt danh (bắt buộc)
   - Bạn là: Học sinh / Thầy cô / Phụ huynh (bắt buộc)
   - Lý do (không bắt buộc)

   **Không thu họ tên thật hay số điện thoại.** Báo lỗi ngay dưới form. Gửi thành công thì thay form bằng lời cảm ơn kèm `pipi-drum`.
4. Card cảm ơn nhà tài trợ, dùng `pipi-flowers`.

### 5.5 Blog
1. FilterBar 5 chủ đề: Tất cả, Kinh nguyệt, Tuổi dậy thì, Chăm sóc bản thân, Bình đẳng giới.
2. Lưới PostCard: thumbnail màu có mascot, chip chủ đề, tiêu đề, tóm tắt, số phút đọc, chip "✔ Chuyên gia duyệt".
3. Bản production đi tới `/blog/[slug]` thay vì mở modal.
4. Cuối mỗi bài ghi: "Bài viết mang tính giáo dục, không thay thế lời khuyên của bác sĩ."

### 5.6 Diễn đàn
Bố cục 2 cột (nội dung + sidebar 300px). Dưới 900px chuyển thành 1 cột.

**Cột chính:**
- FilterBar theo chủ đề.
- Danh sách ThreadCard, mỗi thread gồm: avatar tròn chữ cái đầu của nickname, nickname, thời gian, chip chủ đề, câu hỏi, các câu trả lời, hàng hành động "♡ thương", "💬 trả lời", "⚑ Báo cáo".
- Câu trả lời chuyên gia: nền gold-soft, có 👑 trước tên.
- Câu trả lời của bạn bè hoặc PiPi: nền blush-soft.

**Sidebar:**
- Form "Đặt câu hỏi mới":
  - Chủ đề và câu hỏi bắt buộc; câu hỏi tối thiểu 10 ký tự.
  - Chặn số điện thoại và email bằng regex, kèm thông báo.
  - Checkbox "Đăng ẩn danh" mặc định bật.
- Card "📌 Nội quy cộng đồng".

**Backend (Supabase):**
- Bảng `threads`, `answers`, `reports`, `likes`.
- **Bài mới ở trạng thái `pending`.** Chỉ hiện công khai khi admin duyệt. Người đăng thấy thông báo "đang chờ duyệt".
- Admin trả lời với vai trò `expert` (có huy hiệu 👑).
- Chống spam bằng rate limit theo IP hoặc thiết bị.
- Đề xuất cho mình một trang `/admin` đơn giản có đăng nhập để duyệt bài.
- Seed sẵn 4 thread mẫu từ prototype.

### 5.7 Góc trò chơi
- Header có 3 tab (mỗi tab có ảnh mascot) và PointsBadge vàng "👑 N điểm" bên phải.
- Điểm cộng dồn và lưu trong `localStorage` (bọc try/catch).

**Myth hay Fact:**
- 10 câu, xáo trộn thứ tự, có thanh tiến trình.
- Card trắng viền blush, mascot `pipi-search`, câu phát biểu đặt trong ngoặc kép.
- 2 nút lớn: Myth (nền blush-soft) và Fact (nền mint-soft).
- Trả lời xong: hiện giải thích (đúng thì nền mint, sai thì nền blush), cộng 10 điểm nếu đúng, nút "Câu tiếp theo".

**Quiz 6 bài học:**
- 8 câu trắc nghiệm A–D.
- Đáp án đúng tô mint, đáp án chọn sai tô ruby, kèm giải thích. Cộng 10 điểm mỗi câu đúng.

**Màn hình kết quả:**
- Đúng ≥ 70%: `pipi-drum`, "Tuyệt vời!" và huy hiệu "Kiêu hãnh" 👑.
- Dưới 70%: `pipi-hi` và "Cố lên nhé!".

**Túi kỳ đầu:**
- 9 món, gồm 5 món đúng và 4 món không cần. Bấm để chọn hoặc bỏ chọn.
- "Kiểm tra túi": phải chọn ít nhất 1 món, nếu không thì báo lỗi.
- Món đúng có viền mint; món sai đã chọn bị làm mờ.
- Cộng 5 điểm mỗi món đúng, thêm 15 điểm nếu chọn hoàn hảo.

### 5.8 Footer (mọi trang)
- Nền ruby, 3 cột (2fr / 1fr / 1fr): giới thiệu P-Proud + khung trợ giúp, cột "Khám phá", cột "Kết nối" (tiêu đề cột màu gold).
- Khung trợ giúp: "Cần giúp đỡ ngay? Hãy nói với bố mẹ, thầy cô hoặc nhân viên y tế trường. Bạn cũng có thể gọi **Tổng đài quốc gia bảo vệ trẻ em 111** (miễn phí, 24/7)."

### 5.9 DemoBanner
Thanh ruby trên cùng: "Bản demo website dự án P-Proud – nội dung và số liệu mang tính minh họa".
- Bật/tắt bằng biến môi trường `NEXT_PUBLIC_SHOW_DEMO_BANNER`.
- Mặc định **bật** cho đến khi nội dung được chuyên gia thẩm định thật.

---

## 6. Chatbot PiPi (quan trọng nhất)

### 6.1 Giao diện
1. **Nút nổi (góc phải dưới, mọi trang):**
   - `pipi-hi` cao 96px, nhấp nhô, kèm bong bóng "Hỏi PiPi nè!".
   - Dưới 600px: ẩn bong bóng chữ, mascot còn 72px.
2. **Cửa sổ chat:**
   - Kích thước `min(400px, 100vw-24px)` × `min(600px, 100vh-40px)`, bo 26px, viền blush.
   - Header ruby: avatar `pipi-main` trong vòng tròn blush, tên "PiPi", dòng phụ "Bạn đồng hành của P-Proud", nút đóng.
   - Thân chat nền mist. Tin của PiPi: nền trắng, viền line, bo góc trái dưới nhỏ. Tin của người dùng: nền ruby, chữ trắng, bo góc phải dưới nhỏ.
3. **Hành vi:**
   - Lời chào đầu tiên lấy đúng như prototype.
   - 5 chip gợi ý câu hỏi, ẩn đi sau khi gửi tin đầu tiên.
   - Có 3 chấm nhấp nháy khi đang chờ.
   - **Streaming** từng chữ.
   - Render markdown nhẹ: **đậm**, danh sách gạch đầu dòng, xuống dòng. **Phải escape HTML.**
4. **Dòng ghi chú dưới ô nhập:** "PiPi là AI, có thể nhầm lẫn. Với vấn đề sức khỏe, hãy hỏi người lớn hoặc bác sĩ."
5. Nhấn Esc để đóng chatbot.

### 6.2 Backend `/api/chat`
- Nhận `{ messages: {role, content}[] }`.
- Chỉ gửi **10 tin gần nhất**. Giới hạn mỗi tin 500 ký tự.
- Rate limit, ví dụ 20 tin/10 phút/IP.
- Đặt `max_tokens` khoảng 400.
- **System prompt:** lấy nguyên văn hằng `PIPI_RULES` trong `reference/index.html`, đặt ở tham số `system`.
- Stream kết quả về client.
- Lỗi thì trả thông báo dễ thương bằng tiếng Việt, giống các nhánh lỗi trong prototype.
- **Không lưu** nội dung chat vào database. Không log dữ liệu cá nhân.

### 6.3 Yêu cầu nội dung của PiPi (đã có trong `PIPI_RULES`, phải giữ)
- Tiếng Việt, xưng "PiPi", gọi người dùng là "bạn". Giọng dễ thương. Tối đa khoảng 120 chữ.
- Chỉ trả lời trong phạm vi dự án. Câu ngoài phạm vi thì từ chối nhẹ nhàng.
- Không chẩn đoán bệnh, không đưa thuốc hay liều thuốc. Gặp dấu hiệu bất thường thì khuyên nói với người lớn hoặc đi khám.
- Không hỏi thông tin cá nhân.
- Nếu người dùng kể bị xâm hại, bắt nạt nghiêm trọng hoặc muốn tự làm đau bản thân: thể hiện quan tâm, nói rằng đó không phải lỗi của bạn, hướng tới người lớn tin cậy và **Tổng đài 111**.

---

## 7. An toàn trẻ em và quyền riêng tư (bắt buộc)

Người dùng chính là trẻ 11–13 tuổi:
- Không yêu cầu tạo tài khoản với học sinh. Diễn đàn dùng nickname ẩn danh.
- Không thu họ tên thật, trường, số điện thoại, email hay ảnh của học sinh. Lọc các thông tin này ở cả client và server.
- Không dùng cookie theo dõi hay analytics bên thứ ba có định danh. Nếu cần thống kê, dùng loại không cookie, ví dụ Vercel Analytics.
- Không chèn ảnh thật của học sinh.
- Có trang `/chinh-sach-rieng-tu` ngắn gọn, dễ hiểu. Link trang này ở footer.

---

## 8. Responsive và accessibility

- **Breakpoint:**
  - 1020px: nav chuyển sang nút ☰
  - 900px: diễn đàn 1 cột, timeline 2 cột
  - 820px: hero 1 cột
  - 720px: stat 2×2, footer 1 cột
  - 600px: chatbot gọn hơn
  - 520px: timeline 1 cột
- Tương phản đạt WCAG AA.
- Có focus ring rõ ràng.
- Tất cả nút dùng thẻ `<button>`. Modal và chatbot bẫy focus khi mở, đóng được bằng Esc.
- Ảnh mascot trang trí dùng `alt=""`, ảnh mang nghĩa có alt tiếng Việt.
- Game điều khiển được bằng bàn phím; các món trong Túi kỳ đầu có `aria-pressed`.

---

## 9. Thứ tự làm việc đề xuất

1. Khởi tạo dự án, design token, font, layout (Header, Footer, DemoBanner).
2. Dựng tất cả trang tĩnh với dữ liệu tách ra file `content`. So sánh với PDF từng trang.
3. Làm 3 game.
4. Làm chatbot: UI trước, sau đó `/api/chat` streaming.
5. Supabase: diễn đàn (pending/duyệt), báo cáo, đăng ký đại sứ, trang admin.
6. SEO, 404, chính sách riêng tư, kiểm tra Lighthouse và responsive.
7. Viết README: chạy local, biến môi trường, deploy Vercel, cách thay ảnh mascot và sửa nội dung.

Sau mỗi bước, chạy dev server và chụp màn hình so với `P-Proud_UI_Reference.pdf`. Báo cho mình những chỗ còn khác.

---

## 10. Không được làm

- Không tự đổi màu brand, font, tên mascot hay tagline.
- Không viết lại hay "cải thiện" nội dung sức khỏe khi chưa hỏi mình.
- Không để lộ `ANTHROPIC_API_KEY` ra client.
- Không dùng logo thương hiệu thật của nhà tài trợ khi chưa có thỏa thuận.
