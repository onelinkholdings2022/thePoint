# Font Assets — The Point

## Font cần thiết

### 1. Good Times (bắt buộc cho headings)
- File cần: `GoodTimes.woff2` và `GoodTimes.woff`
- Nguồn: https://www.dafont.com/good-times.font (Ray Larabie)
- Đặt file vào đúng thư mục này (`/public/assets/fonts/`)
- Đã khai báo trong `globals.css` — chỉ cần thêm file là dùng được

### 2. DM Sans (đã tích hợp qua Google Fonts)
- Không cần làm gì thêm — tự tải qua `next/font/google`

## Cách dùng trong code
```css
font-family: var(--font-good-times);   /* headings */
font-family: var(--font-dm-sans);      /* body text */
```

Hoặc qua Tailwind:
```html
<h1 class="font-good-times">Heading</h1>
<p class="font-sans">Body text</p>
```
