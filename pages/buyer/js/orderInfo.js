let orders = [
    {
        id: 1,
        quantity: 2,
        date: "2025-07-20",
        totalPrice: 140,
        status: "Delivered",
    },
    {
        id: 2,
        quantity: 1,
        date: "2025-07-21",
        totalPrice: 100,
        status: "Pending",
    },
    {
        id: 3,
        quantity: 3,
        date: "2025-07-22",
        totalPrice: 170,
        status: "Cancelled",
    },
    {
        id: 4,
        quantity: 1,
        date: "2025-07-23",
        totalPrice: 200,
        status: "Pending",
    },
    {
        id: 5,
        quantity: 2,
        date: "2025-07-24",
        totalPrice: 140,
        status: "Delivered",
    },
    {
        id: 6,
        quantity: 3,
        date: "2025-07-25",
        totalPrice: 140,
        status: "Processing",
    },
    {
        id: 7,
        quantity: 1,
        date: "2025-07-26",
        totalPrice: 140,
        status: "Pending",
    },
    {
        id: 8,
        quantity: 1,
        date: "2025-07-27",
        totalPrice: 140,
        status: "Cancelled",
    },
    {
        id: 9,
        quantity: 4,
        date: "2025-07-28",
        totalPrice: 140,
        status: "Processing",
    }
];

// get id from url
let urlParams = new URLSearchParams(window.location.search);
let productId = parseInt(urlParams.get('id'));
// get order by id
let order = orders.find(order => order.id === productId);
// display order information
if (order) {
    document.getElementById("order-id").innerHTML = order.id;
    document.getElementById("quantity").innerHTML = order.qty;
    document.getElementById("order-date").innerHTML = order.date;
    document.getElementById("order-totalPrice").innerHTML = order.total;
    document.getElementById("order-status").innerHTML = order.status;


    let orderStatus = document.getElementById("order-status");
    orderStatus.textContent = order.status;
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


// product information
let productInfo = [
    {
        id: 1,
        name: "Rose Elegance",
        quantity: 2,
        price: "$120",
        total: "$240",
    },
    {
        id: 2,
        name: "Golden Mist",
        quantity: 1,
        price: "$95",
        total: "$95",
    },
    {
        id: 3,
        name: "Stranger with you",
        quantity: 3,
        price: "$120",
        total: "$360",
    }
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