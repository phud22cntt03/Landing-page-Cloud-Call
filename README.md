# Hướng Dẫn Sử Dụng Landing Page Tổng Đài Cloud IncallCloud

Landing Page này được thiết kế và tối ưu hoàn chỉnh dựa trên tiêu chuẩn SaaS B2B Báo cáo & Chăm sóc khách hàng hiện đại.

## Cấu trúc thư mục:
- `index.html`: Cấu trúc nội dung, tối ưu SEO và liên kết thư viện.
- `style.css`: Hệ thống giao diện (Design System), hiệu ứng chuyển động, responsive di động và máy tính.
- `script.js`: Các tương tác logic, tự động xoay quy trình, nút đổi giá cước, đóng/mở câu hỏi FAQ, hiệu ứng di chuyển ánh sáng theo chuột, kiểm tra lỗi form đăng ký.
- `assets/dashboard_hero.png`: Hình ảnh giao diện dashboard tổng đài đám mây chất lượng cao đã được xuất sẵn.

## Cách chạy thử:
Bạn có thể mở trực tiếp file `index.html` trên trình duyệt bằng cách kéo thả file hoặc click đúp chuột. 

Tuy nhiên, khuyến khích chạy qua máy chủ HTTP cục bộ để mọi hiệu ứng tải ảnh mượt mà nhất. 

Nếu bạn có Python trên máy:
1. Mở Terminal (PowerShell / Command Prompt) tại thư mục này.
2. Chạy lệnh: `python -m http.server 8000`
3. Truy cập trình duyệt theo địa chỉ: `http://localhost:8000`

## Chi tiết các hiệu ứng UI/UX nổi bật đã tích hợp:
1. **Header động**: Tự động chuyển nền mờ khi cuộn chuột xuống.
2. **Hiệu ứng chuột Benefit**: Rê chuột qua các thẻ lợi ích sẽ thấy luồng sáng chạy theo trỏ chuột (Mouse hover radial glow).
3. **Quy trình tương tác**: 5 bước hoạt động tự động sáng tuần tuần tự hoặc sáng theo bước người dùng click chọn.
4. **Nút đổi giá cước**: Chuyển đổi linh hoạt giá theo Tháng/Năm với mức giảm giá 20% khi chọn năm.
5. **Chọn gói nhanh**: Click đăng ký ở bất cứ gói cước nào sẽ tự điền tên gói đó vào form và cuộn mượt xuống khu vực đăng ký tư vấn.
6. **FAQ Accordion**: Đóng mở thông tin êm ái kèm chuyển động xoay mũi tên chỉ báo.
7. **Kiểm tra form thông minh**: Phát hiện lỗi ngay khi khách hàng nhập và hiển thị thông báo thành công sau khi gửi form.
