// Function to toggle the sidebar visibility
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }
 /*  let orders = [
    {
       id: 1, 
       customer: "Zoe Smith", 
       qty: 2, 
       date: "2025-07-20", 
       status: "Pending", 
       total: 140
      },
      {
        id: 2,
        customer: "John Marsel", 
        qty: 1, 
        date: "2025-06-16", 
        status: "Delivered", 
        total: 65
        }
        ]; */

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

        