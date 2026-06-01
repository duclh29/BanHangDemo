<template>
  <div class="container py-4">
    <!-- Loader -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Đang tải chi tiết sản phẩm...</span>
      </div>
      <p class="text-muted mt-2">Đang tải chi tiết sản phẩm...</p>
    </div>

    <!-- Product Display -->
    <div v-else-if="product">
      <!-- Breadcrumbs -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb" style="font-size: 0.8rem;">
          <li class="breadcrumb-item"><router-link to="/shop" class="text-secondary text-decoration-none">Trang chủ</router-link></li>
          <li class="breadcrumb-item">
            <router-link :to="{ path: '/shop', query: { brand: product.brand } }" class="text-secondary text-decoration-none">
              {{ product.brand || 'Giày thể thao' }}
            </router-link>
          </li>
          <li class="breadcrumb-item active text-dark fw-semibold" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>

      <!-- Presentation row -->
      <div class="row g-5 mb-5">
        <!-- Left Side: Product Image & Gallery -->
        <div class="col-lg-6">
          <!-- Large Display Image -->
          <div class="detail-main-img-container shadow-sm mb-3">
            <img :src="activeImage" class="detail-main-img" :alt="product.title">
          </div>
          
          <!-- Thumbnails Gallery -->
          <div class="d-flex gap-3">
            <img 
              :src="product.image" 
              class="detail-thumb" 
              :class="{ active: activeImage === product.image }" 
              @click="activeImage = product.image" 
              alt="View 1"
            >
            <img 
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&auto=format&fit=crop" 
              class="detail-thumb" 
              :class="{ active: activeImage === 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&auto=format&fit=crop' }" 
              @click="activeImage = 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&auto=format&fit=crop'" 
              alt="View 2"
            >
            <img 
              src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&auto=format&fit=crop" 
              class="detail-thumb" 
              :class="{ active: activeImage === 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&auto=format&fit=crop' }" 
              @click="activeImage = 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&auto=format&fit=crop'" 
              alt="View 3"
            >
          </div>
        </div>
        
        <!-- Right Side: Details -->
        <div class="col-lg-6">
          <div class="d-flex align-items-center gap-3 mb-2">
            <span 
              class="badge-status" 
              :style="isOutOfStock ? 'background-color: #FCE8E6; color: #C5221F;' : 'background-color: #E6F4EA; color: #137333;'"
            >
              {{ isOutOfStock ? 'HẾT HÀNG' : 'CÒN HÀNG' }}
            </span>
            <span class="text-secondary" style="font-size: 0.8rem;">SKU: {{ sku }}</span>
          </div>
          
          <h1 class="serif-font text-dark fw-bold mb-3 fs-2" style="line-height: 1.25;">{{ product.title }}</h1>
          
          <div class="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom border-light">
            <div class="text-warning">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <span class="text-dark fw-semibold" style="font-size: 0.85rem;">4.8</span>
            <span class="text-secondary" style="font-size: 0.85rem;">(124 Đánh giá)</span>
          </div>
          
          <div class="text-dark fw-bold mb-4 fs-3">{{ formatVND(product.price) }}</div>
          
          <p class="text-muted mb-4 pb-2" style="font-size: 0.95rem; line-height: 1.7;">
            {{ product.subtitle || 'Trải nghiệm những bước chạy hoàn hảo cùng dòng giày thể thao ShoeSport cao cấp. Thiết kế đệm lót chuyên nghiệp, chất liệu co giãn và thoáng khí tối ưu, đem lại phong cách vượt trội trên mọi cung đường.' }}
          </p>
          
          <!-- Color Selection -->
          <div class="mb-4">
            <div class="form-label">Màu sắc: <strong>{{ selectedColor }}</strong></div>
            <div class="d-flex gap-3 pt-1">
              <div 
                class="color-option-btn" 
                :class="{ active: selectedColor === 'Đen nhám' }" 
                style="background-color: #1a1a1a;" 
                @click="selectedColor = 'Đen nhám'"
              ></div>
              <div 
                class="color-option-btn" 
                :class="{ active: selectedColor === 'Trắng bạc' }" 
                style="background-color: #e5e5e5;" 
                @click="selectedColor = 'Trắng bạc'"
              ></div>
              <div 
                class="color-option-btn" 
                :class="{ active: selectedColor === 'Xanh navy' }" 
                style="background-color: #1a3050;" 
                @click="selectedColor = 'Xanh navy'"
              ></div>
            </div>
          </div>

          <!-- Size Selection -->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <div class="form-label mb-0">Kích cỡ: <strong>{{ selectedSize }}</strong></div>
              <button 
                type="button" 
                class="btn btn-link text-primary-green p-0 text-decoration-none fw-semibold" 
                style="font-size: 0.85rem;" 
                data-bs-toggle="modal" 
                data-bs-target="#sizeGuideModal"
              >
                <i class="bi bi-info-circle me-1"></i> Hướng dẫn chọn size
              </button>
            </div>
            <div class="d-flex gap-2 pt-1 flex-wrap">
              <button 
                type="button" 
                class="btn size-option-btn" 
                v-for="sz in ['39', '40', '41', '42', '43', '44']" 
                :key="sz"
                :class="{ active: selectedSize === sz }"
                @click="selectedSize = sz"
              >
                {{ sz }}
              </button>
            </div>
          </div>

          <!-- Quantity Selection -->
          <div class="mb-4">
            <div class="form-label">Số lượng</div>
            <div class="qty-selector mt-1">
              <button type="button" class="qty-btn" @click="updateQty(-1)">-</button>
              <input type="text" class="qty-input" :value="quantity" readonly>
              <button type="button" class="qty-btn" @click="updateQty(1)">+</button>
            </div>
          </div>

          <!-- Buy buttons -->
          <div class="d-flex gap-3 mb-5 border-bottom border-light pb-4">
            <button class="btn btn-outline-green flex-grow-1 py-3" style="border-radius: 12px;" @click="addToCart(false)">
              <i class="bi bi-cart3 me-2"></i> Thêm vào giỏ
            </button>
            <button class="btn btn-primary-green flex-grow-1 py-3 d-flex align-items-center justify-content-center" style="border-radius: 12px;" @click="addToCart(true)">
              Mua ngay
            </button>
          </div>

          <!-- Value propositions -->
          <div class="value-props-box">
            <div class="value-prop-item">
              <div class="value-prop-icon"><i class="bi bi-truck"></i></div>
              <div class="value-prop-text">Miễn phí giao hàng cao cấp cho đơn hàng trên 2.000.000 ₫</div>
            </div>
            <div class="value-prop-item">
              <div class="value-prop-icon"><i class="bi bi-shield-check"></i></div>
              <div class="value-prop-text">Bao gồm bảo hành toàn cầu 2 năm</div>
            </div>
            <div class="value-prop-item">
              <div class="value-prop-icon"><i class="bi bi-arrow-counterclockwise"></i></div>
              <div class="value-prop-text">Đảm bảo hoàn tiền trong 30 ngày</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews and Specs Tabs -->
      <div class="border-bottom border-light mb-4 d-flex">
        <button class="detail-tab" :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">
          Đánh giá của khách hàng
        </button>
        <button class="detail-tab" :class="{ active: activeTab === 'specs' }" @click="activeTab = 'specs'">
          Thông số kỹ thuật
        </button>
      </div>

      <!-- Reviews Content -->
      <div v-if="activeTab === 'reviews'" class="mb-5">
        <div class="row g-5">
          <div class="col-md-4">
            <div class="bg-white border rounded-4 p-4 text-center">
              <div class="serif-font text-dark fw-bold mb-1" style="font-size: 3.5rem;">4.8</div>
              <div class="text-warning mb-2 fs-5">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <div class="text-muted mb-4" style="font-size: 0.85rem;">Dựa trên 124 đánh giá</div>
              <button class="btn btn-outline-green w-100 py-2.5" style="border-radius: 8px;" @click="writeReview">Viết đánh giá</button>
            </div>
          </div>

          <div class="col-md-8">
            <div class="review-item">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="review-author-avatar">JD</div>
                  <div>
                    <div class="text-dark fw-bold" style="font-size: 0.9rem;">John Doe</div>
                    <span class="badge" style="background-color: #E6F4EA; color: #137333; font-size: 0.7rem;">
                      <i class="bi bi-patch-check"></i> Đã mua hàng
                    </span>
                  </div>
                </div>
                <span class="text-muted" style="font-size: 0.8rem;">2 ngày trước</span>
              </div>
              <div class="text-warning mb-2" style="font-size: 0.8rem;">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <h4 class="text-dark fw-semibold mb-2" style="font-size: 0.95rem;">Đệm giày rất êm ái</h4>
              <p class="text-muted mb-0" style="font-size: 0.9rem; line-height: 1.6;">
                Tôi sử dụng sản phẩm hàng ngày. Đế đệm nâng đỡ êm ái cho cảm giác hoàn trả năng lượng rất tốt. Form ôm chân vừa vặn, chạy quãng đường dài không hề đau chân.
              </p>
            </div>

            <div class="review-item">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="review-author-avatar">SM</div>
                  <div>
                    <div class="text-dark fw-bold" style="font-size: 0.9rem;">Sarah Miller</div>
                    <span class="badge" style="background-color: #E6F4EA; color: #137333; font-size: 0.7rem;">
                      <i class="bi bi-patch-check"></i> Đã mua hàng
                    </span>
                  </div>
                </div>
                <span class="text-muted" style="font-size: 0.8rem;">1 tuần trước</span>
              </div>
              <div class="text-warning mb-2" style="font-size: 0.8rem;">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star"></i>
              </div>
              <h4 class="text-dark fw-semibold mb-2" style="font-size: 0.95rem;">Rất đẹp và thoáng khí</h4>
              <p class="text-muted mb-0" style="font-size: 0.9rem; line-height: 1.6;">
                Chất liệu cực kỳ mát chân kể cả khi tập trong thời tiết nóng. Điểm cộng lớn là hỗ trợ cổ chân tốt, dây giày co giãn tốt, tổng quan thì đây là đôi giày hoàn hảo nhất tôi từng sở hữu.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Specs Content -->
      <div v-else class="mb-5">
        <div class="bg-white border rounded-4 p-4">
          <table class="table table-striped mb-0" style="font-size: 0.9rem;">
            <tbody>
              <tr>
                <td class="fw-semibold text-dark" width="220">Thương hiệu</td>
                <td class="text-muted">{{ product.brand || 'ShoeSport' }}</td>
              </tr>
              <tr>
                <td class="fw-semibold text-dark">Trọng lượng</td>
                <td class="text-muted">285 gram (size 42)</td>
              </tr>
              <tr>
                <td class="fw-semibold text-dark">Độ dốc gót-mũi (Drop)</td>
                <td class="text-muted">10 mm</td>
              </tr>
              <tr>
                <td class="fw-semibold text-dark">Bộ đệm (Midsole)</td>
                <td class="text-muted">React Foam & 2x Zoom Air Units (Gót & Mũi)</td>
              </tr>
              <tr>
                <td class="fw-semibold text-dark">Chất liệu thân (Upper)</td>
                <td class="text-muted">Lưới kỹ thuật thoáng khí Engineered Mesh</td>
              </tr>
              <tr>
                <td class="fw-semibold text-dark">Đế ngoài (Outsole)</td>
                <td class="text-muted">Cao su gai bám chống trượt hoa văn Waffle</td>
              </tr>
              <tr>
                <td class="fw-semibold text-dark">Mục đích sử dụng</td>
                <td class="text-muted">Chạy bộ hàng ngày, tập gym, marathon đường trường</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Related Products Section -->
      <section class="py-4 border-top border-light mt-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="serif-font fs-3 text-dark fw-bold mb-0">Bạn cũng có thể thích</h3>
          <router-link to="/shop" class="text-primary-green fw-semibold text-decoration-none" style="font-size: 0.85rem;">Xem tất cả</router-link>
        </div>
        
        <div class="row g-4" v-if="relatedProducts.length > 0">
          <div class="col-6 col-lg-3" v-for="rel in relatedProducts" :key="rel.id">
            <div class="product-card" @click="viewProduct(rel.id)" style="cursor: pointer;">
              <div class="product-image-wrapper">
                <img :src="rel.image" class="product-image" :alt="rel.title">
              </div>
              <div class="product-info p-3">
                <div class="text-secondary mb-1" style="font-size: 0.75rem;">{{ rel.brand }}</div>
                <h4 class="product-title fs-6 mb-2 text-truncate">{{ rel.title }}</h4>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="product-price fs-6" style="color: var(--primary-green); font-weight: bold;">{{ formatVND(rel.price) }}</div>
                  <span style="font-size: 0.75rem;"><i class="bi bi-star-fill text-warning"></i> 4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-else class="text-center py-5">
      <h3 class="text-danger">Không tìm thấy sản phẩm này!</h3>
      <router-link to="/shop" class="btn btn-primary-green mt-3">Quay lại cửa hàng</router-link>
    </div>

    <!-- Size Guide Modal -->
    <div class="modal fade" id="sizeGuideModal" tabindex="-1" aria-labelledby="sizeGuideModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 20px; background-color: white;">
          <div class="modal-header border-0 pb-0 pt-4 px-4 d-flex justify-content-between align-items-center">
            <h3 class="modal-title serif-font fw-bold text-dark fs-4" id="sizeGuideModalLabel">
              <i class="bi bi-rulers text-primary-green me-2"></i> Hướng dẫn chọn Size giày
            </h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted mb-4" style="font-size: 0.9rem;">
              Để chọn được size giày ShoeSport phù hợp nhất, vui lòng đo chiều dài bàn chân của bạn và đối chiếu với bảng kích cỡ tiêu chuẩn bên dưới.
            </p>
            
            <div class="table-responsive mb-4">
              <table class="table table-bordered table-striped text-center align-middle" style="font-size: 0.85rem;">
                <thead style="background-color: var(--primary-green-light); color: var(--primary-green); font-weight: 700;">
                  <tr>
                    <th class="py-2.5">EU Size</th>
                    <th>39</th>
                    <th>40</th>
                    <th>41</th>
                    <th>42</th>
                    <th>43</th>
                    <th>44</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fw-semibold text-dark py-2.5">US Size</td>
                    <td>6.5</td>
                    <td>7.5</td>
                    <td>8.5</td>
                    <td>9.5</td>
                    <td>10.5</td>
                    <td>11.5</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold text-dark py-2.5">UK Size</td>
                    <td>5.5</td>
                    <td>6.5</td>
                    <td>7.5</td>
                    <td>8.5</td>
                    <td>9.5</td>
                    <td>10.5</td>
                    <td>11.5</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold text-dark py-2.5">Chiều dài (cm)</td>
                    <td class="fw-bold text-primary-green">24.5</td>
                    <td class="fw-bold text-primary-green">25.0</td>
                    <td class="fw-bold text-primary-green">26.0</td>
                    <td class="fw-bold text-primary-green">27.0</td>
                    <td class="fw-bold text-primary-green">28.0</td>
                    <td class="fw-bold text-primary-green">29.0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-light p-3 rounded-3 mb-2 border border-light">
              <h5 class="text-dark fw-bold mb-2 fs-6"><i class="bi bi-info-circle-fill text-primary-green me-1"></i> Mẹo đo chân chính xác:</h5>
              <ul class="text-muted mb-0 ps-3" style="font-size: 0.85rem; line-height: 1.6;">
                <li>Đo chiều dài từ đầu ngón chân cái đến điểm xa nhất của gót chân.</li>
                <li>Nên đo chân vào cuối ngày khi chân đạt kích thước lớn nhất.</li>
                <li>Nếu bàn chân của bạn <strong>bè ngang</strong> hoặc <strong>mu bàn chân dày</strong>, hãy chọn tăng lên <strong>0.5 đến 1 size</strong> để thoải mái nhất.</li>
              </ul>
            </div>
          </div>
          <div class="modal-footer border-0 pt-0 pb-4 px-4">
            <button type="button" class="btn btn-primary-green px-4 py-2" style="border-radius: 8px;" data-bs-dismiss="modal">Đồng ý</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchProducts, fetchProductById, formatVND } from '../services/api';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const product = ref(null);
const activeImage = ref('');
const selectedColor = ref('Đen nhám');
const selectedSize = ref('41');
const quantity = ref(1);
const activeTab = ref('reviews');
const allProductsList = ref([]);

const isOutOfStock = computed(() => {
  if (!product.value) return true;
  return product.value.stock === 0 || product.value.status === 'Hết hàng';
});

const sku = computed(() => {
  if (!product.value) return '';
  const cleanedTitle = product.value.title.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return `${(product.value.brand || 'SS').substring(0,2).toUpperCase()}-${cleanedTitle.substring(0,8)}-2026`;
});

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return allProductsList.value
    .filter(p => String(p.id) !== String(product.value.id))
    .slice(0, 4);
});

const loadProductDetails = async () => {
  loading.value = true;
  const productId = route.params.id;
  try {
    const [fetchedProd, allProds] = await Promise.all([
      fetchProductById(productId),
      fetchProducts()
    ]);
    product.value = fetchedProd;
    allProductsList.value = allProds;
    if (product.value) {
      activeImage.value = product.value.image;
      selectedColor.value = 'Đen nhám';
      selectedSize.value = '41';
      quantity.value = 1;
      document.title = `ShoeSport — ${product.value.title}`;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const updateQty = (change) => {
  let next = quantity.value + change;
  if (next < 1) next = 1;
  quantity.value = next;
};

const addToCart = (buyNow = false) => {
  if (isOutOfStock.value) {
    alert('Sản phẩm đã hết hàng!');
    return;
  }
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // Create unique cart item with size & color
  const cartItem = {
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
    image: product.value.image,
    brand: product.value.brand,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value
  };

  // Find if exact same product + color + size exists in cart
  const index = cart.findIndex(
    item => String(item.id) === String(cartItem.id) && 
    item.size === cartItem.size && 
    item.color === cartItem.color
  );

  if (index !== -1) {
    cart[index].quantity += quantity.value;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Trigger update event
  window.dispatchEvent(new Event('cart-updated'));
  
  if (buyNow) {
    router.push('/checkout');
  } else {
    alert(`Đã thêm ${quantity.value}x "${product.value.title}" vào giỏ hàng thành công!`);
  }
};

const viewProduct = (id) => {
  router.push(`/product/${id}`);
};

const writeReview = () => {
  alert('Cảm ơn ý kiến của bạn! Form đánh giá đang được mở.');
};

watch(() => route.params.id, loadProductDetails);

onMounted(() => {
  loadProductDetails();
});
</script>

<style scoped>
.size-option-btn {
  min-width: 46px;
  height: 46px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid var(--border-color);
  background-color: white;
  color: var(--text-dark);
  transition: all 0.2s ease;
}
.size-option-btn:hover {
  border-color: var(--primary-green);
  background-color: var(--primary-green-light);
  color: var(--primary-green);
}
.size-option-btn.active {
  border-color: var(--primary-green) !important;
  background-color: var(--primary-green) !important;
  color: white !important;
  box-shadow: 0 4px 10px rgba(74, 124, 89, 0.15);
}
</style>
