// Function to toggle the sidebar visibility
function toggleSidebar() {
 document.getElementById("sidebar").classList.toggle("active");
 }

 let orders = JSON.parse(localStorage.getItem("orders")) || [];
 let products = JSON.parse(localStorage.getItem("products")) || [];
 let users = JSON.parse(localStorage.getItem("users")) || [];
 
 // check if data loaded
 
console.log("Orders loaded: ", orders);


orders = orders.map(order => {
  let buyer = users.find(u => u.username === order.buyer);
  let product = products.find(p => p.id === order.product_id);

  return {
    id: order.id,
    customer: buyer ? buyer.name : order.buyer || "Unknown",
    qty: order.quantity || 0,
    date: order.date,
    status: order.status,
    products: product
      ? [{ name: product.name, price: product.price, quantity: order.quantity }]
      : [],
    //total: product ? product.price * order.quantity : 0,
  };
});

          let rowsPerPage = 3;
          let currentPage = 1;
          let filteredOrders = orders;

          //function of calculate otder total
          function calculateOrderTotal(order) {
            return order.products.reduce((sum, product) => sum + (product.price || 0) * (product.quantity || 0), 0);
          }
        

        
        function renderTable(page = 1, data = filteredOrders) {
            let tableBody = document.getElementById("orderTable");
            tableBody.innerHTML = "";

            let start = (page - 1) * rowsPerPage;
            let end = start + rowsPerPage;
            let pageOrders = data.slice(start, end);

            pageOrders.forEach(order => {
                tableBody.innerHTML += `
                    <tr>
                        <td onclick="goToOrderInfo(${order.id})" style="cursor:pointer;">#${order.id}</td>
                        <td>${order.customer}</td>
                        <td>${order.qty}</td>
                        <td>${order.date}</td>
                        <td><span class="badge ${getStatusClass(order.status)}" id="status-${order.id}">${order.status}</span>
                        <button class="btn btn-sm btn-primary ms-2" onclick="editOrderStatus(${order.id})">
                         <i class="bi bi-pencil"></i>
                        </button>
                        </td>
                        <td>$${calculateOrderTotal(order)}</td>
                    </tr>
                `;
            });

            renderPagination(data);
        }

        function getStatusClass(status) {
            switch (status) {
                //case "Pending": return "bg-warning";
                case "Delivered": return "bg-success";
                case "Cancelled": return "bg-danger";
                case "out to ship": return "bg-primary";
                case "inqueue": return "bg-info";
                case "Processing": return "bg-secondary";
                default: return "bg-dark";
            }
        }

        //  pagination function 
        function renderPagination(data = filteredOrders) {
            let totalPages = Math.ceil(data.length / rowsPerPage);
            let pagination = document.getElementById("pagination");
            pagination.innerHTML = "";

            if (totalPages === 0) return;

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
                    filteredOrders.sort((a, b) => a.qty - b.qty);
                    } else if (sortBy === "Status") {
                        let statusOrder = {
                            "Delivered":1,
                            //"Pending":2,
                            "Cancelled":3,
                            "out to ship":4,
                            "inqueue":5,
                            "Processing":6
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

    let searchResults;

    // filtering orders based on search term
    if (!isNaN(searchTerm) && searchTerm !== ""){
        searchResults = filteredOrders.filter(order =>
         order.id.toString() ===searchTerm );
        }
        else {
            searchResults = filteredOrders.filter(order =>
            order.customer.toLowerCase().includes(searchTerm));
        }
    /* let searchResults = filteredOrders.filter(order =>
        order.customer.toLowerCase().includes(searchTerm) || // search by customer name
        order.id.toString().includes(searchTerm)          // search by order id
        
    ); */

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


// Edit order status
function editOrderStatus(orderId) {
  let order = orders.find(o => o.id === orderId);
  if (!order) return;

  let newStatus = prompt("Enter new status for this order:", order.status);
  if (!newStatus) return;

  order.status = newStatus;
  localStorage.setItem("orders", JSON.stringify(orders));

  let statusBadge = document.getElementById(`status-${order.id}`);
  statusBadge.textContent = newStatus;
  statusBadge.className = `badge ${getStatusClass(newStatus)}`;
}

      console.log(orders);
console.log(products);
console.log(users);




        
        