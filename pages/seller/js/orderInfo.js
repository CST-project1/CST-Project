// Function to toggle the sidebar visibility
function toggleSidebar() {
 document.getElementById("sidebar").classList.toggle("active");
 }
// order information
let orders = [
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
        },
        {
          id: 3,
          customer: "Majesty Brand", 
          qty: 2, 
          date: "2025-06-16", 
          status: "Cancelled", 
          total: 160
          }
          ];
          // get id from url
          let urlParams = new URLSearchParams(window.location.search);
          let productId = parseInt( urlParams.get('id'));
          // get order by id
          let order = orders.find(order => order.id === productId);
          // display order information
          if (order) {
            document.getElementById("order-id").innerHTML = order.id;
            document.getElementById("customer-name").innerHTML = order.customer;
            document.getElementById("quantity").innerHTML = order.qty;
            document.getElementById("order-date").innerHTML = order.date;
            document.getElementById("order-status").innerHTML = order.status;
            document.getElementById("order-total").innerHTML = order.total;
            
            let orderStatus = document.getElementById("order-status");
            orderStatus .textContent = order.status;
            if (order.status === "Delivered") {
                orderStatus.className = "badge bg-success";
                } else if (order.status === "Cancelled") {
                    orderStatus.className = "badge bg-danger";
                    } else if (order.status === "Pending") {
                        orderStatus.className = "badge bg-warning";
                        } else {
                            orderStatus.className = "badge bg-secondary";
                            }
                            } else {
                                document.getElementById("order-id").innerHTML = `<p class="text-danger">order not found!</p>`;
                            }


// customer information
let customerInfo = [
    {
        id: 1,
        name: "Zoe Smith",
        email: "zoe.smith@example.com",
        phone: "9876543210",
        address: "456 Elm St, Anytown, USA",
        
       
    },
    
    {
        
        id: 2,
        name: "John Marsel",
        email: "john.marsel@example.com",
        phone: "1234567890",
        address: "123 Main St, Anytown, USA",
    },
    ];
    // get customer information by id
    let customerId = parseInt(urlParams.get('id'));
    let customer = customerInfo.find(customer => customer.id === customerId);
    // display customer information
    if (customer) {
        document.getElementById("name").innerHTML = customer.name;
        document.getElementById("email").innerHTML = customer.email;
        document.getElementById("phone").innerHTML = customer.phone;
        document.getElementById("address").innerHTML = customer.address;

    }

    // product information
    let productInfo = [
        {
            id: 1,
            name:  "Rose Elegance",
            quantity: 2,
            price:  "$120",
            total: "$240",
            },
        {
            id: 2,
            name: "Golden Mist",
            quantity: 1,
            price: "$95",
            total: "$95",
            },
        /* {
            id: 3,
            name: "Stranger with you",
            quantity: 3,
            price: "$120",
            total: "$360",
            } */
            ];
            // Get the table where products will be inserted
            let table = document.getElementById("product-table");
            // Loop through each product and create a table row for it
            productInfo.forEach(product => {
                let row = `
                <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>${product.total}</td>
                </tr>
                `;
                // Insert the row into the table
                table.innerHTML += row;
            });
                
                








                    
                       




 
