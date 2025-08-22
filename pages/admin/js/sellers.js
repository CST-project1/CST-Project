document.addEventListener("DOMContentLoaded", () => {
    const sellersTable = document.getElementById("sellersTable");

    let sellers = JSON.parse(localStorage.getItem("users")) || [];
    let stores = JSON.parse(localStorage.getItem("stores")) || [];
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    function renderSellers() {
        if (!sellersTable) return; // لو مش موجود العنصر
        sellersTable.innerHTML = "";

        sellers
            .filter(user => user.role === "Seller")
            .forEach(seller => {
                const store = stores.find(s => s.id === seller.store_id);
                const storeName = store ? store.name : "No Store";

                const hasProducts = products.some(p => p.seller_id === seller.id);
                const hasOrders = orders.some(o => o.seller_id === seller.id);
                const status = hasProducts || hasOrders ? "active" : "inactive";

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>
                        <div class="d-flex align-items-center">
                            <a href="sellerInfo.html?id=${seller.id}" class="d-flex align-items-center">
                            <img src="${seller.logo ? '../../../images/' + seller.logo : '../../../../images/store1.jpg'}" 
                                 alt="${seller.name}" 
                                 class="me-3 rounded-circle" 
                                 style="width:40px;height:40px;object-fit:cover;">
                            <div>
                                <div class="fw-semibold">${seller.name}</div>
                                <div class="text-muted small">#${seller.id}</div>
                            </div>
                            </a>
                        </div>
                    </td>
                    <td>${seller.email}</td>
                    <td>${seller.gender}</td>
                    <td>${storeName}</td>
                    <td>
                        <span class="badge ${status === "active" ? "bg-success" : "bg-danger"}">${status}</span>
                    </td>
                    <td>
                        <button onclick="editSeller('${seller.id}')" class="btn btn-sm btn-outline-primary me-1">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onclick="deleteSeller('${seller.id}')" class="btn btn-sm btn-outline-danger">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                sellersTable.appendChild(row);
            });
    }

    function deleteSeller(id) {
        if (confirm("Are you sure you want to delete this seller?")) {
            sellers = sellers.filter(s => s.id !== id);
            localStorage.setItem("users", JSON.stringify(sellers));
            renderSellers();
        }
    }

    window.deleteSeller = deleteSeller;
    window.renderSellers = renderSellers;

    renderSellers();
});