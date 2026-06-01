<template>
  <div class="admin-container">
    <!-- Sidebar Navigation -->
    <aside class="admin-sidebar">
      <div>
        <div class="admin-logo-area">
          <router-link to="/admin/dashboard" class="admin-logo">Cổng quản trị</router-link>
          <div class="admin-subtitle">Gói doanh nghiệp</div>
        </div>

        <!-- Data Mode Switcher inside Admin Sidebar -->
        <div class="p-3 my-2 border rounded bg-white text-dark shadow-xs" style="font-size: 0.8rem;">
          <div class="fw-semibold mb-2 text-center text-secondary-green text-uppercase font-weight-bold"
            style="letter-spacing: 0.5px; font-size: 0.7rem;">Cơ Sở Dữ Liệu</div>
          <div class="d-flex flex-column gap-1">
            <button type="button"
              class="btn btn-sm text-start py-1 px-2 fw-semibold d-flex justify-content-between align-items-center"
              :class="dataMode === 'local' ? 'btn-success text-white' : 'btn-outline-secondary'"
              @click="toggleMode('local')">
              <span>Local Fix Cứng</span>
              <i v-if="dataMode === 'local'" class="bi bi-check-circle-fill"></i>
            </button>
            <button type="button"
              class="btn btn-sm text-start py-1 px-2 fw-semibold d-flex justify-content-between align-items-center"
              :class="dataMode === 'api' ? 'btn-primary text-white' : 'btn-outline-secondary'"
              @click="toggleMode('api')">
              <span>MockAPI Online</span>
              <i v-if="dataMode === 'api'" class="bi bi-check-circle-fill"></i>
            </button>
          </div>
        </div>

        <!-- Action Button -->
        <button class="admin-btn-action" data-bs-toggle="modal" data-bs-target="#newReportModal">
          <i class="bi bi-plus-lg"></i> Báo cáo mới
        </button>

        <nav class="admin-nav">
          <router-link to="/admin/dashboard" class="admin-nav-link" active-class="active">
            <i class="bi bi-grid-1x2"></i> Bảng điều khiển
          </router-link>
          <router-link to="/admin/products" class="admin-nav-link" active-class="active">
            <i class="bi bi-box-seam"></i> Sản phẩm
          </router-link>
          <router-link to="/admin/orders" class="admin-nav-link" active-class="active">
            <i class="bi bi-bag-check"></i> Đơn hàng
          </router-link>
          <router-link to="/admin/pos" class="admin-nav-link" active-class="active">
            <i class="bi bi-cpu-fill"></i> Bán tại quầy
          </router-link>
          <router-link to="/admin/invoices" class="admin-nav-link" active-class="active">
            <i class="bi bi-file-earmark-ruled"></i> Hóa đơn
          </router-link>
          <router-link to="/admin/customers" class="admin-nav-link" active-class="active">
            <i class="bi bi-people"></i> Khách hàng
          </router-link>
          <router-link to="/admin/staff" class="admin-nav-link" active-class="active">
            <i class="bi bi-person-workspace"></i> Nhân viên
          </router-link>
        </nav>
      </div>

      <div>
        <div class="admin-nav-divider"></div>
        <nav class="admin-nav mb-3">
          <router-link to="/shop" class="admin-nav-link">
            <i class="bi bi-shop"></i> Về Cửa hàng
          </router-link>
          <router-link to="/login" class="admin-nav-link">
            <i class="bi bi-box-arrow-left"></i> Đăng xuất
          </router-link>
        </nav>

        <div class="admin-profile">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"
            alt="Admin Avatar" class="admin-avatar" />
          <div class="admin-profile-info">
            <div class="admin-profile-name">Quản trị viên</div>
            <div class="admin-profile-role">Quản trị hệ thống</div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="admin-main">
      <!-- Page Header Row -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <!-- Title is injected dynamically by view pages -->
          <h1 class="admin-page-title serif-font text-dark fw-bold mb-1" style="font-size: 2.2rem;">
            {{ title }}
          </h1>
        </div>

        <!-- Search and Tools -->
        <div class="d-flex align-items-center gap-3">
          <div class="search-input-wrapper m-0 d-none d-sm-block" style="min-width: 260px;">
            <i class="bi bi-search"></i>
            <input type="text" class="form-control search-input" placeholder="Tìm kiếm nhanh...">
          </div>
          <button
            class="btn btn-light rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center"
            style="width: 42px; height: 42px; background-color: white;" @click="notifyReport">
            <i class="bi bi-bell fs-5 text-secondary"></i>
          </button>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"
            alt="Avatar" class="rounded-circle border border-2 border-white shadow-sm d-none d-sm-block"
            style="width: 42px; height: 42px; object-fit: cover;" />
        </div>
      </div>

      <!-- Content Page slot -->
      <slot></slot>
    </main>

    <!-- New Report Modal -->
    <div class="modal fade" id="newReportModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
          <div class="modal-header border-bottom border-light py-3 px-4">
            <h5 class="modal-title serif-font fw-bold">Tạo báo cáo mới</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <form>
              <div class="mb-3">
                <label class="form-label">Loại báo cáo</label>
                <select class="form-select" v-model="reportType">
                  <option value="revenue">Báo cáo doanh thu chung</option>
                  <option value="bestseller">Báo cáo hàng bán chạy</option>
                  <option value="customers">Báo cáo nhân khẩu học khách hàng</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer border-top border-light py-3 px-4">
            <button type="button" class="btn btn-outline-green" data-bs-dismiss="modal">Hủy bỏ</button>
            <button type="button" class="btn btn-primary-green" @click="generateReport" data-bs-dismiss="modal">Kết
              xuất</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getDataSourceMode, setDataSourceMode } from '../services/api';

const route = useRoute();
const dataMode = ref(getDataSourceMode());
const reportType = ref('revenue');

const toggleMode = (mode) => {
  setDataSourceMode(mode);
  dataMode.value = mode;
  window.location.reload();
};

const title = computed(() => {
  switch (route.name) {
    case 'AdminDashboard': return 'Tổng Quan Bảng Điều Khiển';
    case 'AdminProducts': return 'Quản Lý Sản Phẩm';
    case 'AdminOrders': return 'Quản Lý Đơn Hàng';
    case 'AdminPOS': return 'Hệ Thống Bán Hàng Tại Quầy (POS)';
    case 'AdminInvoices': return 'Quản Lý Hóa Đơn';
    case 'AdminCustomers': return 'Danh Sách Khách Hàng';
    case 'AdminStaff': return 'Quản Lý Nhân Viên';
    default: return 'Cổng Quản Trị Hệ Thống';
  }
});

const generateReport = () => {
  alert(`Đã bắt đầu kết xuất báo cáo: ${reportType.value === 'revenue' ? 'Báo cáo doanh thu chung' : reportType.value === 'bestseller' ? 'Báo cáo hàng bán chạy' : 'Báo cáo nhân khẩu học khách hàng'}`);
};

const notifyReport = () => {
  alert('Không có thông báo mới nào.');
};
</script>

<style scoped>
/* Scoped modifications if needed */
</style>
