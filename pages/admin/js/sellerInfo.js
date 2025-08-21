let users = JSON.parse(localStorage.getItem("users")) || [];
let stores = JSON.parse(localStorage.getItem("stores")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let params = new URLSearchParams(window.location.search);
let sellerId = params.get("id"); // بنجيب id من الرابط

let seller = users.find(u => u.role === "Seller" && u.id == sellerId);

if (seller) {
    // بيانات البائع
    document.getElementById("sellerName").textContent = seller.username;
    document.getElementById("sellerId").textContent = seller.id;
    document.getElementById("sellerEmail").textContent = seller.email;
    document.getElementById("sellerPhone").textContent = seller.phone;
    document.getElementById("sellerLocation").textContent = seller.location;
    document.getElementById("sellerImg").src = seller.logo ? "../../images/" + seller.logo : "../../images/store.jpg";

    // بيانات المتجر (من stores)
    let store = stores.find(s => s.id == seller.store_id);
    if (store) {
        document.getElementById("storeLink").textContent = store.name;
        document.getElementById("storeLink").href = `storeInfo.html?id=${store.id}`;
        document.getElementById("storeDesc").textContent = store.description || "-";
    }

    // طلبات البائع
    let sellerOrders = orders.filter(o => o.sellerId == seller.id);
    let tbody = document.getElementById("sellerOrders");
    tbody.innerHTML = "";

    if (sellerOrders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center">No orders found</td></tr>`;
    } else {
        sellerOrders.forEach(order => {
            let buyer = users.find(u => u.id == order.buyerId) || {};

            // تحديد لون الحالة
            let statusClass = "";
            switch (order.status) {
                case "new":
                    statusClass = "bg-secondary";
                    break;
                case "inqueue":
                    statusClass = "bg-warning text-dark";
                    break;
                case "out to serve":
                    statusClass = "bg-info";
                    break;
                case "complete":
                    statusClass = "bg-success";
                    break;
                default:
                    statusClass = "bg-primary";
            }

            tbody.innerHTML += `
                <tr>
                    <td><a href="orderInfo.html?id=${order.id}">#${order.id}</a></td>
                    <td>${order.date}</td>
                    <td><a href="UserInfo.html?id=${buyer.id || ""}">${buyer.username || "Unknown"}</a></td>
                    <td>$${order.total}</td>
                    <td><span class="badge ${statusClass}">${order.status}</span></td>
                </tr>
            `;
        });
    }
} else {
    alert("Seller not found!");
}