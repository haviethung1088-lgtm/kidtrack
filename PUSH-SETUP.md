# Cài thông báo đẩy cho KidTrack

Làm giống My Race, chỉ đổi tên. Worker và KV là của riêng app này, tách khỏi My Race.

1. Cloudflare, Workers & Pages, Create, Worker. Đặt tên đúng là `so-hoc-tap-push`, bấm Deploy. Bấm Edit code, xóa mã mẫu, dán toàn bộ `worker.js`, bấm Deploy.
2. Storage & Databases, KV, Create namespace (tên tùy ý, ví dụ `so-hoc-tap-kv`). Vào Worker, Settings, Bindings, Add, KV namespace, đặt Variable name đúng là `KV`, chọn namespace vừa tạo.
3. Worker, Settings, Triggers, Add Cron Trigger, nhập `* * * * *`.
4. Nếu GitHub Pages của app này không nằm cùng tài khoản `haviethung1088-lgtm.github.io`, thêm biến `APP_ORIGIN` (Settings, Variables) bằng đúng origin của trang, chỉ gồm `https://` và tên miền.
5. Mở `https://so-hoc-tap-push.haviethung1088.workers.dev/health`, kết quả phải có `{"ok":true,...}`. Nếu địa chỉ Worker của anh khác, sửa dòng URL trong `push-config.js`.
6. Đưa tất cả file lên GitHub Pages: `index.html`, `sw.js`, `manifest.webmanifest`, `push-config.js`, ba file ảnh `.png`.
7. Trên từng điện thoại (anh và vợ): mở app, bấm ⚙️, Bật nhắc trên máy này, cho phép thông báo, bấm Gửi thử. iPhone cần thêm app vào Màn hình chính trước (iOS 16.4 trở lên).
