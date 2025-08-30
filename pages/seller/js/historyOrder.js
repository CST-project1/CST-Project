// Toggle Sidebar
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

// Get current user
const currentUser = getCurrentUser();

document.addEventListener("DOMContentLoaded", () => {

    // لو المستخدم مش بائع نوقف
    if (!currentUser || currentUser.role !== "Seller") return;

    // عرض اسم البراند
    const brandName = document.getElementById("brandName");
    if (brandName) {
        brandName.textContent = currentUser.brand_name;
    }

    // logout function
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", (e) => {
            e.preventDefault(); // منع تحميل الصفحة
            logout(); // استدعاء logout من storage.js
        });
    }

    // عرض الطلبات في الجدول
    const tableBody = document.getElementById("orderTable");
    if (!tableBody) return;

    // جلب البيانات من localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // تصفية الطلبات الخاصة بالبائع الحالي
    orders = orders.filter(order => order.sellerId === currentUser.id);

    tableBody.innerHTML = "";

    // إنشاء الصفوف
    orders.forEach(order => {
        const product = products.find(p => p.id === order.product_id);
        const buyer = users.find(u => u.id === order.buyerId);

        if (!product || !buyer) return;

        let statusClass = "";
        switch (order.status.toLowerCase()) {
            case "delivered":
                statusClass = "bg-success";
                break;
            case "cancelled":
                statusClass = "bg-danger";
                break;
            case "out to ship":
                statusClass = "bg-primary";
                break;
            case "inqueue":
                statusClass = "bg-info";
                break;
            case "processing":
                statusClass = "bg-secondary";
                break;
            default:
                statusClass = "";
        }

        const row = document.createElement("tr");
        row.id = `order-${order.id}`;
        row.innerHTML = `
            <td><img src="../../../images/${product.image}" alt="${product.name}" width="50"></td>
            <td>${product.name}</td>
            <td>$${parseFloat(product.price).toFixed(2)}</td>
            <td>${buyer.name}</td>
            <td><span class="badge ${statusClass}">${order.status}</span></td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteOrder(${order.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
});


// Delete order function
window.deleteOrder = function (id) {

    if (!currentUser || currentUser.role !== "Seller") return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderToDelete = orders.find(order => order.id == id);
    if (!orderToDelete || orderToDelete.sellerId !== currentUser.id) return;

    // حذف الطلب
    orders = orders.filter(order => order.id != id);
    localStorage.setItem("orders", JSON.stringify(orders));

    // إزالة الصف من الجدول
    const row = document.getElementById(`order-${id}`);
    if (row) row.remove();
};