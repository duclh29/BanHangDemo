<template>
  <div>
    <!-- Filters Row -->
    <div class="admin-card-container mb-4 shadow-sm">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div class="d-flex flex-wrap gap-2 flex-grow-1" style="max-width: 600px;">
          <div class="search-input-wrapper m-0 flex-grow-1" style="min-width: 200px;">
            <i class="bi bi-search"></i>
            <input type="text" class="form-control search-input"
              placeholder="Tìm theo hóa đơn, khách hàng hoặc mã đơn..." v-model="searchQuery">
          </div>
          <select class="form-select border-light-dark font-weight-bold" style="width: auto;" v-model="selectedStatus">
            <option value="">Tất cả trạng thái</option>
            <option value="Đã thanh toán">Đã thanh toán</option>
            <option value="Chưa thanh toán">Chưa thanh toán</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Invoices Table -->
    <div class="admin-card-container shadow-sm mb-4">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Đang tải hóa đơn...</span>
        </div>
        <p class="text-muted mt-2">Đang tải danh sách hóa đơn...</p>
      </div>

      <div v-else class="table-responsive">
        <table class="table admin-table mb-0">
          <thead>
            <tr>
              <th>Mã Hóa Đơn</th>
              <th>Mã Đơn Hàng</th>
              <th>Khách Hàng / Email</th>
              <th>Ngày Xuất</th>
              <th>Phương Thức</th>
              <th>Tổng Tiền</th>
              <th>Trạng Thái</th>
              <th class="text-end">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredInvoices.length === 0">
              <td colspan="8" class="text-center py-4 text-muted">Không tìm thấy hóa đơn nào.</td>
            </tr>
            <!-- Loop -->
            <tr v-else v-for="invoice in filteredInvoices" :key="invoice.id">
              <td class="fw-bold text-dark">{{ invoice.id }}</td>
              <td class="fw-semibold text-secondary">{{ invoice.orderId }}</td>
              <td>
                <div class="fw-bold text-dark">{{ invoice.customerName }}</div>
                <div class="text-muted" style="font-size: 0.75rem;">{{ invoice.email }}</div>
              </td>
              <td>{{ invoice.date }}</td>
              <td>
                <span class="badge bg-light text-secondary border">
                  {{ invoice.paymentMethod || 'Tiền mặt' }}
                </span>
              </td>
              <td class="fw-bold text-dark">{{ formatVND(invoice.total) }}</td>
              <td>
                <span class="badge-status rounded-pill py-1 px-2.5"
                  :class="invoice.status === 'Đã thanh toán' ? 'bg-success-light text-success-green' : 'bg-danger-light text-danger-red'">
                  {{ invoice.status }}
                </span>
              </td>
              <td class="text-end">
                <div class="d-inline-flex gap-2">
                  <button
                    class="btn btn-outline-success btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="In / Xem hóa đơn" @click="printInvoice(invoice)">
                    <i class="bi bi-printer"></i>
                  </button>
                  <button
                    class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="Thay đổi thanh toán" @click="openEditModal(invoice)">
                    <i class="bi bi-pencil-square" style="color: #4A7C59;"></i>
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="Xóa hóa đơn" @click="confirmDelete(invoice)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Invoice Status Modal -->
    <div class="modal fade" id="invoiceEditModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
          <div class="modal-header border-bottom border-light py-3 px-4">
            <h5 class="modal-title serif-font fw-bold text-dark fs-5">
              Cập Nhật Thanh Toán Hóa Đơn
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="updateInvoice">
            <div class="modal-body p-4">
              <div class="mb-3">
                <label class="form-label fw-semibold">Trạng thái thanh toán</label>
                <select class="form-select" v-model="editForm.status" required>
                  <option value="Đã thanh toán">Đã thanh toán</option>
                  <option value="Chưa thanh toán">Chưa thanh toán</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Phương thức giao dịch</label>
                <select class="form-select" v-model="editForm.paymentMethod" required>
                  <option value="Thẻ tín dụng">Thẻ tín dụng</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Tiền mặt / Thẻ tại quầy">Tiền mặt / Thẻ tại quầy</option>
                </select>
              </div>
            </div>
            <div class="modal-footer border-0 pt-0 pb-4 px-4">
              <button type="button" class="btn btn-outline-green" data-bs-dismiss="modal">Hủy bỏ</button>
              <button type="submit" class="btn btn-primary-green px-4" :disabled="saving">
                <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
                <span>Cập nhật</span>
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
import { fetchInvoices, apiUpdateInvoice, apiDeleteInvoice, formatVND } from '../services/api';

const invoices = ref([]);
const loading = ref(true);
const saving = ref(false);

const searchQuery = ref('');
const selectedStatus = ref('');

const editForm = ref({
  id: '',
  status: 'Chờ xử lý',
  paymentMethod: ''
});

const loadInvoices = async () => {
  loading.value = true;
  try {
    invoices.value = await fetchInvoices();
  } catch (error) {
    console.error('Error fetching invoices:', error);
  } finally {
    loading.value = false;
  }
};

const filteredInvoices = computed(() => {
  return invoices.value.filter(inv => {
    const matchSearch = inv.customerName?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      inv.id?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      inv.orderId?.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus = !selectedStatus.value || inv.status === selectedStatus.value;
    return matchSearch && matchStatus;
  });
});

const printInvoice = (invoice) => {
  alert(`Đang in Hóa đơn ${invoice.id} cho khách hàng ${invoice.customerName}...\nGiá trị giao dịch: ${formatVND(invoice.total)}`);
};

const openEditModal = (invoice) => {
  editForm.value = {
    id: invoice.id,
    status: invoice.status,
    paymentMethod: invoice.paymentMethod || 'Thẻ tín dụng'
  };
  const modalEl = document.getElementById('invoiceEditModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
};

const hideEditModal = () => {
  const modalEl = document.getElementById('invoiceEditModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
};

const updateInvoice = async () => {
  saving.value = true;
  try {
    const original = invoices.value.find(i => i.id === editForm.value.id);
    if (original) {
      const payload = {
        ...original,
        status: editForm.value.status,
        paymentMethod: editForm.value.paymentMethod
      };
      await apiUpdateInvoice(editForm.value.id, payload);
      alert('Cập nhật hóa đơn thành công!');
      hideEditModal();
      await loadInvoices();
    }
  } catch (error) {
    console.error('Error updating invoice:', error);
    alert('Có lỗi xảy ra khi lưu hóa đơn.');
  } finally {
    saving.value = false;
  }
};

const confirmDelete = async (invoice) => {
  if (confirm(`Bạn có muốn xóa hóa đơn "${invoice.id}"?`)) {
    try {
      await apiDeleteInvoice(invoice.id);
      alert('Đã xóa hóa đơn thành công!');
      await loadInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Không thể xóa hóa đơn này.');
    }
  }
};

onMounted(() => {
  loadInvoices();
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
