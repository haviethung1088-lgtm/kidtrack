# Cài thông báo đẩy cho KidTrack

Tạo một Worker MỚI tên `kidtrack-push`, một KV MỚI tên `kidtrack-kv`, một Cron MỚI. Không mở, không sửa Worker hay KV của My Race.

1. Cloudflare, Workers & Pages, Create, Worker. Đặt tên `kidtrack-push`, Deploy. Edit code, xóa mã mẫu, dán toàn bộ `worker.js`, Deploy.
2. Storage & Databases, KV, Create namespace, tên `kidtrack-kv`.
3. Worker `kidtrack-push`, Settings, Bindings, Add, KV namespace. Variable name viết đúng `KV`, chọn `kidtrack-kv`, Deploy.
4. Settings, Triggers, Cron Triggers, Add, nhập `* * * * *`.
5. Mở `https://kidtrack-push.haviethung1088.workers.dev/health`, thấy chữ ok là được. Nếu địa chỉ Worker khác, sửa `push-config.js`.
6. GitHub Pages cùng tài khoản `haviethung1088-lgtm.github.io` thì không cần đặt APP_ORIGIN.
7. Trên từng điện thoại: mở KidTrack, bấm ⚙️, Bật nhắc trên máy này, cho phép thông báo, Gửi thử.

## Cập nhật Worker hiện có

Khi cập nhật app có thay đổi `worker.js` (ví dụ thêm nhắc sinh nhật), mở Worker `kidtrack-push` hiện có, chọn Edit code, thay toàn bộ mã bằng file `worker.js` mới trong gói dự án rồi Deploy. Giữ nguyên Worker, KV namespace và Cron Trigger hiện tại để không mất khóa VAPID và đăng ký thiết bị. Các thiết bị đã bật thông báo sẽ đồng bộ ngày sinh từ hồ sơ khi mở app và tải dữ liệu mới.
