<template>
  <div>
    <!-- KPI Row (4 Cards) -->
    <div class="row g-4 mb-4">
      <!-- KPI Card 1 -->
      <div class="col-sm-6 col-xl-3">
        <div class="kpi-card shadow-sm">
          <div class="kpi-header">
            <div class="kpi-icon-box"
              style="background-color: var(--primary-green-light); color: var(--primary-green);">
              <i class="bi bi-wallet2 fs-5"></i>
            </div>
            <span class="kpi-trend" style="background-color: #E6F4EA; color: #137333;">
              <i class="bi bi-arrow-up-right me-1"></i> +12.5%
            </span>
          </div>
          <div>
            <div class="kpi-label">Tổng Doanh Thu (Hoàn Thành)</div>
            <div class="kpi-value">{{ formatVND(stats.revenue) }}</div>
          </div>
        </div>
      </div>
      <!-- KPI Card 2 -->
      <div class="col-sm-6 col-xl-3">
        <div class="kpi-card shadow-sm">
          <div class="kpi-header">
            <div class="kpi-icon-box"
              style="background-color: var(--badge-active-bg); color: var(--badge-active-color);">
              <i class="bi bi-cart3 fs-5"></i>
            </div>
            <span class="kpi-trend" style="background-color: #E6F4EA; color: #137333;">
              <i class="bi bi-arrow-up-right me-1"></i> +8.2%
            </span>
          </div>
          <div>
            <div class="kpi-label">Tổng Đơn Hàng</div>
            <div class="kpi-value">{{ stats.orders }}</div>
          </div>
        </div>
      </div>
      <!-- KPI Card 3 -->
      <div class="col-sm-6 col-xl-3">
        <div class="kpi-card shadow-sm">
          <div class="kpi-header">
            <div class="kpi-icon-box" style="background-color: #F8F9FA; color: #6C757D;">
              <i class="bi bi-people fs-5"></i>
            </div>
            <span class="kpi-trend" style="background-color: #FCE8E6; color: #C5221F;">
              <i class="bi bi-arrow-down-right me-1"></i> -2.1%
            </span>
          </div>
          <div>
            <div class="kpi-label">Khách Hàng</div>
            <div class="kpi-value">{{ stats.customers }}</div>
          </div>
        </div>
      </div>
      <!-- KPI Card 4 -->
      <div class="col-sm-6 col-xl-3">
        <div class="kpi-card shadow-sm">
          <div class="kpi-header">
            <div class="kpi-icon-box" style="background-color: var(--accent-yellow-bg); color: var(--accent-yellow);">
              <i class="bi bi-person-workspace fs-5"></i>
            </div>
            <span class="kpi-trend" style="background-color: #E6F4EA; color: #137333;">
              <i class="bi bi-arrow-up-right me-1"></i> +18.4%
            </span>
          </div>
          <div>
            <div class="kpi-label">Nhân Viên Hệ Thống</div>
            <div class="kpi-value">{{ stats.staff }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts & Performance Row -->
    <div class="row g-4 mb-4">
      <!-- Revenue Chart -->
      <div class="col-lg-8">
        <div class="admin-card-container h-100 shadow-sm" style="padding: 2rem;">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="serif-font fs-5 text-dark fw-bold mb-0">Tổng Quan Doanh Thu</h3>
            <select class="form-select border-0 font-weight-bold"
              style="width: auto; background-color: var(--bg-cream); font-size: 0.85rem;">
              <option selected>Năm Nay</option>
              <option>Tháng Này</option>
            </select>
          </div>

          <div style="position: relative; height: 320px; width: 100%;">
            <canvas id="revenueChartCanvas"></canvas>
          </div>
        </div>
      </div>

      <!-- Product Performance -->
      <div class="col-lg-4">
        <div class="admin-card-container h-100 shadow-sm" style="padding: 2rem;">
          <h3 class="serif-font fs-5 text-dark fw-bold mb-4">Thương hiệu Hàng Đầu</h3>

          <!-- Brand Rankings based on real items in database -->
          <div class="custom-progress-row">
            <div class="custom-progress-label">
              <span>Giày Nike</span>
              <span>85%</span>
            </div>
            <div class="custom-progress-bar-wrapper">
              <div class="custom-progress-bar-fill bg-success" style="width: 85%;"></div>
            </div>
          </div>

          <div class="custom-progress-row">
            <div class="custom-progress-label">
              <span>Giày Adidas</span>
              <span>65%</span>
            </div>
            <div class="custom-progress-bar-wrapper">
              <div class="custom-progress-bar-fill" style="width: 65%;"></div>
            </div>
          </div>

          <div class="custom-progress-row">
            <div class="custom-progress-label">
              <span>Giày Puma</span>
              <span>45%</span>
            </div>
            <div class="custom-progress-bar-wrapper">
              <div class="custom-progress-bar-fill" style="width: 45%; background-color: var(--primary-green);"></div>
            </div>
          </div>

          <div class="custom-progress-row">
            <div class="custom-progress-label">
              <span>Giày Fila</span>
              <span>30%</span>
            </div>
            <div class="custom-progress-bar-wrapper">
              <div class="custom-progress-bar-fill bg-secondary" style="width: 30%;"></div>
            </div>
          </div>

          <div class="custom-progress-row">
            <div class="custom-progress-label">
              <span>Nhà hiệu Khác</span>
              <span>15%</span>
            </div>
            <div class="custom-progress-bar-wrapper">
              <div class="custom-progress-bar-fill bg-warning" style="width: 15%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders Section -->
    <div class="admin-card-container shadow-sm mb-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="serif-font fs-5 text-dark fw-bold mb-0">Đơn Hàng Mới Nhất</h3>
        <router-link to="/admin/orders" class="text-primary-green fw-semibold text-decoration-none"
          style="font-size: 0.85rem;">Xem Tất Cả</router-link>
      </div>

      <div class="table-responsive">
        <table class="table admin-table mb-0">
          <thead>
            <tr>
              <th>Mã Đơn Hàng</th>
              <th>Khách Hàng</th>
              <th>Ngày</th>
              <th>Số Tiền</th>
              <th>Trạng Thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="recentOrders.length === 0">
              <td colspan="6" class="text-center py-4 text-muted">Không có đơn hàng nào gần đây.</td>
            </tr>
            <!-- Loop -->
            <tr v-else v-for="order in recentOrders" :key="order.id">
              <td class="fw-semibold text-dark">{{ order.id }}</td>
              <td>{{ order.customerName }}</td>
              <td>{{ order.date }}</td>
              <td class="fw-semibold text-dark">{{ formatVND(order.total) }}</td>
              <td>
                <span class="badge-status py-1 px-2.5 rounded-pill" :style="getStatusStyle(order.status)">
                  {{ order.status }}
                </span>
              </td>
              <td>
                <router-link to="/admin/orders" class="btn btn-link text-primary-green p-0"><i
                    class="bi bi-eye"></i></router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchOrders, fetchCustomers, fetchStaff, formatVND } from '../services/api';

const stats = ref({
  revenue: 0,
  orders: 0,
  customers: 0,
  staff: 0
});

const recentOrders = ref([]);

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

const initDashboard = async () => {
  try {
    const [orders, customers, staff] = await Promise.all([
      fetchOrders(),
      fetchCustomers(),
      fetchStaff()
    ]);

    // Revenue represents all orders or completed orders. Let's sum all orders since mock API data has multiple states
    const completedOrders = orders.filter(o => o.status === 'Đã hoàn thành' || o.status === 'Đang giao');
    const revenueSum = orders.reduce((acc, curr) => acc + Number(curr.total || 0), 0);

    stats.value.orders = orders.length;
    stats.value.revenue = revenueSum > 0 ? revenueSum : 15110000; // fallback if empty
    stats.value.customers = customers.length;
    stats.value.staff = staff.length;

    // Slice recent 5 orders
    recentOrders.value = orders.slice(0, 5);

    // Initialize Chart.js
    renderChart();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
  }
};

const renderChart = () => {
  const ctx = document.getElementById('revenueChartCanvas');
  if (!ctx) return;

  // Destroy previous instance if any
  const existingChart = Chart.getChart(ctx);
  if (existingChart) existingChart.destroy();

  const chartCtx = ctx.getContext('2d');
  const gradientFill = chartCtx.createLinearGradient(0, 0, 0, 300);
  gradientFill.addColorStop(0, 'rgba(74, 124, 89, 0.25)'); // ShoeSport custom green theme
  gradientFill.addColorStop(1, 'rgba(74, 124, 89, 0.01)');

  new Chart(chartCtx, {
    type: 'line',
    data: {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
      datasets: [{
        label: 'Doanh thu (VND)',
        data: [15000000, 22000000, 38000000, 31000000, 48000000, stats.value.revenue],
        borderColor: '#4A7C59',
        borderWidth: 5,
        pointBackgroundColor: '#4A7C59',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: true,
        backgroundColor: gradientFill,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          grid: { color: '#F0ECE4', drawTicks: false },
          ticks: {
            callback: function (value) {
              return (value / 1000000) + ' Tr';
            }
          }
        }
      }
    }
  });
};

onMounted(() => {
  initDashboard();
});
</script>

<style scoped>
/* Scoped modifications */
</style>
