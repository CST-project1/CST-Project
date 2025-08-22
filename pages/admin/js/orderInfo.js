let orders = JSON.parse(localStorage.getItem("orders")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];
let stores = JSON.parse(localStorage.getItem("stores")) || [];

let params = new URLSearchParams(window.location.search);
let orderId = parseInt(params.get("id"));
let order = orders.find(o => o.id == orderId);

if (order) {
    // Order info
    document.querySelector("#orderId").textContent = "#" + order.id;
    document.querySelector("#orderDate").textContent = order.date;
    document.querySelector("#orderStatus").textContent = order.status;
    document.querySelector("#orderTotal").textContent = "$" + order.total;

    // Buyer info
    let buyer = users.find(u => u.id == order.buyerId);
    if (buyer) {
        document.querySelector("#customerName").textContent = buyer.name || buyer.username;
        document.querySelector("#customerEmail").textContent = buyer.email || "-";
        document.querySelector("#customerPhone").textContent = buyer.phone || "-";
        document.querySelector("#customerAddress").textContent = buyer.location || "-";
    }

    // Product info
    let product = products.find(p => p.id == order.product_id);
    if (product) {
        let tbody = document.querySelector("#orderProducts");
        tbody.innerHTML = `
            <tr>
                <td><a href="productInfo.html?id=${product.id}">${product.name}</a></td>
                <td>${order.quantity}</td>
                <td>$${product.price}</td>
                <td>$${order.total}</td>
            </tr>
        `;

        // Seller & store info
        let sellerStore = stores.find(s => s.id == product.store_id);
        if (sellerStore) {
            document.querySelector("#storeName").innerHTML =
                `<a href="storeInfo.html?id=${sellerStore.id}">${sellerStore.name}</a>`;
            let seller = users.find(u => u.username === sellerStore.owner);
            if (seller) {
                document.querySelector("#sellerName").innerHTML =
                    `<a href="sellerInfo.html?id=${seller.id}">${seller.name || seller.username}</a>`;
                document.querySelector("#sellerPhone").textContent = seller.phone || "-";
                document.querySelector("#sellerLocation").textContent = seller.location || "-";
            }
        }
    }
} else {
    alert("Order not found!");
}