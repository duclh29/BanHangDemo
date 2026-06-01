<template>
  <div>
    <!-- Controls Row -->
    <div class="admin-card-container mb-4 shadow-sm">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <!-- Search -->
        <div class="search-input-wrapper m-0 flex-grow-1" style="max-width: 500px;">
          <i class="bi bi-search"></i>
          <input type="text" class="form-control search-input" placeholder="Tìm theo tên, email hoặc số điện thoại..."
            v-model="searchQuery">
        </div>

        <!-- Add Button -->
        <button class="btn btn-primary-green px-4 py-2.5 d-flex align-items-center gap-2" style="border-radius: 8px;"
          @click="openAddModal">
          <i class="bi bi-plus-lg"></i> Thêm khách hàng
        </button>
      </div>
    </div>

    <!-- Customers Table -->
    <div class="admin-card-container shadow-sm mb-4">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Đang tải...</span>
        </div>
        <p class="text-muted mt-2">Đang tải danh sách khách hàng...</p>
      </div>

      <div v-else class="table-responsive">
        <table class="table admin-table mb-0">
          <thead>
            <tr>
              <th>Khách Hàng</th>
              <th>Số Điện Thoại</th>
              <th>Địa Chỉ</th>
              <th>Hạng Thành Viên</th>
              <th class="text-end">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredCustomers.length === 0">
              <td colspan="5" class="text-center py-4 text-muted">Không tìm thấy khách hàng nào.</td>
            </tr>
            <!-- Loop -->
            <tr v-else v-for="cust in filteredCustomers" :key="cust.id">
              <td>
                <div class="fw-bold text-dark">{{ cust.name }}</div>
                <div class="text-muted" style="font-size: 0.75rem;">{{ cust.email || 'Chưa cung cấp email' }}</div>
              </td>
              <td>{{ cust.phone || 'Chưa có SĐT' }}</td>
              <td>{{ cust.address || 'Chưa có địa chỉ' }}</td>
              <td>
                <span class="badge py-1 px-2.5 rounded" :class="getRankBadgeClass(cust.rank)">
                  {{ cust.rank || 'Bronze' }}
                </span>
              </td>
              <td class="text-end">
                <div class="d-inline-flex gap-2">
                  <button
                    class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="Chỉnh sửa" @click="openEditModal(cust)">
                    <i class="bi bi-pencil-square" style="color: #4A7C59;"></i>
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="Xóa" @click="confirmDelete(cust)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Customer Form Modal -->
    <div class="modal fade" id="customerModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
          <div class="modal-header border-bottom border-light py-3 px-4">
            <h5 class="modal-title serif-font fw-bold text-dark fs-5">
              {{ isEditing ? 'Cập Nhật Thông Tin Khách Hàng' : 'Đăng Ký Khách Hàng Mới' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="saveCustomer">
            <div class="modal-body p-4">
              <div class="mb-3">
                <label class="form-label fw-semibold">Họ và Tên *</label>
                <input type="text" class="form-control" v-model="form.name" placeholder="Ví dụ: Nguyễn Văn A" required>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Số điện thoại</label>
                <input type="text" class="form-control" v-model="form.phone" placeholder="Ví dụ: 0987654321">
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Địa chỉ Email</label>
                <input type="email" class="form-control" v-model="form.email" placeholder="Ví dụ: nguyen@example.com">
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Địa chỉ thường trú</label>
                <input type="text" class="form-control" v-model="form.address"
                  placeholder="Số nhà, tên đường, tỉnh/thành phố">
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Hạng thành viên</label>
                <select class="form-select" v-model="form.rank">
                  <option value="Bronze">Bronze (Đồng)</option>
                  <option value="Silver">Silver (Bạc)</option>
                  <option value="Gold">Gold (Vàng)</option>
                  <option value="Platinum">Platinum (Bạch kim)</option>
                </select>
              </div>
            </div>
            <div class="modal-footer border-0 pt-0 pb-4 px-4">
              <button type="button" class="btn btn-outline-green" data-bs-dismiss="modal">Hủy bỏ</button>
              <button type="submit" class="btn btn-primary-green px-4" :disabled="saving">
                <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
                <span>Lưu lại</span>
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
import { fetchCustomers, apiCreateCustomer, apiUpdateCustomer, apiDeleteCustomer } from '../services/api';

const customers = ref([]);
const loading = ref(true);
const saving = ref(false);

const searchQuery = ref('');

const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  rank: 'Bronze'
});

const loadCustomers = async () => {
  loading.value = true;
  try {
    customers.value = await fetchCustomers();
  } catch (error) {
    console.error('Error fetching customers:', error);
  } finally {
    loading.value = false;
  }
};

const filteredCustomers = computed(() => {
  return customers.value.filter(cust => {
    return cust.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cust.email?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cust.phone?.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

const getRankBadgeClass = (rank) => {
  switch (rank) {
    case 'Platinum': return 'bg-dark text-white';
    case 'Gold': return 'bg-warning text-dark';
    case 'Silver': return 'bg-secondary text-white';
    default: return 'bg-light text-dark border';
  }
};

const openAddModal = () => {
  isEditing.value = false;
  editingId.value = null;
  form.value = {
    name: '',
    phone: '',
    email: '',
    address: '',
    rank: 'Bronze'
  };
  showModal();
};

const openEditModal = (cust) => {
  isEditing.value = true;
  editingId.value = cust.id;
  form.value = {
    name: cust.name,
    phone: cust.phone || '',
    email: cust.email || '',
    address: cust.address || '',
    rank: cust.rank || 'Bronze'
  };
  showModal();
};

const showModal = () => {
  const modalEl = document.getElementById('customerModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
};

const hideModal = () => {
  const modalEl = document.getElementById('customerModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
};

const saveCustomer = async () => {
  saving.value = true;
  try {
    if (isEditing.value) {
      await apiUpdateCustomer(editingId.value, form.value);
      alert('Cập nhật khách hàng thành công!');
    } else {
      await apiCreateCustomer(form.value);
      alert('Đăng ký khách hàng mới thành công!');
    }
    hideModal();
    await loadCustomers();
  } catch (error) {
    console.error('Error saving customer:', error);
    alert('Không thể lưu thông tin khách hàng.');
  } finally {
    saving.value = false;
  }
};

const confirmDelete = async (cust) => {
  if (confirm(`Bạn có chắc muốn xóa khách hàng "${cust.name}"?`)) {
    try {
      await apiDeleteCustomer(cust.id);
      alert('Đã xóa khách hàng thành công!');
      await loadCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Không thể xóa khách hàng này.');
    }
  }
};

onMounted(() => {
  loadCustomers();
});
</script>

<style scoped>
/* Scoped modifications */
</style>
