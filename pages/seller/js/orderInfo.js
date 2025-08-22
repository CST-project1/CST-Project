// Function to toggle the sidebar visibility
function toggleSidebar() {
 document.getElementById("sidebar").classList.toggle("active");
 }

 document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "Seller") return;

  const brandName = document.getElementById("brandName");
  brandName.textContent = currentUser.brand_name;
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


 function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

window.orders = getOrders();
window.products = getProducts();
window.users = getUsers();

// get id from url
let urlParams = new URLSearchParams(window.location.search);
let productId = parseInt( urlParams.get('id'));
// get order by id
let order = orders.find(order => order.id === productId);


if (order) {
  let buyer = users.find(u => u.id === order.buyerId);
  let product = products.find(p => p.id === order.product_id);

 let formattedOrder = {
    id: order.id,
    customer: buyer ? buyer.name : "Unknown Customer",
    email: buyer ? buyer.email : "",
    phone: buyer ? buyer.phone : "",
    address: buyer ? buyer.location : "",
    qty: order.quantity,
    date: order.date,
    status: order.status,
    products: product
      ? [{ name: product.name, price: product.price, quantity: order.quantity }]
      : [],
  };

 



          
          // display order information
          
            document.getElementById("order-id").innerHTML = formattedOrder.id;
            document.getElementById("customer-name").innerHTML = formattedOrder.customer;
            document.getElementById("quantity").innerHTML = formattedOrder.qty;
            document.getElementById("order-date").innerHTML = formattedOrder.date;
            document.getElementById("order-status").innerHTML = formattedOrder.status;
            document.getElementById("order-total").innerHTML = formattedOrder.total;
            
            let orderStatus = document.getElementById("order-status");
            orderStatus .textContent = formattedOrder.status;
           switch (formattedOrder.status) {
             case "Delivered":
               orderStatus.className = "badge bg-success";
               break;
             case "Cancelled":
               orderStatus.className = "badge bg-danger";
               break;
             case "out to ship":
               orderStatus.className = "badge bg-primary";
               break;
             case "inqueue":
               orderStatus.className = "badge bg-info";
               break;
             case "Processing":
               orderStatus.className = "badge bg-secondary";
               break;
             default:
               orderStatus.className = "badge bg-dark";
               break;
            }
         


         let total = Math.round(formattedOrder.products.reduce((sum, p) => sum + p.price * p.quantity, 0));
         document.getElementById("order-total").innerHTML = `$${total}`;




    // get customer information by id
    /* let customerId = parseInt(urlParams.get('id'));
    let customer = customerInfo.find(customer => customer.id === customerId); */
    // display customer information
    
        document.getElementById("name").innerHTML = formattedOrder.customer;
        document.getElementById("email").innerHTML = formattedOrder.email;
        document.getElementById("phone").innerHTML = formattedOrder.phone;
        document.getElementById("address").innerHTML = formattedOrder.address;

    

 
            // Get the table where products will be inserted
            let table = document.getElementById("product-table");
            table.innerHTML = "";
            // Loop through each product and create a table row for it
            formattedOrder.products.forEach(product => {
                let row = `
                <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>$${product.price}</td>
                <td>$${product.price * product.quantity}</td>
                </tr>
                `;
                // Insert the row into the table
                table.innerHTML += row;
            });
              
            }
                








                    
                       




 
