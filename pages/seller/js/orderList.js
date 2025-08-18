// Function to toggle the sidebar visibility
function toggleSidebar() {
 document.getElementById("sidebar").classList.toggle("active");
 }

 /* let orders = [
    {
       id: 1, 
       customer: "Zoe Smith", 
       qty: 2, 
       date: "2025-05-10", 
       status: "Pending", 
       total: 140
      },
      {
        id: 2,
        customer: "John Marsel", 
        qty: 1, 
        date: "2025-04-5", 
        status: "Delivered", 
        total: 65
        },
        {
          id: 3,
          customer: "Majesty Brand", 
          qty: 2, 
          date: "2025-07-20", 
          status: "Cancelled", 
          total: 160
          },
          {
        id: 4,
        customer: "John Marsel", 
        qty: 1, 
        date: "2025-08-16", 
        status: "Delivered", 
        total: 65
        },
      {
       id: 5, 
       customer: "Zoe Smith", 
       qty: 2, 
       date: "2025-07-20", 
       status: "Pending", 
       total: 140
      },
          {
          id: 6,
          customer: "Majesty Brand", 
          qty: 2, 
          date: "2025-04-16", 
          status: "Cancelled", 
          total: 160
          },
          {
       id: 7, 
       customer: "Zoe Smith", 
       qty: 2, 
       date: "2025-03-20", 
       status: "Pending", 
       total: 100
      },
      {
       id: 8, 
       customer: "Zoe Smith", 
       qty: 2, 
       date: "2025-08-20", 
       status: "Pending", 
       total: 120
      },
          ]; */

          let rowsPerPage = 3;
          let currentPage = 1;
          let filteredOrders = orders;

          //function of calculate otder total
          function calculateOrderTotal(order) {
            return order.products.reduce((sum, product) => sum + product.price * product.quantity, 0);
          }
        

        
        function renderTable(page = 1, data = filteredOrders) {
            let tableBody = document.getElementById("orderTable");
            tableBody.innerHTML = "";

            let start = (page - 1) * rowsPerPage;
            let end = start + rowsPerPage;
            let pageOrders = data.slice(start, end);

            pageOrders.forEach(order => {
                tableBody.innerHTML += `
                    <tr onclick="goToOrderInfo(${order.id})" style="cursor:pointer;">
                        <td>#${order.id}</td>
                        <td>${order.customer}</td>
                        <td>${order.qty}</td>
                        <td>${order.date}</td>
                        <td><span class="badge ${getStatusClass(order.status)}">${order.status}</span></td>
                        <td>$${calculateOrderTotal(order)}</td>
                    </tr>
                `;
            });

            renderPagination(data);
        }

        function getStatusClass(status) {
            switch (status) {
                case "Pending": return "bg-warning";
                case "Delivered": return "bg-success";
                case "Cancelled": return "bg-danger";
                // case "Shipped": return "bg-primary";
                // case "Processing": return "bg-info";
                default: return "bg-secondary";
            }
        }

        //  pagination function 
        function renderPagination(data = filteredOrders) {
            let totalPages = Math.ceil(data.length / rowsPerPage);
            let pagination = document.getElementById("pagination");
            pagination.innerHTML = "";

            // previous button
            pagination.innerHTML += `<li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <button class="page-link" onclick="changePage(${currentPage - 1})">Previous
            </button>
            </li>`;

            

             // page numbers
            for (let i = 1; i <= totalPages; i++) {
                pagination.innerHTML += `
                    <li class="page-item ${i === currentPage ? "active" : ""}">
                        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                    </li>
                `;
            }

            // next button
            pagination.innerHTML += `<li class="page-item ${currentPage === totalPages ? "disabled" : "" }">
            <button class="page-link" onclick="changePage(${currentPage + 1})">Next
            </button>
            </li>`;
        }

        function changePage(page) {
            
            currentPage = page;
            renderTable(page, filteredOrders);
        }

        function goToOrderInfo(orderId) {
             window.location.href = `orderInfo.html?id=${orderId}`;
        }

        renderTable();

        
 
        //   sort the oeders by date in ascending order and then by status in ascending order and then by amount in ascending order
        let sortSelect = document.getElementById("sortSelect");
        sortSelect.addEventListener("change", function() {
            let sortBy = this.value.trim();
            // console.log("Sorting by:", sortBy);
            if (sortBy === "Date") {
                filteredOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
                } else if (sortBy === "Amount") {
                    filteredOrders.sort((a, b) => a.total - b.total);
                    } else if (sortBy === "Status") {
                        let statusOrder = {
                            "Delivered":1,
                            "Pending":2,
                            "Cancelled":3
                        };
                        filteredOrders.sort((a, b) => {return statusOrder[a.status] - statusOrder[b.status];
                            
                        });
                        // orders.sort((a, b) => a.status.localeCompare(b.status));
                            }

                            currentPage = 1;
                            renderTable(currentPage);
                        });


            //   status filtering 
 let statusFilter = document.getElementById("statusFilter");
 statusFilter.addEventListener("change", function() {
     let status = this.value.trim();
     
     
     if(status === "All Status"){
         filteredOrders = orders;
         }
         else{
             filteredOrders = orders.filter(order => order.status === status);
             }
             currentPage = 1;
             renderTable(currentPage, filteredOrders);
             
             });


        // saerch in orders table
let searchInput = document.getElementById("SearchInput");

searchInput.addEventListener("input", function () {
    let searchTerm = this.value.trim().toLowerCase();

    // filtering orders based on search term
    let searchResults = filteredOrders.filter(order =>
        order.customer.toLowerCase().includes(searchTerm) || // search by customer name
        order.id.toString().includes(searchTerm)          // search by order id
        
    );

    currentPage = 1;
    renderTable(currentPage, searchResults);
});
       

// search with date input
let dateInput = document.getElementById("dateInput");
dateInput.addEventListener("change", function () {
    let date = this.value.trim();
    let dateFilter = orders.filter(order => order.date === date);
    currentPage = 1;
    renderTable(currentPage, dateFilter);
    });

      




        
        