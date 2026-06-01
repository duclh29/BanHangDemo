<template>
  <div>
    <!-- Filters Row -->
    <div class="admin-card-container mb-4 shadow-sm">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div class="d-flex flex-wrap gap-2 flex-grow-1" style="max-width: 600px;">
          <div class="search-input-wrapper m-0 flex-grow-1" style="min-width: 200px;">
            <i class="bi bi-search"></i>
            <input type="text" class="form-control search-input" placeholder="Tìm theo khách hàng hoặc mã đơn..."
              v-model="searchQuery">
          </div>
          <select class="form-select border-light-dark font-weight-bold" style="width: auto;" v-model="selectedStatus">
            <option value="">Tất cả trạng thái</option>
            <option value="Chờ xử lý">Chờ xử lý</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đang giao">Đang giao</option>
            <option value="Đã hoàn thành">Đã hoàn thành</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="admin-card-container shadow-sm mb-4">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Đang tải đơn hàng...</span>
        </div>
        <p class="text-muted mt-2">Đang tải danh sách đơn hàng...</p>
      </div>

      <div v-else class="table-responsive">
        <table class="table admin-table mb-0">
          <thead>
            <tr>
              <th>Mã Đơn</th>
              <th>Khách Hàng / Email</th>
              <th>Địa Chỉ Giao Hàng</th>
              <th>Ngày Đặt</th>
              <th>Giá Trị Đơn</th>
              <th>Trạng Thái</th>
              <th class="text-end">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="7" class="text-center py-4 text-muted">Không tìm thấy đơn hàng nào.</td>
            </tr>
            <tr v-else v-for="order in filteredOrders" :key="order.id">
              <td class="fw-bold text-dark">{{ order.id }}</td>
              <td>
                <div class="fw-bold text-dark">{{ order.customerName }}</div>
                <div class="text-muted" style="font-size: 0.75rem;">{{ order.email }}</div>
              </td>
              <td>{{ order.address }}</td>
              <td>{{ order.date }}</td>
              <td class="fw-semibold text-dark">{{ formatVND(order.total) }}</td>
              <td>
                <span class="badge-status rounded-pill py-1 px-2.5" :style="getStatusStyle(order.status)">
                  {{ order.status }}
                </span>
              </td>
              <td class="text-end">
                <div class="d-inline-flex gap-2">
                  <button
                    class="btn btn-outline-success btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="Xem chi tiết vật phẩm" @click="viewOrderDetails(order)">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button
                    class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="Cập nhật trạng thái" @click="openStatusModal(order)">
                    <i class="bi bi-pencil-square" style="color: #4A7C59;"></i>
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 32px; height: 32px;" title="Xóa đơn hàng" @click="confirmDelete(order)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Items Detail Modal -->
    <div class="modal fade" id="orderDetailsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
          <div class="modal-header border-bottom border-light py-3 px-4">
            <h5 class="modal-title serif-font fw-bold text-dark fs-4">
              Chi Tiết Đơn Hàng: {{ selectedOrder?.id }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4" v-if="selectedOrder">
            <div class="mb-4">
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="text-secondary" style="font-size: 0.8rem;">Họ Tên Khách Hàng</div>
                  <div class="fw-bold text-dark fs-6">{{ selectedOrder.customerName }}</div>
                </div>
                <div class="col-md-6">
                  <div class="text-secondary" style="font-size: 0.8rem;">Hộp thư Email</div>
                  <div class="fw-bold text-dark fs-6">{{ selectedOrder.email }}</div>
                </div>
                <div class="col-12">
                  <div class="text-secondary" style="font-size: 0.8rem;">Địa Chỉ Giao Hàng</div>
                  <div class="fw-bold text-dark fs-6">{{ selectedOrder.address }}</div>
                </div>
              </div>
            </div>

            <h6 class="serif-font fw-bold mb-3">Danh sách sản phẩm mua</h6>
            <div class="table-responsive">
              <table class="table border text-center align-middle" style="font-size: 0.85rem;">
                <thead class="table-light">
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Sản phẩm</th>
                    <th>Size</th>
                    <th>Màu</th>
                    <th>Đơn giá</th>
                    <th>SL</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in selectedOrder.items" :key="idx">
                    <td>
                      <img :src="item.image" alt="" class="rounded border"
                        style="width: 40px; height: 40px; object-fit: cover;">
                    </td>
                    <td class="text-start fw-semibold text-dark">{{ item.title }}</td>
                    <td>{{ item.size || '41' }}</td>
                    <td>{{ item.color || 'Đen' }}</td>
                    <td>{{ formatVND(item.price) }}</td>
                    <td>{{ item.quantity || 1 }}</td>
                    <td class="fw-bold text-dark">{{ formatVND(item.price * (item.quantity || 1)) }}</td>
                  </tr>
                  <!-- Total Summary row -->
                  <tr class="table-light">
                    <td colspan="6" class="text-end fw-bold text-dark py-2.5">Tổng giá trị đơn hàng:</td>
                    <td class="fw-bold text-success-green py-2.5">{{ formatVND(selectedOrder.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer border-0 pt-0 pb-4 px-4">
            <button type="button" class="btn btn-primary-green px-4 py-2" data-bs-dismiss="modal">Đóng lại</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Status Modal -->
    <div class="modal fade" id="orderStatusModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
          <div class="modal-header border-bottom border-light py-3 px-4">
            <h5 class="modal-title serif-font fw-bold text-dark fs-5">
              Cập Nhật Trạng Thái Đơn Hàng
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="updateStatus">
            <div class="modal-body p-4">
              <div class="mb-3">
                <label class="form-label fw-semibold">Trạng thái mới</label>
                <select class="form-select" v-model="statusForm.status" required>
                  <option value="Chờ xử lý">Chờ xử lý</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đang giao">Đang giao</option>
                  <option value="Đã hoàn thành">Đã hoàn thành</option>
                  <option value="Đã hủy">Đã hủy</option>
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
import { fetchOrders, apiUpdateOrder, apiDeleteOrder, formatVND } from '../services/api';

const orders = ref([]);
const loading = ref(true);
const saving = ref(false);

const searchQuery = ref('');
const selectedStatus = ref('');

const selectedOrder = ref(null);

const statusForm = ref({
  id: '',
  status: 'Chờ xử lý'
});

const loadOrders = async () => {
  loading.value = true;
  try {
    orders.value = await fetchOrders();
  } catch (error) {
    console.error('Error fetching orders:', error);
  } finally {
    loading.value = false;
  }
};

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchSearch = order.customerName?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.id?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus = !selectedStatus.value || order.status === selectedStatus.value;
    return matchSearch && matchStatus;
  });
});

const getStatusStyle = (status) => {
  switch (status) {
    case 'Đã hoàn thành':
      return { backgroundColor: '#E6F4EA', color: '#137333', fontSize: '0.75rem', fontWeight: 'bold' };
    case 'Đang giao':
      return { backgroundColor: '#E8F0FE', color: '#1A73E8', fontSize: '0.75rem', fontWeight: 'bold' };
    case 'Đang xử lý':
    case 'Chờ xử lý':
      return { backgroundColor: '#FEF7E0', color: '#B06000', fontSize: '0.75rem', fontWeight: 'bold' };
    default:
      return { backgroundColor: '#FCE8E6', color: '#C5221F', fontSize: '0.75rem', fontWeight: 'bold' };
  }
};

const viewOrderDetails = (order) => {
  selectedOrder.value = order;
  const modalEl = document.getElementById('orderDetailsModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
};

const openStatusModal = (order) => {
  statusForm.value = {
    id: order.id,
    status: order.status
  };
  const modalEl = document.getElementById('orderStatusModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
};

const hideStatusModal = () => {
  const modalEl = document.getElementById('orderStatusModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
};

const updateStatus = async () => {
  saving.value = true;
  try {
    const orderToUpdate = orders.value.find(o => o.id === statusForm.value.id);
    if (orderToUpdate) {
      const payload = {
        ...orderToUpdate,
        status: statusForm.value.status
      };
      await apiUpdateOrder(statusForm.value.id, payload);
      alert('Cập nhật trạng thái đơn hàng thành công!');
      hideStatusModal();
      await loadOrders();
    }
  } catch (error) {
    console.error('Error updating order:', error);
    alert('Có lỗi xảy ra khi cập nhật.');
  } finally {
    saving.value = false;
  }
};

const confirmDelete = async (order) => {
  if (confirm(`Bạn có chắc chắn muốn xóa đơn hàng "${order.id}"?`)) {
    try {
      await apiDeleteOrder(order.id);
      alert('Đã xóa đơn hàng thành công!');
      await loadOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Có lỗi xảy ra khi xóa đơn hàng.');
    }
  }
};

onMounted(() => {
  loadOrders();
});
</script>

<style scoped>
/* Scoped modifications */
</style>
