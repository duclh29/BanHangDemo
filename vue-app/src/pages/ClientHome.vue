<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="hero-subtitle text-uppercase">Bộ sưu tập Mới</div>
            <h1 class="hero-title">Nâng Tầm Phong Cách Thể Thao</h1>
            <p class="hero-desc">
              Khám phá bộ sưu tập giày chạy bộ và giày thời trang cao cấp được
              tuyển chọn dành riêng cho người yêu vận động. Sự kết hợp hoàn hảo
              giữa công nghệ êm chân vượt trội và phong cách thời thượng.
            </p>
            <div class="d-flex gap-3">
              <a href="#products-section" class="btn btn-primary-green">Khám phá Cửa hàng</a>
              <a href="#info-section" class="btn btn-outline-green">Xem Dịch vụ</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Grid Section -->
    <section class="py-5" id="products-section" style="background-color: var(--bg-cream)">
      <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 class="section-title text-dark mb-2 fs-2 fw-bold">
              {{ currentTitle }}
            </h2>
            <p class="text-muted m-0" style="font-size: 0.9rem">
              Những lựa chọn tinh tế định hình phong cách mùa này.
            </p>
          </div>
          <div v-if="activeFilter || activeSearch">
            <button @click="clearFilters" class="btn btn-outline-secondary btn-sm rounded-pill px-3">
              <i class="bi bi-x-circle me-1"></i> Xóa bộ lọc
            </button>
          </div>
        </div>

        <!-- Loader -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Đang tải sản phẩm...</span>
          </div>
          <p class="text-muted mt-2">Đang tải danh sách sản phẩm...</p>
        </div>

        <!-- Product Grid: 8 products per page -->
        <div v-else class="row g-4">
          <!-- Empty State -->
          <div v-if="paginatedProducts.length === 0" class="col-12 text-center py-5">
            <div class="mb-3">
              <i class="bi bi-box-seam text-muted" style="font-size: 3rem;"></i>
            </div>
            <h4 class="text-dark fw-semibold mb-2">Không tìm thấy sản phẩm nào</h4>
            <p class="text-muted mb-4">Hãy thử quay lại trang cửa hàng chính hoặc thay đổi bộ lọc của bạn.</p>
            <button @click="clearFilters" class="btn btn-primary-green px-4 py-2" style="border-radius: 8px;">Quay lại
              Cửa hàng</button>
          </div>

          <!-- Products Card -->
          <div v-else class="col-sm-6 col-md-6 col-lg-3" v-for="product in paginatedProducts" :key="product.id">
            <div class="product-card" @click="viewDetail(product.id)" style="cursor: pointer; height: 100%">
              <div class="product-image-wrapper"
                :class="{ 'out-of-stock': product.stock === 0 || product.status === 'Hết hàng' }">
                <span v-if="product.stock > 0 && product.stock <= 5" class="product-badge"
                  style="background-color: #d93838; color: white;">Sắp hết hàng</span>
                <span v-else-if="product.stock > 20" class="product-badge badge-orange">Bán chạy</span>
                <img :src="product.image" :alt="product.title" class="product-image" />
              </div>
              <div class="product-info">
                <div class="text-uppercase fw-bold mb-1"
                  style="font-size: 0.7rem; color: var(--primary-green); letter-spacing: 0.5px;">
                  {{ product.brand || 'ShoeSport' }}
                </div>
                <h3 class="product-title text-truncate">{{ product.title }}</h3>
                <p class="product-subtitle text-truncate">{{ product.subtitle }}</p>
                <div class="product-footer">
                  <div class="product-price">{{ formatVND(product.price) }}</div>
                  <button class="btn-add-cart border-0" @click.stop="addToCart(product)">
                    <i class="bi bi-bag"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1 && !loading" class="d-flex justify-content-center py-5 mt-3">
          <ul
            class="pagination-pages shadow-sm bg-white p-2 border rounded-pill list-unstyled d-flex align-items-center gap-1">
            <li>
              <a href="#" class="page-btn page-arrow" :class="{ disabled: currentPage === 1 }"
                @click.prevent="changePage(currentPage - 1)">
                <i class="bi bi-chevron-left"></i>
              </a>
            </li>
            <li v-for="page in totalPages" :key="page">
              <a href="#" class="page-btn" :class="{ active: currentPage === page }" @click.prevent="changePage(page)">
                {{ page }}
              </a>
            </li>
            <li>
              <a href="#" class="page-btn page-arrow" :class="{ disabled: currentPage === totalPages }"
                @click.prevent="changePage(currentPage + 1)">
                <i class="bi bi-chevron-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Services Info Section -->
    <section class="py-5 bg-white border-top border-bottom border-light" id="info-section"
      style="background-color: #faf9f6 !important">
      <div class="container py-4">
        <div class="row g-5 align-items-center">
          <div class="col-lg-6">
            <div class="text-uppercase text-secondary fw-semibold mb-2"
              style="font-size: 0.75rem; letter-spacing: 2px; color: var(--badge-active-color) !important;">
              Dịch vụ ShoeSport
            </div>
            <h2 class="serif-font mb-4 fs-1 text-dark fw-bold" style="line-height: 1.25">
              Trải nghiệm Đẳng cấp và Đột phá
            </h2>
            <p class="text-muted mb-4" style="font-size: 0.95rem; line-height: 1.7">
              Không chỉ bán giày, ShoeSport đồng hành cùng mọi chuyển động của bạn. Chúng tôi cung cấp các dịch vụ chăm
              sóc giày chuyên nghiệp, đo size chân 3D công nghệ cao và ưu đãi dành riêng cho hội viên.
            </p>

            <ul class="list-unstyled mb-5">
              <li class="d-flex align-items-center mb-3 text-dark fw-medium" style="font-size: 0.9rem">
                <i class="bi bi-check-circle-fill text-primary-green me-3 fs-5"></i>
                Đo size bàn chân 3D chính xác tại cửa hàng
              </li>
              <li class="d-flex align-items-center mb-3 text-dark fw-medium" style="font-size: 0.9rem">
                <i class="bi bi-check-circle-fill text-primary-green me-3 fs-5"></i>
                Dịch vụ vệ sinh & bảo dưỡng giày chuyên nghiệp
              </li>
              <li class="d-flex align-items-center text-dark fw-medium" style="font-size: 0.9rem">
                <i class="bi bi-check-circle-fill text-primary-green me-3 fs-5"></i>
                Đổi trả miễn phí trong vòng 30 ngày
              </li>
            </ul>

            <a href="#products-section" class="btn btn-primary-green">Khám phá ngay</a>
          </div>

          <div class="col-lg-6">
            <div class="row g-4">
              <div class="col-md-6">
                <div class="service-card">
                  <div>
                    <div class="service-icon-wrapper"
                      style="background-color: var(--primary-green-light); color: var(--primary-green);">
                      <i class="bi bi-shield-check fs-5"></i>
                    </div>
                    <h3 class="service-title serif-font text-dark fw-bold">Bảo hành trọn đời</h3>
                    <p class="service-desc">
                      ShoeSport cam kết bảo hành keo, chỉ khâu trọn đời cho tất cả sản phẩm chính hãng được mua tại hệ
                      thống cửa hàng của chúng tôi.
                    </p>
                  </div>
                  <div class="service-footer">
                    <span class="service-meta text-muted">Trọn đời &bull; Miễn phí</span>
                    <a href="#" class="service-link" @click.prevent="registerWarranty">Đăng ký</a>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="service-card">
                  <div>
                    <div class="service-icon-wrapper" style="background-color: #faf3e0; color: #b28e3a">
                      <i class="bi bi-award fs-5"></i>
                    </div>
                    <h3 class="service-title serif-font text-dark fw-bold">Hội viên ShoeSport Club</h3>
                    <p class="service-desc">
                      Tích điểm đổi quà độc quyền, nhận mã giảm giá 15% vào tháng sinh nhật và quyền ưu tiên mua trước
                      các phiên bản giới hạn đặc biệt.
                    </p>
                  </div>
                  <div class="service-footer">
                    <span class="service-meta text-muted">Tích điểm &bull; Đặc quyền</span>
                    <a href="#" class="service-link" @click.prevent="joinClub">Tham gia</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchProducts, formatVND } from '../services/api';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const products = ref([]);
const currentPage = ref(1);
const itemsPerPage = 8;

const activeFilter = computed(() => route.query.brand || null);
const activeSearch = computed(() => route.query.q || null);

const currentTitle = computed(() => {
  if (activeFilter.value) {
    return `Sản phẩm thương hiệu: ${activeFilter.value}`;
  }
  if (activeSearch.value) {
    return `Kết quả tìm kiếm cho: "${activeSearch.value}"`;
  }
  return 'Sản phẩm Nổi bật';
});

const loadProductsData = async () => {
  loading.value = true;
  try {
    const rawProducts = await fetchProducts();
    // Apply filters
    if (activeFilter.value) {
      if (activeFilter.value === 'Ưu đãi') {
        // As requested by instructions, Promo category "Ưu đãi" is seeded as empty or low stock items
        products.value = rawProducts.filter(p => p.stock > 0 && p.stock <= 5);
      } else {
        products.value = rawProducts.filter(
          p => p.brand && p.brand.toLowerCase() === activeFilter.value.toLowerCase()
        );
      }
    } else if (activeSearch.value) {
      products.value = rawProducts.filter(
        p => p.title && p.title.toLowerCase().includes(activeSearch.value.toLowerCase())
      );
    } else {
      products.value = rawProducts;
    }
    currentPage.value = 1;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return products.value.slice(startIndex, startIndex + itemsPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsPerPage) || 1;
});

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
};

const clearFilters = () => {
  router.push('/shop');
};

const viewDetail = (id) => {
  router.push(`/product/${id}`);
};

const addToCart = (product) => {
  if (product.stock === 0 || product.status === 'Hết hàng') {
    alert('Sản phẩm đã hết hàng!');
    return;
  }
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  // Check if item already in cart
  const existing = cart.find(item => String(item.id) === String(product.id));
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      brand: product.brand,
      size: '42', // default size
      color: 'Đen nhám', // default color
      quantity: 1
    });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  // Dispatch dynamic event to refresh header navbar badge
  window.dispatchEvent(new Event('cart-updated'));
  alert(`Đã thêm "${product.title}" vào giỏ hàng thành công!`);
};

const registerWarranty = () => {
  alert('Đã đăng ký bảo hành tự động qua số điện thoại mua hàng của bạn!');
};

const joinClub = () => {
  alert('Chào mừng bạn gia nhập ShoeSport Club! Ưu đãi 15% đã sẵn sàng trong ví của bạn.');
};

// Re-fetch/filter when route parameters change
watch(() => route.query, loadProductsData);

onMounted(() => {
  loadProductsData();
});
</script>

<style scoped>
.hero-section {
  background:
    linear-gradient(90deg,
      #faf8f5 30%,
      rgba(250, 248, 245, 0.85) 45%,
      rgba(250, 248, 245, 0) 70%),
    url("https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1600&auto=format&fit=crop") no-repeat center right;
  background-size: cover;
  min-height: 85vh;
  display: flex;
  align-items: center;
}

.product-image-wrapper.out-of-stock::after {
  content: "Hết hàng";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  color: var(--text-dark);
  letter-spacing: 1px;
  z-index: 1;
}
</style>
