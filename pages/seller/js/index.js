// Function to toggle the sidebar visibility
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }

  document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "Seller") return;

  const brandName = document.getElementById("brandName");
  brandName.textContent = currentUser.brand_name;

  const allProducts = getProducts();
  const sellerProducts = allProducts.filter(p => p.store_id === currentUser.store_id);
  // Stats
  const totalProducts = sellerProducts.length;
  const inStockUnits = sellerProducts.reduce((sum, p) => sum + Number(p.stock), 0);

  // Update UI
  document.getElementById("totalProducts").innerText = totalProducts;
  document.getElementById("inStockUnits").innerText = inStockUnits;
});
 
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

  


        let rowsPerPage = 3;
        let currentPage = 1;

        function renderTable(page = 1) {
            const tableBody = document.getElementById("orderTable");
            tableBody.innerHTML = "";

            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const pageOrders = orders.slice(start, end);

            pageOrders.forEach(order => {
                tableBody.innerHTML += `
                    <tr onclick="goToOrderInfo(${order.id})" style="cursor:pointer;">
                        <td>#${order.id}</td>
                        <td>${order.customer}</td>
                        <td>${order.qty}</td>
                        <td>${order.date}</td>
                        <td><span class="badge ${getStatusClass(order.status)}">${order.status}</span></td>
                        <td>$${order.total}</td>
                    </tr>
                `;
            });

            // renderPagination();
        }

        function getStatusClass(status) {
            switch (status) {
                case "Pending": return "bg-warning";
                case "Delivered": return "bg-success";
                case "Cancelled": return "bg-danger";
                case "Shipped": return "bg-primary";
                case "Processing": return "bg-info";
                default: return "bg-secondary";
            }
        }

  /*       function renderPagination() {
            const totalPages = Math.ceil(orders.length / rowsPerPage);
            const pagination = document.querySelector("pagination");
            pagination.innerHTML = "";

            for (let i = 1; i <= totalPages; i++) {
                pagination.innerHTML += `
                    <li class="page-item ${i === currentPage ? "active" : ""}">
                        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                    </li>
                `;
            }
        }

        function changePage(page) {
            
            currentPage = page;
            renderTable(page);

        } */

            renderTable();

        function goToOrderInfo(orderId) {
             window.location.href = `orderInfo.html?id=${orderId}`;
        }

        