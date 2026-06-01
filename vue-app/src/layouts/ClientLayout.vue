<template>
  <div>
    <!-- Top data indicator bar -->
    <div class="bg-dark text-white py-1 px-3 d-flex justify-content-between align-items-center"
      style="font-size: 0.75rem">
      <div class="d-flex align-items-center gap-2 ms-auto ms-md-0">
        <span class="fw-semibold">Cơ sở dữ liệu:</span>
        <div class="btn-group btn-group-sm" role="group" aria-label="Toggle data mode">
          <button type="button" class="btn py-0 px-2 fw-bold"
            :class="dataMode === 'local' ? 'btn-success' : 'btn-outline-light'" @click="toggleMode('local')"
            style="font-size: 0.7rem">
            Local Fix Cứng
          </button>
          <button type="button" class="btn py-0 px-2 fw-bold"
            :class="dataMode === 'api' ? 'btn-primary' : 'btn-outline-light'" @click="toggleMode('api')"
            style="font-size: 0.7rem">
            MockAPI Online
          </button>
        </div>
      </div>
    </div>

    <!-- Header Navigation -->
    <nav class="navbar navbar-expand-lg border-bottom border-light bg-white py-3 sticky-top shadow-sm">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center gap-2" to="/shop">
          <i class="bi bi-cart3 text-primary-green fs-4"></i>
          <span class="serif-font fw-bold" style="letter-spacing: 0.5px">ShoeSport</span>
        </router-link>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link text-dark fw-semibold" to="/shop">Cửa hàng</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-dark fw-medium" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Danh mục thương hiệu
              </a>
              <ul class="dropdown-menu border-0 shadow-sm mt-2"
                style="border-radius: 12px; background-color: var(--card-bg)">
                <li>
                  <a class="dropdown-item py-2 px-3 fw-medium text-dark" style="font-size: 0.85rem" href="#"
                    @click.prevent="filterBrand('Nike')">
                    <i class="bi bi-tag-fill me-2 text-secondary"></i>Giày Nike
                  </a>
                </li>
                <li>
                  <a class="dropdown-item py-2 px-3 fw-medium text-dark" style="font-size: 0.85rem" href="#"
                    @click.prevent="filterBrand('Adidas')">
                    <i class="bi bi-tag-fill me-2 text-secondary"></i>Giày
                    Adidas
                  </a>
                </li>
                <li>
                  <a class="dropdown-item py-2 px-3 fw-medium text-dark" style="font-size: 0.85rem" href="#"
                    @click.prevent="filterBrand('Puma')">
                    <i class="bi bi-tag-fill me-2 text-secondary"></i>Giày Puma
                  </a>
                </li>
                <li>
                  <a class="dropdown-item py-2 px-3 fw-medium text-dark" style="font-size: 0.85rem" href="#"
                    @click.prevent="filterBrand('Fila')">
                    <i class="bi bi-tag-fill me-2 text-secondary"></i>Giày Fila
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" style="border-color: var(--border-color)" />
                </li>
                <li>
                  <a class="dropdown-item py-2 px-3 fw-medium text-danger" style="font-size: 0.85rem" href="#"
                    @click.prevent="filterBrand('Ưu đãi')">
                    <i class="bi bi-percent me-2 text-danger"></i>Danh mục ưu
                    đãi
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="d-flex align-items-center gap-3">
          <!-- Search bar in header -->
          <div class="search-input-wrapper m-0 d-none d-md-block" style="min-width: 240px">
            <i class="bi bi-search"></i>
            <input type="text" class="form-control search-input" style="padding-top: 0.5rem; padding-bottom: 0.5rem"
              v-model="searchQuery" placeholder="Tìm kiếm..." @keyup.enter="performSearch" />
          </div>

          <router-link to="/checkout" class="nav-icon position-relative">
            <i class="bi bi-cart3"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-green"
              style="font-size: 0.65rem">
              {{ cartLength }}
            </span>
          </router-link>

          <!-- Account Profile Dropdown -->
          <div class="dropdown">
            <a href="#" class="nav-icon dropdown-toggle border-0" data-bs-toggle="dropdown" aria-expanded="false"
              id="profileDropdown">
              <i class="bi bi-person-circle"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm mt-3" aria-labelledby="profileDropdown"
              style="background-color: var(--card-bg); border-radius: 12px">
              <li>
                <h6 class="dropdown-header text-uppercase text-xs"
                  style="color: var(--primary-green); font-weight: 700">
                  Tài khoản
                </h6>
              </li>
              <li>
                <router-link class="dropdown-item py-2 px-3 text-dark fw-medium" style="font-size: 0.85rem" to="/login">
                  <i class="bi bi-box-arrow-in-right me-2 text-secondary"></i>Đăng nhập
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item py-2 px-3 text-dark fw-medium" style="font-size: 0.85rem"
                  to="/checkout">
                  <i class="bi bi-credit-card me-2 text-secondary"></i>Thanh
                  toán
                </router-link>
              </li>
              <li>
                <hr class="dropdown-divider" style="border-color: var(--border-color)" />
              </li>
              <li>
                <h6 class="dropdown-header text-uppercase text-xs"
                  style="color: var(--primary-green); font-weight: 700">
                  Quản lý
                </h6>
              </li>
              <li>
                <router-link class="dropdown-item py-2 px-3 text-dark fw-medium" style="font-size: 0.85rem"
                  to="/admin/dashboard">
                  <i class="bi bi-shield-lock me-2 text-secondary"></i>Cổng quản
                  trị
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Slots -->
    <main style="min-height: 70vh">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="py-5 mt-5" style="
        background-color: #f4f1ea;
        border-top: 1px solid var(--border-color);
      ">
      <div class="container">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <div class="d-flex align-items-center gap-4">
            <span class="serif-font fw-bold fs-4 text-dark" style="letter-spacing: 0.5px">ShoeSport</span>
            <ul class="list-inline m-0 d-flex flex-wrap gap-3" style="font-size: 0.85rem">
              <li class="list-inline-item">
                <a href="#" class="text-secondary text-decoration-none hover-dark">Về Chúng tôi</a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="text-secondary text-decoration-none hover-dark">Chính sách Bảo mật</a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="text-secondary text-decoration-none hover-dark">Điều khoản Dịch vụ</a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="text-secondary text-decoration-none hover-dark">Trung tâm Trợ giúp</a>
              </li>
            </ul>
          </div>
          <div class="text-secondary" style="font-size: 0.85rem">
            &copy; 2026 ShoeSport Global. Đã đăng ký Bản quyền.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { getDataSourceMode, setDataSourceMode } from "../services/api";

const router = useRouter();
const dataMode = ref(getDataSourceMode());
const searchQuery = ref("");
const cartLength = ref(0);

const toggleMode = (mode) => {
  setDataSourceMode(mode);
  dataMode.value = mode;
  // Reload window or trigger global refresh
  window.location.reload();
};

const filterBrand = (brand) => {
  router.push({ path: "/shop", query: { brand } });
};

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/shop", query: { q: searchQuery.value } });
  }
};

const updateCartBadge = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cartLength.value = cart.length;
};

// Listen to storage events to keep cart length updated
onMounted(() => {
  updateCartBadge();
  window.addEventListener("storage", updateCartBadge);
  window.addEventListener("cart-updated", updateCartBadge);
});

onUnmounted(() => {
  window.removeEventListener("storage", updateCartBadge);
  window.removeEventListener("cart-updated", updateCartBadge);
});
</script>

<style scoped>
.hover-dark:hover {
  color: var(--text-dark) !important;
}
</style>
