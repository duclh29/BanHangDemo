<template>
  <div class="container py-5">
    <div class="row g-5">
      <!-- Left Column: Form Fields -->
      <div class="col-lg-7">
        <!-- Form to place order -->
        <form @submit.prevent="placeOrder">

          <!-- Card 1: Contact Info -->
          <div class="checkout-card shadow-sm">
            <h3 class="checkout-card-title serif-font text-dark fs-5 fw-bold">
              <i class="bi bi-person-badge me-2"></i> Thông tin liên hệ
            </h3>
            <div class="mb-3">
              <label for="email" class="form-label">Địa chỉ Email</label>
              <input type="email" class="form-control" id="email" v-model="customerForm.email"
                placeholder="ban@example.com" required>
            </div>
            <div class="form-check pt-2">
              <input class="form-check-input" type="checkbox" id="newsletters" v-model="customerForm.newsletters">
              <label class="form-check-label text-secondary" for="newsletters" style="font-size: 0.85rem;">
                Gửi email cho tôi về tin tức và ưu đãi
              </label>
            </div>
          </div>

          <!-- Card 2: Shipping Address -->
          <div class="checkout-card shadow-sm">
            <h3 class="checkout-card-title serif-font text-dark fs-5 fw-bold">
              <i class="bi bi-truck me-2"></i> Địa chỉ giao hàng
            </h3>

            <div class="mb-3">
              <label for="country" class="form-label">Quốc gia / Khu vực</label>
              <select class="form-select" id="country" v-model="customerForm.country">
                <option value="Việt Nam">Việt Nam</option>
                <option value="Singapore">Singapore</option>
                <option value="Nhật Bản">Nhật Bản</option>
                <option value="Hoa Kỳ">Hoa Kỳ</option>
              </select>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label for="firstName" class="form-label">Tên</label>
                <input type="text" class="form-control" id="firstName" v-model="customerForm.firstName"
                  placeholder="Nhập tên" required>
              </div>
              <div class="col-md-6">
                <label for="lastName" class="form-label">Họ</label>
                <input type="text" class="form-control" id="lastName" v-model="customerForm.lastName"
                  placeholder="Nhập họ" required>
              </div>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">Địa chỉ</label>
              <input type="text" class="form-control" id="address" v-model="customerForm.address"
                placeholder="Số nhà, đường, phường/xã" required>
            </div>

            <div class="row g-3">
              <div class="col-md-6">
                <label for="city" class="form-label">Thành phố / Tỉnh</label>
                <input type="text" class="form-control" id="city" v-model="customerForm.city"
                  placeholder="Nhập thành phố" required>
              </div>
              <div class="col-md-6">
                <label for="zipCode" class="form-label">Mã bưu chính</label>
                <input type="text" class="form-control" id="zipCode" v-model="customerForm.zipCode"
                  placeholder="Nhập mã">
              </div>
            </div>
          </div>

          <!-- Card 3: Payment Method -->
          <div class="checkout-card shadow-sm">
            <h3 class="checkout-card-title serif-font text-dark fs-5 fw-bold">
              <i class="bi bi-credit-card-2-front me-2"></i> Phương thức thanh toán
            </h3>

            <!-- Option 1: Cash on Delivery (COD) -->
            <div class="payment-option" :class="{ active: paymentMethod === 'cod' }" @click="paymentMethod = 'cod'">
              <div class="payment-option-header">
                <div class="d-flex align-items-center gap-2">
                  <input class="form-check-input" type="radio" name="paymentRadio" id="paymentRadioCOD"
                    :checked="paymentMethod === 'cod'">
                  <label class="form-check-label text-dark fw-semibold" style="font-size: 0.9rem;"
                    for="paymentRadioCOD">
                    Tiền mặt khi nhận hàng (COD)
                  </label>
                </div>
                <div class="text-secondary fs-5">
                  <i class="bi bi-cash-stack text-success"></i>
                </div>
              </div>

              <!-- Collapsible COD Details -->
              <div class="payment-option-details">
                <div class="payment-inner-box bg-light border-0">
                  <p class="text-muted mb-0" style="font-size: 0.85rem; line-height: 1.5;">
                    <i class="bi bi-info-circle-fill text-primary me-1"></i>
                    Bạn sẽ thanh toán số tiền <strong>{{ formatVND(total) }}</strong> bằng tiền mặt cho nhân viên giao
                    hàng khi nhận được sản phẩm ShoeSport của mình.
                  </p>
                </div>
              </div>
            </div>

            <!-- Option 2: Bank Transfer & MoMo Wallet QR Code -->
            <div class="payment-option" :class="{ active: paymentMethod === 'momo' }" @click="paymentMethod = 'momo'">
              <div class="payment-option-header">
                <div class="d-flex align-items-center gap-2">
                  <input class="form-check-input" type="radio" name="paymentRadio" id="paymentRadioMomo"
                    :checked="paymentMethod === 'momo'">
                  <label class="form-check-label text-dark fw-semibold" style="font-size: 0.9rem;"
                    for="paymentRadioMomo">
                    Chuyển khoản Ngân hàng / Quét mã MoMo (VietQR)
                  </label>
                </div>
                <div class="d-flex align-items-center gap-1">
                  <span class="badge bg-danger text-white rounded px-1.5 py-0.5" style="font-size: 0.65rem;">MoMo</span>
                  <span class="badge bg-primary text-white rounded px-1.5 py-0.5"
                    style="font-size: 0.65rem;">VietQR</span>
                </div>
              </div>

              <!-- Dynamic QR Code Payment details -->
              <div class="payment-option-details">
                <div class="payment-inner-box">
                  <div class="row align-items-center g-3">
                    <div class="col-md-5 text-center">
                      <div class="p-2 border rounded bg-white shadow-xs d-inline-block">
                        <!-- VietQR Image API dynamically loaded with current invoice total and reference memo -->
                        <img
                          :src="`https://api.vietqr.io/image/970422-0987654321-y7iP60T.jpg?accountName=CONG%20TY%20SHOESPORT%20VIET%20NAM&amount=${total}&addInfo=SHOESPORT%20ORDER`"
                          alt="Mã QR thanh toán MoMo / Ngân hàng" class="img-fluid"
                          style="max-width: 160px; object-fit: contain;">
                      </div>
                      <div class="mt-2 text-muted fw-semibold" style="font-size: 0.75rem;">
                        <i class="bi bi-qr-code-scan text-danger me-1"></i> Quét mã để trả tiền
                      </div>
                    </div>

                    <div class="col-md-7">
                      <h5 class="fw-bold text-dark fs-6 mb-2">Thông tin tài khoản nhận:</h5>
                      <table class="table table-sm table-borderless mb-0 text-dark" style="font-size: 0.8rem;">
                        <tbody>
                          <tr>
                            <td class="text-secondary p-0 pb-1" style="width: 100px;">Ngân hàng:</td>
                            <td class="fw-semibold p-0 pb-1">MB Bank (Ví điện tử MoMo)</td>
                          </tr>
                          <tr>
                            <td class="text-secondary p-0 pb-1">Số tài khoản:</td>
                            <td class="fw-bold text-primary-green p-0 pb-1">0987 654 321</td>
                          </tr>
                          <tr>
                            <td class="text-secondary p-0 pb-1">Chủ tài khoản:</td>
                            <td class="fw-semibold text-uppercase p-0 pb-1">CONG TY SHOESPORT VIET NAM</td>
                          </tr>
                          <tr>
                            <td class="text-secondary p-0 pb-1">Số tiền:</td>
                            <td class="fw-extrabold text-danger p-0 pb-1 fs-6">{{ formatVND(total) }}</td>
                          </tr>
                          <tr>
                            <td class="text-secondary p-0">Nội dung CK:</td>
                            <td class="fw-semibold text-dark p-0">SHOESPORT ORDER</td>
                          </tr>
                        </tbody>
                      </table>

                      <div class="alert alert-warning py-1.5 px-2 mt-3 mb-0"
                        style="font-size: 0.7rem; border-radius: 8px;">
                        <i class="bi bi-lightning-fill text-warning me-1"></i>
                        Giao dịch được xử lý tự động và kích hoạt giao hàng tức thì ngay sau khi chuyển tiền thành công!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Checkout actions -->
          <div class="mt-4 d-flex justify-content-between align-items-center">
            <router-link to="/shop" class="text-primary-green fw-semibold text-decoration-none">
              <i class="bi bi-arrow-left me-1"></i> Quay lại Cửa hàng
            </router-link>
            <button type="submit"
              class="btn btn-primary-green px-5 py-3 d-flex align-items-center justify-content-center gap-2 shadow-sm"
              style="border-radius: 12px;" :disabled="cartItems.length === 0">
              <i class="bi bi-shield-lock-fill"></i> Đặt hàng ngay
            </button>
          </div>

        </form>
      </div>

      <!-- Right Column: Order Summary -->
      <div class="col-lg-5">
        <div class="summary-card shadow-sm bg-white">
          <h3 class="serif-font mb-4 text-dark fs-4 fw-bold">Tóm tắt đơn hàng</h3>

          <!-- Item List -->
          <div class="checkout-items-list">
            <div v-if="cartItems.length === 0" class="text-center py-4 text-muted">
              <i class="bi bi-cart-x fs-2 mb-2 d-block"></i>
              Giỏ hàng đang trống.
            </div>

            <!-- Loop -->
            <div v-else v-for="item in groupedCartItems" :key="item.key"
              class="checkout-item d-flex gap-3 mb-3 pb-3 border-bottom border-light">
              <img :src="item.image" class="checkout-item-img" :alt="item.title"
                style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
              <div class="checkout-item-info flex-grow-1">
                <h4 class="checkout-item-title text-dark fw-bold mb-1" style="font-size: 0.9rem; line-height: 1.3;">
                  {{ item.title }}
                </h4>
                <p class="checkout-item-subtitle mb-0 text-muted" style="font-size: 0.75rem;">
                  Size: {{ item.size }} &bull; Màu: {{ item.color }} &bull; SL: {{ item.quantity }}
                </p>
                <button type="button" @click="removeItem(item)"
                  class="btn btn-link text-danger p-0 mt-1 text-decoration-none" style="font-size: 0.75rem;">
                  <i class="bi bi-trash"></i> Xóa
                </button>
              </div>
              <div class="checkout-item-price text-dark fw-bold" style="font-size: 0.9rem;">
                {{ formatVND(item.price * item.quantity) }}
              </div>
            </div>
          </div>

          <!-- Voucher code -->
          <div class="d-flex gap-2 my-4">
            <input type="text" class="form-control" v-model="voucherCode" placeholder="Nhập mã giảm giá"
              style="background-color: #FAF8F5;">
            <button type="button" class="btn text-dark font-weight-bold"
              style="background-color: var(--border-color); border-radius: 8px; font-size: 0.85rem; padding: 0.75rem 1.25rem;"
              @click="applyVoucher">
              Áp dụng
            </button>
          </div>

          <!-- Price Calculations -->
          <div class="border-bottom border-light pb-3 mb-3">
            <div class="d-flex justify-content-between mb-2">
              <span class="text-secondary" style="font-size: 0.9rem;">Tạm tính</span>
              <span class="text-dark fw-semibold" style="font-size: 0.9rem;">{{ formatVND(subtotal) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2" v-if="discount > 0">
              <span class="text-danger" style="font-size: 0.9rem;">Mã giảm giá ({{ discountPercent }}%)</span>
              <span class="text-danger fw-semibold" style="font-size: 0.9rem;">- {{ formatVND(discount) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-secondary" style="font-size: 0.9rem;">Phí giao hàng</span>
              <span class="text-primary-green fw-semibold" style="font-size: 0.9rem;">
                {{ shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee) }}
              </span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-secondary" style="font-size: 0.9rem;">Thuế VAT ước tính (10%)</span>
              <span class="text-dark fw-semibold" style="font-size: 0.9rem;">{{ formatVND(tax) }}</span>
            </div>
          </div>

          <!-- Total -->
          <div class="d-flex justify-content-between align-items-baseline mb-4">
            <span class="text-dark fw-bold" style="font-size: 1.1rem;">Tổng cộng</span>
            <div class="text-end">
              <span class="text-secondary me-1" style="font-size: 0.8rem; font-weight: 500;">VND</span>
              <span class="text-dark fw-extrabold" style="font-size: 1.6rem; font-weight: 800;">
                {{ formatVND(total) }}
              </span>
            </div>
          </div>

          <div class="alert alert-info py-2" style="font-size: 0.8rem; border-radius: 8px;">
            <i class="bi bi-tag-fill me-1 text-danger"></i>
            <span>Mã giảm giá tốt: <strong>SHOESPORT10</strong> (Giảm 10% tổng đơn hàng).</span>
          </div>

          <p class="text-center text-muted mb-0" style="font-size: 0.75rem; line-height: 1.5;">
            Bằng việc đặt hàng, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi.
          </p>
        </div>
      </div>
    </div>

    <!-- Success Modal Popup -->
    <div class="modal fade" id="successOrderModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 20px; background-color: white;">
          <div class="modal-body text-center p-5">
            <div
              class="d-inline-flex align-items-center justify-content-center bg-primary-green-light text-primary-green rounded-circle mb-4"
              style="width: 80px; height: 80px;">
              <i class="bi bi-check-lg" style="font-size: 2.5rem;"></i>
            </div>
            <h3 class="serif-font fw-bold text-dark mb-2 fs-3">Đặt hàng thành công!</h3>
            <p class="text-muted mb-4" style="font-size: 0.9rem;">
              Cảm ơn bạn đã lựa chọn ShoeSport. Đơn hàng của bạn đã được tiếp nhận và lưu thành công vào cơ sở dữ liệu
              quản trị của hệ thống!
            </p>
            <button @click="dismissSuccessModal" class="btn btn-primary-green w-100 py-2.5" style="border-radius: 8px;">
              Quay lại Trang chủ Cửa hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiCreateOrder, apiCreateInvoice, formatVND } from '../services/api';

const router = useRouter();

const cartItems = ref([]);
const paymentMethod = ref('cod');
const voucherCode = ref('');
const discountPercent = ref(0);

const customerForm = ref({
  email: 'ban@example.com',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zipCode: '',
  country: 'Việt Nam',
  newsletters: true
});

const cardForm = ref({
  number: '',
  expiry: '',
  cvc: '',
  name: ''
});

const loadCart = () => {
  const stored = localStorage.getItem('cart');
  cartItems.value = stored ? JSON.parse(stored) : [];
};

// Group items with same size & color
const groupedCartItems = computed(() => {
  const map = {};
  cartItems.value.forEach(item => {
    const size = item.size || '41';
    const color = item.color || 'Đen nhám';
    const key = `${item.id}-${size}-${color}`;
    if (!map[key]) {
      map[key] = {
        ...item,
        key,
        size,
        color,
        quantity: 0
      };
    }
    map[key].quantity += (item.quantity || 1);
  });
  return Object.values(map);
});

const subtotal = computed(() => {
  return groupedCartItems.value.reduce((acc, curr) => {
    return acc + (curr.price * curr.quantity);
  }, 0);
});

const discount = computed(() => {
  return Math.round(subtotal.value * (discountPercent.value / 100));
});

const shippingFee = computed(() => {
  if (subtotal.value === 0) return 0;
  return subtotal.value > 2000000 ? 0 : 50000;
});

const tax = computed(() => {
  return Math.round(subtotal.value * 0.1);
});

const total = computed(() => {
  return subtotal.value + shippingFee.value + tax.value - discount.value;
});

const removeItem = (item) => {
  cartItems.value = cartItems.value.filter(
    curr => !(String(curr.id) === String(item.id) && curr.size === item.size && curr.color === item.color)
  );
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
  window.dispatchEvent(new Event('cart-updated'));
};

const applyVoucher = () => {
  const code = voucherCode.value.trim().toUpperCase();
  if (!code) {
    alert('Vui lòng nhập mã giảm giá!');
    return;
  }
  if (code === 'SHOESPORT10') {
    discountPercent.value = 10;
    alert('Áp dụng mã giảm giá thành công! Bạn nhận được chiết khấu 10%.');
  } else {
    alert('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    discountPercent.value = 0;
  }
};

const placeOrder = async () => {
  if (cartItems.value.length === 0) return;

  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const fullName = `${customerForm.value.firstName} ${customerForm.value.lastName}`;

  const newOrder = {
    id: orderId,
    customerName: fullName,
    email: customerForm.value.email,
    address: `${customerForm.value.address}, ${customerForm.value.city}`,
    date: new Date().toLocaleDateString('vi-VN'),
    items: groupedCartItems.value.map(item => ({
      title: item.title,
      price: item.price,
      image: item.image,
      size: item.size,
      color: item.color,
      quantity: item.quantity
    })),
    total: total.value,
    status: 'Chờ xử lý'
  };

  try {
    // 1. Write order to MockAPI (or local array)
    const orderCreated = await apiCreateOrder(newOrder);

    // 2. Automatically generate corresponding invoice
    const newInvoice = {
      id: 'INV-' + orderId.substring(4),
      orderId: orderId,
      customerName: fullName,
      email: customerForm.value.email,
      date: new Date().toLocaleDateString('vi-VN'),
      paymentMethod: paymentMethod.value === 'cod' ? 'Tiền mặt (COD)' : 'Chuyển khoản / MoMo (QR)',
      total: total.value,
      status: paymentMethod.value === 'cod' ? 'Chưa thanh toán' : 'Đã thanh toán'
    };
    await apiCreateInvoice(newInvoice);

    // Success popup
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cart-updated'));

    const modalEl = document.getElementById('successOrderModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    } else {
      alert('Đặt hàng thành công!');
      router.push('/shop');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Có lỗi xảy ra khi lưu đơn hàng. Vui lòng thử lại!');
  }
};

const dismissSuccessModal = () => {
  // Hide modal manually using bootstrap API
  const modalEl = document.getElementById('successOrderModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
  router.push('/shop');
};

onMounted(() => {
  loadCart();
});
</script>

<style scoped>
.payment-option-details {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
}

.payment-option.active .payment-option-details {
  max-height: 500px;
  opacity: 1;
  margin-top: 1.2rem;
}

.payment-inner-box {
  border: 1px solid var(--primary-green);
  background-color: white;
  border-radius: 10px;
  padding: 1.25rem;
}
</style>
