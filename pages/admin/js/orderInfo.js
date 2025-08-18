        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let products = JSON.parse(localStorage.getItem("products")) || [];
        let stores = JSON.parse(localStorage.getItem("stores")) || [];

        // get order id from url
        let params = new URLSearchParams(window.location.search);
        let orderId = parseInt(params.get("id"));

        let order = orders.find(o => o.id == orderId);

        if (order) {
            // fill order info
            document.querySelector("#orderId").textContent = "#" + order.id;
            document.querySelector("#orderDate").textContent = order.date;
            document.querySelector("#orderStatus").textContent = order.status;
            document.querySelector("#orderTotal").textContent = "$" + order.total;

            // get buyer
            let buyer = users.find(u => u.username === order.buyer);
            if (buyer) {
                document.querySelector("#customerName").textContent = buyer.name || buyer.username;
                document.querySelector("#customerEmail").textContent = buyer.email || "-";
                document.querySelector("#customerPhone").textContent = buyer.phone || "-";
                document.querySelector("#customerAddress").textContent = buyer.location || "-";
            }

            // get product
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
            }

            // get seller by product.store_id
            let sellerStore = stores.find(s => s.id == product.store_id);
            if (sellerStore) {
                let seller = users.find(u => u.id == sellerStore.ownerId);
                document.querySelector("#storeName").innerHTML =
                    `<a href="storeInfo.html?id=${sellerStore.id}">${sellerStore.name}</a>`;
                if (seller) {
                    document.querySelector("#sellerName").innerHTML =
                        `<a href="sellerInfo.html?id=${seller.id}">${seller.name || seller.username}</a>`;
                    document.querySelector("#sellerPhone").textContent = seller.phone || "-";
                    document.querySelector("#sellerLocation").textContent = seller.location || "-";
                }
            }
        } else {
            alert("Order not found!");
        }