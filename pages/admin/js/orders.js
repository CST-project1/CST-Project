 let orders = JSON.parse(localStorage.getItem("orders")) || [];
 let users = JSON.parse(localStorage.getItem("users")) || [];
 let products = JSON.parse(localStorage.getItem("products")) || [];

 const tbody = document.getElementById("ordersTableBody");
 const searchInput = document.getElementById("searchInput");
 const statusFilter = document.getElementById("statusFilter");
 const priceFilter = document.getElementById("priceFilter");
 const priceValue = document.getElementById("priceValue");

 // Render Orders
 function renderOrders(list) {
     tbody.innerHTML = "";
     if (list.length === 0) {
         tbody.innerHTML = `<tr><td colspan="6" class="text-center">No Orders Found</td></tr>`;
         return;
     }

     list.forEach(order => {
         // هنا نجيب الباير بالـ id
         let buyer = users.find(u => u.id == order.buyerId) || {};
         let product = products.find(p => p.id == order.product_id) || {};

         let statusClass = "";
         switch (order.status) {
             case "Processing":
                 statusClass = "bg-secondary"; // رمادي
                 break;
             case "Delivered":
                 statusClass = "bg-warning text-dark"; // اصفر
                 break;
             case "out to ship":
                 statusClass = "bg-info"; // سماوي
                 break;
             case "Delivered":
                 statusClass = "bg-success"; // اخضر
                 break;
             case "Cancelled":
                 statusClass = "bg-danger"; // احمر
                 break;
             default:
                 statusClass = "bg-primary"; // افتراضي
         }

         tbody.innerHTML += `
          <tr>
            <td>
              <a href="orderInfo.html?id=${order.id}">
                <div>
                  <div class="fw-semibold">${buyer.username || "Unknown"}</div>
                  <div class="text-muted small">#${order.id}</div>
                </div>
              </a>
            </td>
            <td class="text-muted">${order.payment || "cash"}</td>
            <td>$${order.total}</td>
            <td>${order.quantity} product(s)</td>
            <td><span class="badge ${statusClass}">${order.status}</span></td>
            <td>
              <button class="btn btn-sm btn-outline-danger" onclick="deleteOrder(${order.id})">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        `;
     });
 }

 // Delete Order
 function deleteOrder(id) {
     if (confirm("Are you sure to delete this order?")) {
         orders = orders.filter(o => o.id !== id);
         localStorage.setItem("orders", JSON.stringify(orders));
         renderOrders(orders);
     }
 }

 // Filters
 function applyFilters() {
     let searchVal = searchInput.value.toLowerCase();
     let statusVal = statusFilter.value;
     let priceVal = parseInt(priceFilter.value);

     let filtered = orders.filter(order => {
         let buyer = users.find(u => u.id == order.buyerId) || {};
         let matchSearch = order.id.toString().includes(searchVal) || (buyer.username || "")
             .toLowerCase().includes(searchVal);
         let matchStatus = statusVal ? order.status === statusVal : true;
         let matchPrice = order.total >= priceVal;
         return matchSearch && matchStatus && matchPrice;
     });

     renderOrders(filtered);
 }

 searchInput.addEventListener("input", applyFilters);
 statusFilter.addEventListener("change", applyFilters);
 priceFilter.addEventListener("input", () => {
     priceValue.textContent = `$${priceFilter.value}+`;
     applyFilters();
 });

 renderOrders(orders);