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

let rowsPerPage = 9;
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
                        <td>${order.quantity}</td>
                        <td>${order.date}</td>
                         <td>$${order.totalPrice}</td>
                        <td><span class="badge ${getStatusClass(order.status)}">${order.status}</span></td>   
                    </tr>
                `;
    });

    renderPagination();
}

function getStatusClass(status) {
    switch (status) {
        case "Pending":
            return "bg-warning";
        case "Delivered":
            return "bg-success";
        case "Cancelled":
            return "bg-danger";
        case "Shipped":
            return "bg-primary";
        case "Processing":
            return "bg-info";
        default:
            return "bg-secondary";
    }
}



function goToOrderInfo(orderId) {
    window.location.href = `orderInfo.html?id=${orderId}`;
}

renderTable();