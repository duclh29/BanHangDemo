// API Service supporting both Local Hardcoded (fix cứng) CRUD via LocalStorage and MockAPI Online CRUD.

const MOCK_API_BASE = "https://6a1819db1878294b597c6362.mockapi.io";
const MOCK_API_PRODUCTS = `${MOCK_API_BASE}/products`;
const MOCK_API_CUSTOMERS = `${MOCK_API_BASE}/customers`;
const MOCK_API_STAFF = `${MOCK_API_BASE}/staff`;
const MOCK_API_ORDERS = `${MOCK_API_BASE}/orders`;
const MOCK_API_INVOICES = `${MOCK_API_BASE}/invoices`;

// Seed data
export const SEED_PRODUCTS = [
    {
        id: "1",
        title: "Nike Air Zoom Pegasus 40",
        brand: "Nike",
        price: 3400000,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
        subtitle: "Đồng hành cùng mọi bước chạy hoàn hảo và êm ái.",
        category: "Nike",
        stock: 45,
        status: "Hoạt động",
        sku: "NK-PEG40"
    },
    {
        id: "2",
        title: "Adidas Ultraboost Light",
        brand: "Adidas",
        price: 4700000,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop",
        subtitle: "Thiết kế dệt Primeknit thoáng khí cùng bộ đệm năng lượng đột phá.",
        category: "Adidas",
        stock: 22,
        status: "Hoạt động",
        sku: "AD-ULIGHT"
    },
    {
        id: "3",
        title: "Puma Velocity Nitro 2",
        brand: "Puma",
        price: 3200000,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop",
        subtitle: "Sự kết hợp hoàn hảo giữa đệm bọt Nitro siêu êm và đế bám đường.",
        category: "Puma",
        stock: 15,
        status: "Hoạt động",
        sku: "PM-VELN2"
    },
    {
        id: "4",
        title: "Fila Disruptor II Premium",
        brand: "Fila",
        price: 2300000,
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop",
        subtitle: "Kiểu dáng hầm hố Chunky mang đậm phong cách đường phố năng động.",
        category: "Fila",
        stock: 8,
        status: "Hoạt động",
        sku: "FL-DISR2"
    },
    {
        id: "5",
        title: "Nike Air Max Pulse",
        brand: "Nike",
        price: 4500000,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop",
        subtitle: "Đôi giày mang tính biểu tượng thời trang đường phố vô cùng êm ái.",
        category: "Nike",
        stock: 12,
        status: "Hoạt động",
        sku: "NK-AMPUL"
    },
    {
        id: "6",
        title: "Adidas Forum Low Classic",
        brand: "Adidas",
        price: 2700000,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop",
        subtitle: "Thiết kế bóng rổ cổ điển những năm 80 được tái sinh đầy phá cách.",
        category: "Adidas",
        stock: 18,
        status: "Hoạt động",
        sku: "AD-FORLO"
    },
    {
        id: "7",
        title: "Nike Air Force 1 '07",
        brand: "Nike",
        price: 2900000,
        image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&auto=format&fit=crop",
        subtitle: "Đôi giày da trắng huyền thoại chưa bao giờ lỗi mốt.",
        category: "Nike",
        stock: 30,
        status: "Hoạt động",
        sku: "NK-AF107"
    },
    {
        id: "8",
        title: "Nike Dunk Low Retro",
        brand: "Nike",
        price: 3100000,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop",
        subtitle: "Màu sắc tương phản ấn tượng, biểu tượng văn hóa Skater.",
        category: "Nike",
        stock: 25,
        status: "Hoạt động",
        sku: "NK-DUNKL"
    }
];

export const SEED_CUSTOMERS = [
    { id: "1", name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "+1 (555) 123-4567", spend: 4250000, ordersCount: 12, status: "Hoạt động", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop" },
    { id: "2", name: "Marcus Rodriguez", email: "m.rodriguez@example.com", phone: "+1 (555) 987-6543", spend: 120000, ordersCount: 1, status: "Đã khóa", avatar: "MR" },
    { id: "3", name: "David Chen", email: "david.chen.ux@example.com", phone: "+44 20 7123 4567", spend: 8940500, ordersCount: 24, status: "Hoạt động", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop" },
    { id: "4", name: "Emma Watson", email: "emma.w@example.com", phone: "Chưa cung cấp", spend: 0, ordersCount: 0, status: "Mới", avatar: "EW" }
];

export const SEED_STAFF = [
    { id: "1", name: "Sarah Jenkins", email: "sarah.j@luxcommerce.com", role: "Quản lý", department: "Kinh doanh & Phát triển", phone: "+1 (555) 123-4567", status: "Hoạt động", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop" },
    { id: "2", name: "Michael Chen", email: "m.chen@luxcommerce.com", role: "Quản trị hệ thống", department: "Vận hành CNTT", phone: "+1 (555) 987-6543", status: "Hoạt động", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop" },
    { id: "3", name: "Elena Rodriguez", email: "elena.r@luxcommerce.com", role: "Nhân viên hỗ trợ", department: "Chăm sóc khách hàng", phone: "+1 (555) 222-3333", status: "Nghỉ phép", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop" }
];

export const SEED_ORDERS = [
    {
        id: "ORD-982736",
        customerName: "Lê Huy Hoàng",
        email: "hoanglh@gmail.com",
        address: "Toà P, CV Phần mềm Quang Trung, Quận 12, TP.HCM",
        date: "28/05/2026",
        items: [
            { title: "Nike Air Zoom Pegasus 40", price: 3400000, size: "42", color: "Đen nhám", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop" }
        ],
        total: 3790000,
        status: "Chờ xử lý"
    },
    {
        id: "ORD-128362",
        customerName: "Nguyễn Thị Mai",
        email: "maintt@yahoo.com",
        address: "15 Lê Lợi, Quận 1, TP.HCM",
        date: "27/05/2026",
        items: [
            { title: "Adidas Ultraboost Light", price: 4700000, size: "39", color: "Hồng phấn", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&auto=format&fit=crop" }
        ],
        total: 5220000,
        status: "Đã hoàn thành"
    },
    {
        id: "ORD-473829",
        customerName: "Phan Văn Nam",
        email: "nampv@outlook.com",
        address: "42 Đường 3/2, Quận 10, TP.HCM",
        date: "26/05/2026",
        items: [
            { title: "Puma Velocity Nitro 2", price: 3200000, size: "43", color: "Đen tuyền", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200&auto=format&fit=crop" },
            { title: "Fila Disruptor II Premium", price: 2300000, size: "42", color: "Trắng tuyết", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&auto=format&fit=crop" }
        ],
        total: 6100000,
        status: "Đang giao"
    }
];

export const SEED_INVOICES = [
    {
        id: "INV-982736",
        orderId: "ORD-982736",
        customerName: "Lê Huy Hoàng",
        email: "hoanglh@gmail.com",
        date: "28/05/2026",
        paymentMethod: "Chuyển khoản",
        total: 3790000,
        status: "Đã thanh toán"
    },
    {
        id: "INV-128362",
        orderId: "ORD-128362",
        customerName: "Nguyễn Thị Mai",
        email: "maintt@yahoo.com",
        date: "27/05/2026",
        paymentMethod: "Tiền mặt",
        total: 5220000,
        status: "Đã thanh toán"
    },
    {
        id: "INV-473829",
        orderId: "ORD-473829",
        customerName: "Phan Văn Nam",
        email: "nampv@outlook.com",
        date: "26/05/2026",
        paymentMethod: "Thẻ Visa",
        total: 6100000,
        status: "Chưa thanh toán"
    }
];

// Switch management
export function getDataSourceMode() {
    return localStorage.getItem("data_source_mode") || "local";
}

export function setDataSourceMode(mode) {
    localStorage.setItem("data_source_mode", mode);
}

// Local State Initializer in LocalStorage (fix cứng CRUD)
function getLocalData(key, seed) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(seed));
    }
    return JSON.parse(localStorage.getItem(key));
}

function setLocalData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Format Currency
export function formatVND(value) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
        .format(value)
        .replace('₫', '') + ' ₫';
}

// ==================== PRODUCTS CRUD ====================
export async function fetchProducts() {
    if (getDataSourceMode() === "local") {
        return getLocalData("local_products", SEED_PRODUCTS);
    }
    try {
        const response = await fetch(MOCK_API_PRODUCTS);
        if (!response.ok) throw new Error("MockAPI failed");
        const data = await response.json();
        return data.map((p, idx) => ({ ...p, id: p.id ? String(p.id) : String(idx + 1) }));
    } catch (e) {
        console.warn("Fallback to Local Products CRUD", e);
        return getLocalData("local_products", SEED_PRODUCTS);
    }
}

export async function fetchProductById(id) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_products", SEED_PRODUCTS);
        const item = list.find(p => String(p.id) === String(id));
        if (item) return item;
        throw new Error("Product not found locally");
    }
    const res = await fetch(`${MOCK_API_PRODUCTS}/${id}`);
    if (!res.ok) throw new Error("API failed");
    return await res.json();
}

export async function apiCreateProduct(product) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_products", SEED_PRODUCTS);
        const newProduct = { ...product, id: String(Date.now()) };
        list.push(newProduct);
        setLocalData("local_products", list);
        return newProduct;
    }
    const res = await fetch(MOCK_API_PRODUCTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
}

export async function apiUpdateProduct(id, product) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_products", SEED_PRODUCTS);
        const index = list.findIndex(p => String(p.id) === String(id));
        if (index !== -1) {
            list[index] = { ...list[index], ...product };
            setLocalData("local_products", list);
            return list[index];
        }
        throw new Error("Not found");
    }
    const res = await fetch(`${MOCK_API_PRODUCTS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
}

export async function apiDeleteProduct(id) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_products", SEED_PRODUCTS);
        const filtered = list.filter(p => String(p.id) !== String(id));
        setLocalData("local_products", filtered);
        return true;
    }
    const res = await fetch(`${MOCK_API_PRODUCTS}/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error("API failed");
    return true;
}

// ==================== CUSTOMERS CRUD ====================
export async function fetchCustomers() {
    if (getDataSourceMode() === "local") {
        return getLocalData("local_customers", SEED_CUSTOMERS);
    }
    try {
        const response = await fetch(MOCK_API_CUSTOMERS);
        if (!response.ok) throw new Error("MockAPI failed");
        const data = await response.json();
        return data.map((c, idx) => ({ ...c, id: c.id ? String(c.id) : String(idx + 1) }));
    } catch (e) {
        console.warn("Fallback to Local Customers CRUD", e);
        return getLocalData("local_customers", SEED_CUSTOMERS);
    }
}

export async function apiCreateCustomer(customer) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_customers", SEED_CUSTOMERS);
        const newCustomer = { ...customer, id: String(Date.now()), spend: 0, ordersCount: 0 };
        list.push(newCustomer);
        setLocalData("local_customers", list);
        return newCustomer;
    }
    const res = await fetch(MOCK_API_CUSTOMERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
}

export async function apiUpdateCustomer(id, customer) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_customers", SEED_CUSTOMERS);
        const index = list.findIndex(c => String(c.id) === String(id));
        if (index !== -1) {
            list[index] = { ...list[index], ...customer };
            setLocalData("local_customers", list);
            return list[index];
        }
        throw new Error("Not found");
    }
    const res = await fetch(`${MOCK_API_CUSTOMERS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
}

export async function apiDeleteCustomer(id) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_customers", SEED_CUSTOMERS);
        const filtered = list.filter(c => String(c.id) !== String(id));
        setLocalData("local_customers", filtered);
        return true;
    }
    const res = await fetch(`${MOCK_API_CUSTOMERS}/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error("API failed");
    return true;
}

// ==================== STAFF CRUD ====================
export async function fetchStaff() {
    if (getDataSourceMode() === "local") {
        return getLocalData("local_staff", SEED_STAFF);
    }
    try {
        const response = await fetch(MOCK_API_STAFF);
        if (!response.ok) throw new Error("MockAPI failed");
        const data = await response.json();
        return data.map((s, idx) => ({ ...s, id: s.id ? String(s.id) : String(idx + 1) }));
    } catch (e) {
        console.warn("Fallback to Local Staff CRUD", e);
        return getLocalData("local_staff", SEED_STAFF);
    }
}

export async function apiCreateStaff(staff) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_staff", SEED_STAFF);
        const newStaff = { ...staff, id: String(Date.now()) };
        list.push(newStaff);
        setLocalData("local_staff", list);
        return newStaff;
    }
    const res = await fetch(MOCK_API_STAFF, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(staff)
    });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
}

export async function apiUpdateStaff(id, staff) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_staff", SEED_STAFF);
        const index = list.findIndex(s => String(s.id) === String(id));
        if (index !== -1) {
            list[index] = { ...list[index], ...staff };
            setLocalData("local_staff", list);
            return list[index];
        }
        throw new Error("Not found");
    }
    const res = await fetch(`${MOCK_API_STAFF}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(staff)
    });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
}

export async function apiDeleteStaff(id) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_staff", SEED_STAFF);
        const filtered = list.filter(s => String(s.id) !== String(id));
        setLocalData("local_staff", filtered);
        return true;
    }
    const res = await fetch(`${MOCK_API_STAFF}/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error("API failed");
    return true;
}

// ==================== ORDERS CRUD ====================
export async function fetchOrders() {
    if (getDataSourceMode() === "local") {
        return getLocalData("local_orders", SEED_ORDERS);
    }
    try {
        const response = await fetch(MOCK_API_ORDERS);
        if (!response.ok) throw new Error("MockAPI failed");
        const data = await response.json();
        return data.map((o, idx) => ({ ...o, id: o.id ? String(o.id) : String(idx + 1) }));
    } catch (e) {
        console.warn("Fallback to Local Orders CRUD", e);
        return getLocalData("local_orders", SEED_ORDERS);
    }
}

export async function apiCreateOrder(order) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_orders", SEED_ORDERS);
        const newOrder = { ...order, id: order.id || "ORD-" + Math.floor(100000 + Math.random() * 900000) };
        list.push(newOrder);
        setLocalData("local_orders", list);
        return newOrder;
    }
    const res = await fetch(MOCK_API_ORDERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
}

export async function apiUpdateOrder(id, order) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_orders", SEED_ORDERS);
        const index = list.findIndex(o => String(o.id) === String(id));
        if (index !== -1) {
            list[index] = { ...list[index], ...order };
            setLocalData("local_orders", list);
            return list[index];
        }
        throw new Error("Not found");
    }
    const res = await fetch(`${MOCK_API_ORDERS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
}

export async function apiDeleteOrder(id) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_orders", SEED_ORDERS);
        const filtered = list.filter(o => String(o.id) !== String(id));
        setLocalData("local_orders", filtered);
        return true;
    }
    const res = await fetch(`${MOCK_API_ORDERS}/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error("API failed");
    return true;
}

// ==================== INVOICES CRUD ====================
export async function fetchInvoices() {
    if (getDataSourceMode() === "local") {
        return getLocalData("local_invoices", SEED_INVOICES);
    }
    try {
        const response = await fetch(MOCK_API_INVOICES);
        if (!response.ok) throw new Error("MockAPI failed");
        const data = await response.json();
        return data.map((inv, idx) => ({ ...inv, id: inv.id ? String(inv.id) : String(idx + 1) }));
    } catch (e) {
        console.warn("Fallback to Local Invoices CRUD", e);
        return getLocalData("local_invoices", SEED_INVOICES);
    }
}

export async function apiCreateInvoice(invoice) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_invoices", SEED_INVOICES);
        const newInvoice = { ...invoice, id: invoice.id || "INV-" + Math.floor(100000 + Math.random() * 900000) };
        list.push(newInvoice);
        setLocalData("local_invoices", list);
        return newInvoice;
    }
    const res = await fetch(MOCK_API_INVOICES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice)
    });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
}

export async function apiUpdateInvoice(id, invoice) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_invoices", SEED_INVOICES);
        const index = list.findIndex(inv => String(inv.id) === String(id));
        if (index !== -1) {
            list[index] = { ...list[index], ...invoice };
            setLocalData("local_invoices", list);
            return list[index];
        }
        throw new Error("Not found");
    }
    const res = await fetch(`${MOCK_API_INVOICES}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice)
    });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
}

export async function apiDeleteInvoice(id) {
    if (getDataSourceMode() === "local") {
        const list = getLocalData("local_invoices", SEED_INVOICES);
        const filtered = list.filter(inv => String(inv.id) !== String(id));
        setLocalData("local_invoices", filtered);
        return true;
    }
    const res = await fetch(`${MOCK_API_INVOICES}/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error("API failed");
    return true;
}
