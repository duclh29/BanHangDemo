import { createRouter, createWebHashHistory } from 'vue-router';

// Lazy load pages
import Login from '../pages/Login.vue';
import ClientHome from '../pages/ClientHome.vue';
import ClientProductDetail from '../pages/ClientProductDetail.vue';
import ClientCheckout from '../pages/ClientCheckout.vue';

import AdminDashboard from '../pages/AdminDashboard.vue';
import AdminProducts from '../pages/AdminProducts.vue';
import AdminOrders from '../pages/AdminOrders.vue';
import AdminPOS from '../pages/AdminPOS.vue';
import AdminInvoices from '../pages/AdminInvoices.vue';
import AdminCustomers from '../pages/AdminCustomers.vue';
import AdminStaff from '../pages/AdminStaff.vue';

const routes = [
  {
    path: '/',
    redirect: '/shop'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'blank' }
  },
  {
    path: '/shop',
    name: 'ClientHome',
    component: ClientHome,
    meta: { layout: 'client' }
  },
  {
    path: '/product/:id',
    name: 'ClientProductDetail',
    component: ClientProductDetail,
    meta: { layout: 'client' }
  },
  {
    path: '/checkout',
    name: 'ClientCheckout',
    component: ClientCheckout,
    meta: { layout: 'client' }
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard'
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { layout: 'admin' }
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts,
    meta: { layout: 'admin' }
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: AdminOrders,
    meta: { layout: 'admin' }
  },
  {
    path: '/admin/pos',
    name: 'AdminPOS',
    component: AdminPOS,
    meta: { layout: 'admin' }
  },
  {
    path: '/admin/invoices',
    name: 'AdminInvoices',
    component: AdminInvoices,
    meta: { layout: 'admin' }
  },
  {
    path: '/admin/customers',
    name: 'AdminCustomers',
    component: AdminCustomers,
    meta: { layout: 'admin' }
  },
  {
    path: '/admin/staff',
    name: 'AdminStaff',
    component: AdminStaff,
    meta: { layout: 'admin' }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
