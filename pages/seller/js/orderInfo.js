// Function to toggle the sidebar visibility
function toggleSidebar() {
 document.getElementById("sidebar").classList.toggle("active");
 }


 function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

let orders = getOrders();
let products = getProducts();
let users = getUsers();

// إعادة بناء الطلبات بحيث نضيف بيانات العميل والمنتج
orders = orders.map(order => {
  let buyer = users.find(u => u.username === order.buyer);
  let product = products.find(p => p.id === order.product_id);

  return {
    id: order.id,
    customer: buyer ? buyer.name : order.buyer,
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
});
 



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
           switch (order.status) {
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
         }


         let total = order.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
         document.getElementById("order-total").innerHTML = `$${total}`;




    // get customer information by id
    /* let customerId = parseInt(urlParams.get('id'));
    let customer = customerInfo.find(customer => customer.id === customerId); */
    // display customer information
    
        document.getElementById("name").innerHTML = order.customer;
        document.getElementById("email").innerHTML = order.email;
        document.getElementById("phone").innerHTML = order.phone;
        document.getElementById("address").innerHTML = order.address;

    

 
            // Get the table where products will be inserted
            let table = document.getElementById("product-table");
            // Loop through each product and create a table row for it
            order.products.forEach(product => {
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
                
                








                    
                       




 
