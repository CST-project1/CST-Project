function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }

   // logout function
document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault(); // stop <a> from reloading page
      logout(); // call logout from storage.js
    });
  }
});

// delet the order
window.deleteOrder = function(id) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders = orders.filter(order => order.id != id); // تجاهل النوع
    localStorage.setItem("orders", JSON.stringify(orders));
    const row = document.getElementById(`order-${id}`);
    if(row) row.remove(); 
};


document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("orderTable");

    // local storage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    tableBody.innerHTML = "";

    // rows
    orders.forEach(order => {
        const product = products.find(p => p.id === order.product_id);
        const buyer = users.find(u => u.id === order.buyerId);

        if (!product || !buyer) return; 

        
        let statusClass = "";
        switch(order.status.toLowerCase()) {
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
            <td><img src="../../../${product.image}" alt="${product.name}" width="50"></td>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
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



