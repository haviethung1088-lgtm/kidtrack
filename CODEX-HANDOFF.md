# KidTrack — hướng dẫn bàn giao cho Codex

## Cách tiếp tục ở tài khoản Codex khác

1. Mở thư mục `kidtrack-main` được giải nén từ gói ZIP mới nhất làm workspace. Đây là **bản nguồn chuẩn đang làm**; không dùng các bản cũ ở thư mục lưu trữ.
2. Đọc file này và `kidtrack-main\README.txt` trước khi sửa.
3. Kiểm tra `version.json` và `APP_VER` trong `index.html` trước khi bắt đầu. Tại thời điểm bàn giao này, bản mới nhất là **v1.10.57**; thông tin phiên bản trong hai file này là nguồn chính xác.
4. Sửa trực tiếp trong `kidtrack-main`. Sau mỗi thay đổi phát hành, đồng bộ `APP_VER` + `APP_BUILD` trong `index.html`, `version` + `build` trong `version.json`, đồng thời tăng cache name `kidtrack-vNN` trong `sw.js`.
5. Tạo gói ZIP mới để anh tải lên GitHub; không ghi đè các bản ZIP cũ. Dùng tên có số phiên bản mới, ví dụ `KidTrack-v1.10.57-GitHub.zip`.

## Chọn đúng thư mục nguồn

Bản ZIP mới nhất là nguồn chuẩn; các thư mục/bản cũ khác trong Downloads chỉ là lưu trữ. **Không lấy chúng làm nguồn phát hành.** Không xóa hoặc sửa bản lưu trữ nếu anh chưa yêu cầu.

## Tình trạng bản hiện tại

- **v1.10.57:** thêm lựa chọn đóng trước cả khóa để theo dõi số buổi/tổng buổi, không cộng tiền phát sinh; giữ lựa chọn tính theo buổi với số còn nợ được trừ sau thanh toán; lịch sử khoản đóng vẫn lưu trong payments.
- **v1.10.50:** thêm nút chuông cạnh icon cài đặt; danh sách thông báo trong app; lưu thông báo phiên bản mới và thông báo đẩy trong IndexedDB; đánh dấu đã đọc; giữ nhắc cập nhật đến khi đã cài phiên bản đó; đồng bộ số chưa đọc lên app badge bằng Web Badging API khi thiết bị hỗ trợ.
- **v1.10.48:** cải tiến giao diện mobile/desktop; menu desktop mở cố định kèm nhãn; tăng phân cấp chữ và độ rõ của thẻ/bảng; làm nổi học viên đang xem.
- Trước đó đã có các phần đồng bộ dữ liệu, sao lưu/khôi phục, thời khóa biểu, điểm, thu học phí, xuất/nhập và giao diện theo yêu cầu của anh.
- JavaScript trong `index.html`, `worker.js`, `sw.js` đã qua kiểm tra cú pháp khi đóng gói v1.10.50. Chưa kiểm tra trực tiếp trên mọi điện thoại/trình duyệt.

## Các yêu cầu cần giữ khi làm tiếp

### Thời khóa biểu

- Mỗi tiết là một mục riêng, giữ đúng số tiết từ TKB. Ví dụ thứ 2 của Minh Hưng có 4 tiết sáng và 3 tiết chiều (trong đó có 2 tiết Anh liền nhau) thì tổng là **7 tiết**; hai tiết Anh phải có giờ riêng, không gộp thành một tiết.
- Quy tắc hiển thị phải thống nhất giữa Home, lịch học từng học viên, tổng quan và các chỗ khác.
- Khi nhập giờ bắt đầu, tự tính các tiết 45 phút; vẫn cho phép tùy chỉnh riêng từng tiết.

### Học viên và giao diện

- Anh chủ yếu dùng điện thoại nhưng muốn dùng thoải mái trên desktop.
- Trang `Family` đã đổi tên thành **Home**. Thứ tự mặc định: Minh Hưng trước Minh Ngọc; giữ thao tác kéo thả thứ tự học viên.
- Màu học viên phải nhất quán và dễ nhận ra ở Home, quản lý học viên và các mục chi tiết. Chelsea cần rõ chữ/icon, tránh hiệu ứng vàng rối hoặc tương phản kém.
- Lời chào nằm trong bong bóng riêng ngay dưới khối thời tiết; chỉ dùng hiệu ứng ảnh nền tương tự, không nhập chung hai bong bóng.
- Khi chỉnh UI, kiểm tra cả kích thước nhỏ trên điện thoại và desktop rộng; đừng để menu desktop chỉ ló ra khi rê chuột rồi biến mất.

### Thông báo và cập nhật

- Thông báo phiên bản mới là chưa đọc cho tới khi phiên bản đó thực sự được cập nhật.
- Thông báo đẩy phải lưu được cả khi app đang đóng; bấm thông báo hệ thống sẽ đánh dấu đã đọc.
- Số trên icon màn hình chính phụ thuộc API Badging và hỗ trợ của trình duyệt/hệ điều hành; nếu nền tảng không hỗ trợ số thì chuông trong app vẫn phải hiện số chưa đọc.

### Sao lưu và dữ liệu

- Không tạo bản sao lưu khi dữ liệu chưa đồng bộ đủ từ máy chủ.
- Khôi phục phải xác nhận đúng không gian, báo rõ nếu chỉ khôi phục được một phần và không được âm thầm coi file thiếu nhóm dữ liệu là backup đầy đủ.
- Giữ nguyên cấu hình Firebase/Worker trong các gói phát hành; không in giá trị cấu hình ra chat hoặc đưa lên dịch vụ ngoài.

## Quy trình phát hành gợi ý

- Chỉ chỉnh đúng yêu cầu, không tự xóa tính năng hoặc dữ liệu.
- Sau chỉnh sửa, kiểm tra cú pháp JavaScript; nếu anh yêu cầu kiểm tra giao diện thì mở thử trên kích thước điện thoại và desktop.
- Tăng version và service worker cache mỗi lần phát hành; bảo đảm `index.html` khớp `version.json`.
- Đóng gói toàn bộ nội dung thư mục `kidtrack-main` vào ZIP mới để tải lên GitHub, bỏ file `kidtrack-main.zip` 58 byte nằm bên trong thư mục.
- Không tự push/commit lên GitHub hoặc thay đổi dữ liệu Firebase nếu anh chưa yêu cầu.

## Lời nhắn có thể gửi cho Codex mới

> Tiếp tục dự án KidTrack theo `CODEX-HANDOFF.md`. Nguồn chuẩn là thư mục `kidtrack-main` giải nén từ ZIP mới nhất; xem `version.json` và `APP_VER` để biết phiên bản hiện hành. Giữ nguyên các yêu cầu TKB không gộp tiết, giao diện mobile-first nhưng tốt trên desktop, nhận diện học viên rõ, và luồng sao lưu/thông báo. Hãy đọc code hiện tại trước khi sửa, làm trực tiếp trong thư mục nguồn chuẩn, đồng bộ version + service worker cache và tạo ZIP phát hành mới khi hoàn tất. Không sửa bản lưu trữ hoặc push GitHub nếu chưa được yêu cầu.
