ShoeSport — Tài Liệu Di Trú & Hướng Dẫn Vận Hành Vue 3
Hệ thống ShoeSport đã được di trú thành công từ mã nguồn HTML/Bootstrap tĩnh ban đầu thành một ứng dụng Vue 3 Single Page Application (SPA) hoàn chỉnh sử dụng Vite, mang lại trải nghiệm mượt mà, tốc độ phản hồi tức thì và cấu trúc mô-đun hóa dễ bảo trì.

NOTE

Hệ thống hiện đang chạy trên máy chủ phát triển nội bộ tại địa chỉ: http://localhost:5173/.

1. Cấu Trúc Dự Án (Architectural Blueprint)
Dự án tuân thủ chặt chẽ nguyên tắc chia tách mối quan tâm (Separation of Concerns) trong phát triển Vue chuyên nghiệp:

App.vue - Dynamic Layout Wrapper
ClientLayout.vue
AdminLayout.vue
BlankLayout.vue
Client Pages: Shop, Detail, Checkout
Admin Pages: Dashboard, Products, Orders, POS, Invoices, Customers, Staff
Login.vue
services/api.js - Dual Mode Switcher
LocalStorage - Local Fix Cứng
MockAPI Online Endpoint
Chi tiết các phân lớp:
main.js
: Điểm khởi chạy cấu hình Router và import tài nguyên giao diện cao cấp.
router/index.js
: Quản lý định tuyến SPA (Hash Mode) kèm cấu hình Layout Meta.
src/layouts/:
ClientLayout.vue
: Header giỏ hàng, footer, danh mục lọc nhanh thương hiệu và thanh switcher dữ liệu.
AdminLayout.vue
: Sidebar điều hướng quản trị, thông tin profile, nút kết xuất báo cáo nhanh.
BlankLayout.vue
: Layout trống tối giản dành riêng cho màn hình đăng nhập.
services/api.js
: Tầng dịch vụ dữ liệu trung tâm, đóng vai trò điều phối giữa chế độ Local & API.
2. Tính Năng Kỹ Thuật Đã Hoàn Thiện
2.1 Cổng Quản Trị Đa Nhiệm (Admin Sidebar Modules) - 3 Điểm
Toàn bộ các trang quản trị được kết nối liên tục, cho phép nhảy chuyển nhanh chóng:

Bảng điều khiển: Biểu đồ hoạt động kinh doanh (Chart.js), bộ đếm KPI thời gian thực, bảng xếp hạng thương hiệu thị phần.
Sản phẩm: Xem danh sách dạng lưới/bảng kèm bộ lọc thương hiệu, chức năng thêm mới/sửa đổi/xóa sản phẩm qua modal popup tương tác.
Đơn hàng: Quản lý lịch sử mua hàng, thay đổi trạng thái giao vận (Chờ xử lý, Đang giao, Đã hoàn thành, Đã hủy), xem chi tiết danh sách giày mua (Size, Màu sắc).
Bán tại quầy (POS): Hệ thống POS cao cấp hỗ trợ thu ngân chọn nhanh giày, tự động cấu hình Size/Màu sắc, tính thuế VAT, khấu trừ mã quầy, in xuất hóa đơn ngay lập tức.
Hóa đơn: Quản lý chứng từ thanh toán, in ấn nhanh hóa đơn, cập nhật trạng thái chi trả.
Khách hàng & Nhân viên: Quản lý thông tin thành viên, phân cấp hội viên (Bronze, Gold, Platinum) và thiết lập phòng ban nhân sự.
2.2 Switcher Dữ Liệu Đột Phá (Local vs. MockAPI Online) - 
Hệ thống tích hợp một thanh chuyển đổi nguồn cơ sở dữ liệu linh hoạt trên thanh công cụ màu đen (phía Client) và Sidebar (phía Admin):

Chế độ Local Fix Cứng: Mọi hành động CRUD (Create, Read, Update, Delete) được thực hiện trên LocalStorage thông qua bộ dữ liệu SEED khởi tạo phong phú.
Chế độ MockAPI Online: Mọi tác vụ được gọi trực tiếp qua các RESTful API của MockAPI, hỗ trợ đồng bộ hóa đám mây tức thì.
2.3 Bán Hàng Đầu Khách (Client Purchase E-commerce Flow) - 
Quy trình mua hàng khép kín:

Chọn mẫu giày tại trang chủ (Nike, Adidas, Puma, Fila).
Lọc nhanh sản phẩm theo thương hiệu hoặc tìm kiếm từ khóa trên thanh tiêu đề.
Vào chi tiết sản phẩm: Cấu hình Size chân (39-44), Màu sắc, số lượng tăng giảm, thông số kỹ thuật và phản hồi của khách hàng cũ.
Điền thông tin giao nhận, áp dụng voucher giảm giá SHOESPORT10 (khấu trừ 10% trực tiếp) tại trang Thanh toán.
Đặt hàng thành công: Tự động ghi nhận thông tin hóa đơn mới vào bảng quản trị và làm sạch giỏ hàng.
2.4 Giao Diện Responsive Toàn Diện - 
Tương thích hoàn hảo với mọi kích thước khung hình (Desktop, Tablet, Mobile) nhờ hệ thống Grid linh hoạt của Bootstrap 5 và CSS tùy biến.
Các bảng biểu trên thiết bị di động tự động kích hoạt thanh trượt ngang chống tràn màn hình.
