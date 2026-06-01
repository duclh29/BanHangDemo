<template>
  <div>
    <!-- Controls Row -->
    <div class="admin-card-container mb-4 shadow-sm">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <!-- Search & Filter -->
        <div class="d-flex flex-wrap gap-2 flex-grow-1" style="max-width: 600px;">
          <div class="search-input-wrapper m-0 flex-grow-1" style="min-width: 200px;">
            <i class="bi bi-search"></i>
            <input type="text" class="form-control search-input" placeholder="Tìm kiếm sản phẩm..."
              v-model="searchQuery">
          </div>
          <select class="form-select border-light-dark font-weight-bold" style="width: auto;" v-model="selectedBrand">
            <option value="">Tất cả thương hiệu</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Fila">Fila</option>
          </select>
        </div>

        <!-- Add Button -->
        <button class="btn btn-primary-green px-4 py-2.5 d-flex align-items-center gap-2" style="border-radius: 8px;"
          @click="openAddModal">
          <i class="bi bi-plus-lg"></i> Thêm sản phẩm
        </button>
      </div>
    </div>

    <!-- Products Table -->
    <div class="admin-card-container shadow-sm mb-4">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Đang tải sản phẩm...</span>
        </div>
        <p class="text-muted mt-2">Đang nạp danh sách sản phẩm...</p>
      </div>

      <div v-else class="table-responsive">
        <table class="table admin-table mb-0">
          <thead>
            <tr>
              <th>Hình Ảnh</th>
              <th>Thương Hiệu</th>
              <th>Tên Sản Phẩm</th>
              <th>Giá Bán</th>
              <th>Số Lượng Kho</th>
              <th>Trạng Thái</th>
              <th class="text-end">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="7" class="text-center py-4 text-muted">Không tìm thấy sản phẩm nào.</td>
            </tr>
            <!-- Loop -->
            <tr v-else v-for="product in filteredProducts" :key="product.id">
              <td>
                <img :src="product.image" :alt="product.title" class="rounded border border-light"
                  style="width: 50px; height: 50px; object-fit: cover;">
              </td>
              <td>
                <span class="badge bg-light text-dark border py-1 px-2" style="font-size: 0.75rem;">
                  {{ product.brand }}
                </span>
              </td>
              <td>
                <div class="fw-bold text-dark">{{ product.title }}</div>
                <div class="text-muted" style="font-size: 0.75rem;">{{ product.subtitle }}</div>
              </td>
              <td class="fw-semibold text-dark">{{ formatVND(product.price) }}</td>
              <td>{{ product.stock }}</td>
              <td>
                <span class="badge-status rounded-pill py-1 px-2.5"
                  :class="product.stock > 0 && product.status !== 'Hết hàng' ? 'bg-success-light text-success-green' : 'bg-danger-light text-danger-red'">
                  {{ product.stock > 0 && product.status !== 'Hết hàng' ? 'Còn hàng' : 'Hết hàng' }}
                </span>
              </td>
              <td class="text-end">
                <div class="d-inline-flex gap-2">
                  <button
                    class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="Chỉnh sửa" @click="openEditModal(product)">
                    <i class="bi bi-pencil-square" style="color: #4A7C59;"></i>
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="Xóa" @click="confirmDelete(product)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Product Modal (Add & Edit) -->
    <div class="modal fade" id="productFormModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
          <div class="modal-header border-bottom border-light py-3 px-4">
            <h5 class="modal-title serif-font fw-bold text-dark fs-4">
              {{ isEditing ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <form @submit.prevent="saveProduct">
            <div class="modal-body p-4" style="max-height: 70vh; overflow-y: auto;">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Tên sản phẩm *</label>
                  <input type="text" class="form-control" v-model="form.title" placeholder="Ví dụ: Nike Air Force 1"
                    required>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Thương hiệu *</label>
                  <select class="form-select" v-model="form.brand" required>
                    <option value="" disabled>Chọn thương hiệu</option>
                    <option value="Nike">Nike</option>
                    <option value="Adidas">Adidas</option>
                    <option value="Puma">Puma</option>
                    <option value="Fila">Fila</option>
                  </select>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Mô tả ngắn / Phụ đề *</label>
                  <input type="text" class="form-control" v-model="form.subtitle"
                    placeholder="Ví dụ: Thiết kế cổ điển bền bỉ, êm chân" required>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-semibold">Đơn giá (VND) *</label>
                  <input type="number" class="form-control" v-model="form.price" min="0" placeholder="Ví dụ: 2500000"
                    required>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Số lượng tồn kho *</label>
                  <input type="number" class="form-control" v-model="form.stock" min="0" placeholder="Ví dụ: 10"
                    required>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Đường dẫn ảnh sản phẩm *</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light text-secondary"><i class="bi bi-image"></i></span>
                    <input type="url" class="form-control" v-model="form.image" placeholder="URL hình ảnh Unsplash..."
                      required>
                  </div>
                  <div class="mt-2 text-center" v-if="form.image">
                    <img :src="form.image" alt="Preview" class="rounded border p-1"
                      style="max-height: 120px; object-fit: contain;">
                  </div>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-semibold">Trạng thái</label>
                  <select class="form-select" v-model="form.status">
                    <option value="Còn hàng">Còn hàng</option>
                    <option value="Hết hàng">Hết hàng</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="modal-footer border-top border-light py-3 px-4">
              <button type="button" class="btn btn-outline-green" data-bs-dismiss="modal">Hủy bỏ</button>
              <button type="submit" class="btn btn-primary-green px-4" :disabled="saving">
                <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
                <span>Lưu thông tin</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchProducts, apiCreateProduct, apiUpdateProduct, apiDeleteProduct, formatVND } from '../services/api';

const products = ref([]);
const loading = ref(true);
const saving = ref(false);

const searchQuery = ref('');
const selectedBrand = ref('');

const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  title: '',
  brand: 'Nike',
  subtitle: '',
  price: 0,
  stock: 10,
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop',
  status: 'Còn hàng'
});

const loadProducts = async () => {
  loading.value = true;
  try {
    products.value = await fetchProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
};

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchSearch = product.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.subtitle?.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchBrand = !selectedBrand.value || product.brand === selectedBrand.value;
    return matchSearch && matchBrand;
  });
});

const openAddModal = () => {
  isEditing.value = false;
  editingId.value = null;
  form.value = {
    title: '',
    brand: 'Nike',
    subtitle: '',
    price: 2500000,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&auto=format&fit=crop',
    status: 'Còn hàng'
  };
  showModal();
};

const openEditModal = (product) => {
  isEditing.value = true;
  editingId.value = product.id;
  form.value = {
    title: product.title,
    brand: product.brand || 'Nike',
    subtitle: product.subtitle,
    price: Number(product.price),
    stock: Number(product.stock),
    image: product.image,
    status: product.stock > 0 && product.status !== 'Hết hàng' ? 'Còn hàng' : 'Hết hàng'
  };
  showModal();
};

const showModal = () => {
  const modalEl = document.getElementById('productFormModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
};

const hideModal = () => {
  const modalEl = document.getElementById('productFormModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
};

const saveProduct = async () => {
  saving.value = true;
  const payload = {
    ...form.value,
    price: Number(form.value.price),
    stock: Number(form.value.stock),
    status: form.value.stock > 0 ? form.value.status : 'Hết hàng'
  };

  try {
    if (isEditing.value) {
      await apiUpdateProduct(editingId.value, payload);
      alert('Cập nhật sản phẩm thành công!');
    } else {
      await apiCreateProduct(payload);
      alert('Thêm sản phẩm thành công!');
    }
    hideModal();
    await loadProducts();
  } catch (error) {
    console.error('Error saving product:', error);
    alert('Có lỗi xảy ra khi lưu sản phẩm.');
  } finally {
    saving.value = false;
  }
};

const confirmDelete = async (product) => {
  if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.title}"?`)) {
    try {
      await apiDeleteProduct(product.id);
      alert('Đã xóa sản phẩm thành công!');
      await loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Có lỗi xảy ra khi xóa sản phẩm.');
    }
  }
};

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.bg-success-light {
  background-color: #E6F4EA !important;
}

.text-success-green {
  color: #137333 !important;
}

.bg-danger-light {
  background-color: #FCE8E6 !important;
}

.text-danger-red {
  color: #C5221F !important;
}
</style>
