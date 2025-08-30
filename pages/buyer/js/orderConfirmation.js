document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');

    if (!orderId) {
        alert('No order ID found. Redirecting to home page.');
        window.location.href = 'index.html';
        return;
    }

    loadOrderDetails(orderId);
});

function loadOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id == orderId);

    if (!order) {
        alert('Order not found. Redirecting to home page.');
        window.location.href = 'index.html';
        return;
    }

    // Format date
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Delivery date
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('order-number').textContent = `#${order.id}`;
    document.getElementById('order-date').textContent = formattedDate;
    document.getElementById('delivery-date').textContent = formattedDeliveryDate;
    document.getElementById('order-total').textContent = `$${order.total.toFixed(2)}`;

    // shipping غير موجود عندك فهعرض buyerId مؤقتاً
    document.getElementById('shipping-address').textContent = `Buyer ID: ${order.buyerId}`;

    document.getElementById('view-order-btn').href = `orderInfo.html?id=${order.id}`;

    notifySellers(order);
}

function notifySellers(order) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const sellers = users.filter(user => user.role === 'Seller');

    const sellerNotifications = JSON.parse(localStorage.getItem('sellerNotifications')) || {};

    sellers.forEach(seller => {
        if (!sellerNotifications[seller.id]) {
            sellerNotifications[seller.id] = [];
        }
        const alreadyNotified = sellerNotifications[seller.id].some(notif => notif.orderId === order.id);

        if (!alreadyNotified) {
            sellerNotifications[seller.id].push({
                orderId: order.id,
                date: new Date().toISOString(),
                status: 'new',
                message: `New order #${order.id} received`
            });
        }
    });

    localStorage.setItem('sellerNotifications', JSON.stringify(sellerNotifications));
}