<template>
  <div class="row g-4">
    <!-- Left Column: Products Grid (Searchable) -->
    <div class="col-lg-7 col-xl-8">
      <div class="admin-card-container shadow-sm h-100 d-flex flex-column" style="min-height: 70vh;">
        <!-- Header -->
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
          <h3 class="serif-font fs-5 text-dark fw-bold mb-0">Quầy Hàng Sản Phẩm</h3>
          <div class="d-flex gap-2 flex-grow-1" style="max-width: 400px;">
            <div class="search-input-wrapper m-0 flex-grow-1">
              <i class="bi bi-search"></i>
              <input type="text" class="form-control search-input" placeholder="Tìm kiếm mã hoặc tên sản phẩm..."
                v-model="searchQuery">
            </div>
            <select class="form-select border-light-dark" style="width: auto;" v-model="selectedBrand">
              <option value="">Tất cả</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Puma">Puma</option>
              <option value="Fila">Fila</option>
            </select>
          </div>
        </div>

        <!-- Loader -->
        <div v-if="loading" class="text-center py-5 my-auto">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Đang tải...</span>
          </div>
          <p class="text-muted mt-2">Đang nạp danh mục sản phẩm...</p>
        </div>

        <!-- Grid -->
        <div v-else class="row g-3 overflow-y-auto pe-1" style="max-height: 60vh;">
          <div v-if="filteredProducts.length === 0" class="col-12 text-center py-5 text-muted">
            Không tìm thấy sản phẩm nào khớp bộ lọc.
          </div>
          <div v-else class="col-sm-6 col-md-4 col-xl-3" v-for="prod in filteredProducts" :key="prod.id">
            <div class="card h-100 border border-light shadow-xs pos-product-card"
              :class="{ 'opacity-50': prod.stock === 0 }" @click="addToCart(prod)"
              style="cursor: pointer; transition: all 0.2s ease-in-out; border-radius: 12px; overflow: hidden;">
              <div class="position-relative">
                <img :src="prod.image" alt="" class="w-100" style="height: 120px; object-fit: cover;">
                <span class="badge bg-dark position-absolute top-0 end-0 m-2" style="font-size: 0.7rem;">
                  {{ prod.brand }}
                </span>
                <span v-if="prod.stock === 0" class="badge bg-danger position-absolute top-0 start-0 m-2"
                  style="font-size: 0.7rem;">
                  Hết hàng
                </span>
              </div>
              <div class="p-3">
                <h5 class="fw-bold text-dark fs-6 text-truncate mb-1">{{ prod.title }}</h5>
                <div class="text-secondary mb-2" style="font-size: 0.75rem;">Kho: {{ prod.stock }} đôi</div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-success-green" style="font-size: 0.85rem;">{{ formatVND(prod.price)
                  }}</span>
                  <button type="button"
                    class="btn btn-primary-green btn-sm rounded-circle p-1 d-flex align-items-center justify-content-center"
                    style="width: 24px; height: 24px;" :disabled="prod.stock === 0">
                    <i class="bi bi-plus-lg text-white" style="font-size: 0.75rem;"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column: POS Active Order & Invoice -->
    <div class="col-lg-5 col-xl-4">
      <div class="admin-card-container shadow-sm d-flex flex-column justify-content-between"
        style="min-height: 70vh; padding: 1.5rem;">
        <div>
          <!-- Customer Selection -->
          <div class="mb-3">
            <label class="form-label fw-bold text-dark" style="font-size: 0.85rem;"><i
                class="bi bi-person-fill text-secondary"></i> Khách hàng mua tại quầy</label>
            <div class="input-group">
              <select class="form-select border-light-dark font-weight-bold" v-model="selectedCustomerId">
                <option value="guest">Khách vãng lai (Lẻ)</option>
                <option v-for="cust in customers" :key="cust.id" :value="cust.id">
                  {{ cust.name }} ({{ cust.phone || 'Thành viên' }})
                </option>
              </select>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-bottom border-light mb-3"></div>

          <!-- Register Items -->
          <h4 class="serif-font fs-6 text-dark fw-bold mb-3">Hóa Đơn Chờ Thanh Toán</h4>
          <div class="pos-cart-list overflow-y-auto pe-1 mb-4" style="max-height: 30vh; min-height: 150px;">
            <div v-if="cart.length === 0" class="text-center py-5 text-muted" style="font-size: 0.85rem;">
              <i class="bi bi-receipt-cutoff fs-2 mb-2 d-block"></i>
              Quét sản phẩm bên trái để ghi vào hóa đơn.
            </div>

            <!-- Loop -->
            <div v-else v-for="(item, index) in cart" :key="index"
              class="p-2.5 mb-2 rounded bg-light border-start border-4 border-success d-flex align-items-center justify-content-between"
              style="font-size: 0.85rem;">
              <div class="flex-grow-1 pe-2">
                <div class="fw-bold text-dark text-truncate" style="max-width: 180px;">{{ item.title }}</div>
                <div class="text-secondary d-flex flex-wrap gap-1 mt-1" style="font-size: 0.7rem;">
                  <!-- Size Select -->
                  <select v-model="item.size" class="border-0 p-0 bg-transparent text-secondary-green fw-semibold"
                    style="width: auto;">
                    <option v-for="sz in ['39', '40', '41', '42', '43', '44']" :key="sz" :value="sz">Size {{ sz }}
                    </option>
                  </select>
                  &bull;
                  <!-- Color Select -->
                  <select v-model="item.color" class="border-0 p-0 bg-transparent text-secondary-green fw-semibold"
                    style="width: auto;">
                    <option v-for="c in ['Đen', 'Trắng', 'Xám', 'Xanh']" :key="c" :value="c">{{ c }}</option>
                  </select>
                </div>
              </div>

              <!-- Quantity selector -->
              <div class="d-flex align-items-center gap-1">
                <button type="button" class="btn btn-sm btn-white border px-1.5 py-0"
                  @click="updateQty(index, -1)">-</button>
                <span class="px-1 fw-bold">{{ item.quantity }}</span>
                <button type="button" class="btn btn-sm btn-white border px-1.5 py-0"
                  @click="updateQty(index, 1)">+</button>
              </div>

              <!-- Price & delete -->
              <div class="text-end ps-2">
                <div class="fw-bold text-dark">{{ formatVND(item.price * item.quantity) }}</div>
                <button type="button" class="btn btn-link text-danger p-0 border-0" @click="removeFromCart(index)"
                  style="font-size: 0.75rem;">Xóa</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Calculations & Payments -->
        <div>
          <div class="border-top border-light pt-3 mb-3">
            <!-- Voucher/Discount code -->
            <div class="input-group input-group-sm mb-3">
              <input type="text" class="form-control" placeholder="Mã giảm giá (ví dụ: POS5)" v-model="discountCode">
              <button class="btn btn-secondary-green" type="button" @click="applyPOSDiscount">Áp dụng</button>
            </div>

            <!-- Math summary -->
            <div class="d-flex justify-content-between mb-1 text-secondary" style="font-size: 0.8rem;">
              <span>Tạm tính</span>
              <span>{{ formatVND(subtotal) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-1 text-danger" style="font-size: 0.8rem;" v-if="discount > 0">
              <span>Khấu trừ ({{ discountPercent }}%)</span>
              <span>- {{ formatVND(discount) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-1 text-secondary" style="font-size: 0.8rem;">
              <span>Thuế VAT (10%)</span>
              <span>{{ formatVND(tax) }}</span>
            </div>
            <!-- Total -->
            <div class="d-flex justify-content-between align-items-baseline mt-2 pt-2 border-top border-light">
              <span class="fw-bold text-dark">Tổng phải thu</span>
              <span class="fs-5 fw-extrabold text-success-green">{{ formatVND(total) }}</span>
            </div>
          </div>

          <!-- Checkout payment button -->
          <button type="button"
            class="btn btn-primary-green w-100 py-3 d-flex align-items-center justify-content-center gap-2"
            style="border-radius: 10px;" :disabled="cart.length === 0 || checkingOut" @click="checkoutPOS">
            <span v-if="checkingOut" class="spinner-border spinner-border-sm"></span>
            <i v-else class="bi bi-printer-fill"></i>
            <span>Thanh toán &amp; In hóa đơn</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchProducts, fetchCustomers, apiCreateOrder, apiCreateInvoice, formatVND } from '../services/api';

const products = ref([]);
const customers = ref([]);
const loading = ref(true);
const checkingOut = ref(false);

const searchQuery = ref('');
const selectedBrand = ref('');

const selectedCustomerId = ref('guest');
const cart = ref([]);

const discountCode = ref('');
const discountPercent = ref(0);

const loadPOSData = async () => {
  loading.value = true;
  try {
    const [prods, custs] = await Promise.all([
      fetchProducts(),
      fetchCustomers()
    ]);
    products.value = prods;
    customers.value = custs;
  } catch (error) {
    console.error('Error in POS load:', error);
  } finally {
    loading.value = false;
  }
};

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchSearch = p.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.subtitle?.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchBrand = !selectedBrand.value || p.brand === selectedBrand.value;
    return matchSearch && matchBrand;
  });
});

const addToCart = (product) => {
  if (product.stock === 0) {
    alert('Sản phẩm đã hết hàng!');
    return;
  }
  // Check if item already exists in counter register (same ID + default size 41 + default color Đen)
  const existing = cart.value.find(item => item.id === product.id && item.size === '41' && item.color === 'Đen');
  if (existing) {
    if (existing.quantity >= product.stock) {
      alert('Không thể thêm quá số lượng tồn kho!');
      return;
    }
    existing.quantity++;
  } else {
    cart.value.push({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      brand: product.brand,
      image: product.image,
      size: '41',
      color: 'Đen',
      quantity: 1
    });
  }
};

const updateQty = (index, change) => {
  const item = cart.value[index];
  const prod = products.value.find(p => p.id === item.id);
  const maxStock = prod ? prod.stock : 99;

  let next = item.quantity + change;
  if (next < 1) next = 1;
  if (next > maxStock) {
    alert(`Không thể chọn nhiều hơn tồn kho (${maxStock})!`);
    return;
  }
  item.quantity = next;
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
};

const subtotal = computed(() => {
  return cart.value.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
});

const discount = computed(() => {
  return Math.round(subtotal.value * (discountPercent.value / 100));
});

const tax = computed(() => {
  return Math.round(subtotal.value * 0.1);
});

const total = computed(() => {
  return subtotal.value + tax.value - discount.value;
});

const applyPOSDiscount = () => {
  const code = discountCode.value.trim().toUpperCase();
  if (code === 'POS5') {
    discountPercent.value = 5;
    alert('Áp dụng mã quầy POS5 thành công (Giảm 5%!).');
  } else {
    alert('Mã ưu đãi tại quầy không hợp lệ.');
    discountPercent.value = 0;
  }
};

const checkoutPOS = async () => {
  if (cart.value.length === 0) return;
  checkingOut.value = true;

  // Identify customer name & info
  let customerName = 'Khách mua tại quầy';
  let customerEmail = 'walkin@customer.com';
  if (selectedCustomerId.value !== 'guest') {
    const cust = customers.value.find(c => c.id === selectedCustomerId.value);
    if (cust) {
      customerName = cust.name;
      customerEmail = cust.email || 'customer@shoesport.com';
    }
  }

  const orderId = 'ORD-POS-' + Math.floor(10000 + Math.random() * 90000);

  const newOrder = {
    id: orderId,
    customerName,
    email: customerEmail,
    address: 'Bán tại quầy ShoeSport',
    date: new Date().toLocaleDateString('vi-VN'),
    items: cart.value.map(item => ({
      title: item.title,
      price: item.price,
      image: item.image,
      size: item.size,
      color: item.color,
      quantity: item.quantity
    })),
    total: total.value,
    status: 'Đã hoàn thành' // POS purchases are instant completed
  };

  const newInvoice = {
    id: 'INV-POS-' + Math.floor(10000 + Math.random() * 90000),
    orderId,
    customerName,
    email: customerEmail,
    date: new Date().toLocaleDateString('vi-VN'),
    paymentMethod: 'Tiền mặt / Thẻ tại quầy',
    total: total.value,
    status: 'Đã thanh toán'
  };

  try {
    // 1. Create order
    await apiCreateOrder(newOrder);
    // 2. Create invoice
    await apiCreateInvoice(newInvoice);

    alert(`Giao dịch thành công!\nĐã tạo đơn ${orderId} & xuất hóa đơn tại quầy.`);

    // Clear cart register
    cart.value = [];
    discountCode.value = '';
    discountPercent.value = 0;
    selectedCustomerId.value = 'guest';

    // Refresh products stock count list
    await loadPOSData();
  } catch (error) {
    console.error('POS checkout error:', error);
    alert('Gặp lỗi khi tạo hóa đơn tại quầy.');
  } finally {
    checkingOut.value = false;
  }
};

onMounted(() => {
  loadPOSData();
});
</script>

<style scoped>
.pos-product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
}
</style>
