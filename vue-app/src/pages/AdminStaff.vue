<template>
  <div>
    <!-- Controls Row -->
    <div class="admin-card-container mb-4 shadow-sm">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <!-- Search -->
        <div class="search-input-wrapper m-0 flex-grow-1" style="max-width: 500px;">
          <i class="bi bi-search"></i>
          <input type="text" class="form-control search-input" placeholder="Tìm theo tên nhân viên, chức vụ..."
            v-model="searchQuery">
        </div>

        <!-- Add Button -->
        <button class="btn btn-primary-green px-4 py-2.5 d-flex align-items-center gap-2" style="border-radius: 8px;"
          @click="openAddModal">
          <i class="bi bi-plus-lg"></i> Thêm nhân viên
        </button>
      </div>
    </div>

    <!-- Staff Table -->
    <div class="admin-card-container shadow-sm mb-4">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Đang tải...</span>
        </div>
        <p class="text-muted mt-2">Đang tải danh sách nhân sự...</p>
      </div>

      <div v-else class="table-responsive">
        <table class="table admin-table mb-0">
          <thead>
            <tr>
              <th>Nhân Viên</th>
              <th>Số Điện Thoại</th>
              <th>Chức Vụ</th>
              <th>Trạng Thái</th>
              <th class="text-end">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredStaff.length === 0">
              <td colspan="5" class="text-center py-4 text-muted">Không tìm thấy nhân viên nào.</td>
            </tr>
            <!-- Loop -->
            <tr v-else v-for="emp in filteredStaff" :key="emp.id">
              <td>
                <div class="fw-bold text-dark">{{ emp.name }}</div>
                <div class="text-muted" style="font-size: 0.75rem;">{{ emp.email }}</div>
              </td>
              <td>{{ emp.phone || 'Chưa cung cấp' }}</td>
              <td>
                <span class="badge bg-light text-secondary border py-1 px-2.5">
                  {{ emp.role }}
                </span>
              </td>
              <td>
                <span class="badge-status rounded-pill py-1 px-2.5"
                  :class="emp.status === 'Đang hoạt động' ? 'bg-success-light text-success-green' : 'bg-danger-light text-danger-red'">
                  {{ emp.status }}
                </span>
              </td>
              <td class="text-end">
                <div class="d-inline-flex gap-2">
                  <button
                    class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="Chỉnh sửa" @click="openEditModal(emp)">
                    <i class="bi bi-pencil-square" style="color: #4A7C59;"></i>
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="Xóa" @click="confirmDelete(emp)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Staff Form Modal -->
    <div class="modal fade" id="staffModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
          <div class="modal-header border-bottom border-light py-3 px-4">
            <h5 class="modal-title serif-font fw-bold text-dark fs-5">
              {{ isEditing ? 'Cập Nhật Hồ Sơ Nhân Sự' : 'Thêm Nhân Viên Mới' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="saveStaff">
            <div class="modal-body p-4">
              <div class="mb-3">
                <label class="form-label fw-semibold">Họ và Tên *</label>
                <input type="text" class="form-control" v-model="form.name" placeholder="Ví dụ: Nguyễn Văn B" required>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Số điện thoại</label>
                <input type="text" class="form-control" v-model="form.phone" placeholder="Ví dụ: 0912345678">
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Địa chỉ Email *</label>
                <input type="email" class="form-control" v-model="form.email" placeholder="Ví dụ: staff@shoesport.com"
                  required>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Vai trò / Chức vụ</label>
                <select class="form-select" v-model="form.role" required>
                  <option value="Quản trị hệ thống">Quản trị hệ thống</option>
                  <option value="Quản lý kho">Quản lý kho</option>
                  <option value="Thu ngân">Thu ngân</option>
                  <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Trạng thái công việc</label>
                <select class="form-select" v-model="form.status" required>
                  <option value="Đang hoạt động">Đang hoạt động</option>
                  <option value="Đã khóa">Đã khóa</option>
                </select>
              </div>
            </div>
            <div class="modal-footer border-0 pt-0 pb-4 px-4">
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
import { fetchStaff, apiCreateStaff, apiUpdateStaff, apiDeleteStaff } from '../services/api';

const staff = ref([]);
const loading = ref(true);
const saving = ref(false);

const searchQuery = ref('');

const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  name: '',
  phone: '',
  email: '',
  role: 'Nhân viên bán hàng',
  status: 'Đang hoạt động'
});

const loadStaff = async () => {
  loading.value = true;
  try {
    staff.value = await fetchStaff();
  } catch (error) {
    console.error('Error fetching staff:', error);
  } finally {
    loading.value = false;
  }
};

const filteredStaff = computed(() => {
  return staff.value.filter(emp => {
    return emp.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      emp.role?.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

const openAddModal = () => {
  isEditing.value = false;
  editingId.value = null;
  form.value = {
    name: '',
    phone: '',
    email: '',
    role: 'Nhân viên bán hàng',
    status: 'Đang hoạt động'
  };
  showModal();
};

const openEditModal = (emp) => {
  isEditing.value = true;
  editingId.value = emp.id;
  form.value = {
    name: emp.name,
    phone: emp.phone || '',
    email: emp.email,
    role: emp.role || 'Nhân viên bán hàng',
    status: emp.status || 'Đang hoạt động'
  };
  showModal();
};

const showModal = () => {
  const modalEl = document.getElementById('staffModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
};

const hideModal = () => {
  const modalEl = document.getElementById('staffModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
};

const saveStaff = async () => {
  saving.value = true;
  try {
    if (isEditing.value) {
      await apiUpdateStaff(editingId.value, form.value);
      alert('Cập nhật hồ sơ nhân sự thành công!');
    } else {
      await apiCreateStaff(form.value);
      alert('Thêm nhân viên mới thành công!');
    }
    hideModal();
    await loadStaff();
  } catch (error) {
    console.error('Error saving staff:', error);
    alert('Không thể lưu thông tin nhân viên.');
  } finally {
    saving.value = false;
  }
};

const confirmDelete = async (emp) => {
  if (confirm(`Bạn có chắc muốn xóa nhân viên "${emp.name}"?`)) {
    try {
      await apiDeleteStaff(emp.id);
      alert('Đã xóa nhân viên khỏi hệ thống!');
      await loadStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
      alert('Không thể xóa nhân sự này.');
    }
  }
};

onMounted(() => {
  loadStaff();
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
