document.addEventListener('DOMContentLoaded', function() {
    // Get order ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    
    if (!orderId) {
        alert('No order ID found. Redirecting to home page.');
        window.location.href = 'index.html';
        return;
    }
    
    // Load order details
    loadOrderDetails(orderId);
});

function loadOrderDetails(orderId) {
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id == orderId);
    
    if (!order) {
        alert('Order not found. Redirecting to home page.');
        window.location.href = 'index.html';
        return;
    }
    
    // Format dates
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Calculate delivery date (3-5 business days)
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update page with order details
    document.getElementById('order-number').textContent = `#${order.id}`;
    document.getElementById('order-date').textContent = formattedDate;
    document.getElementById('delivery-date').textContent = formattedDeliveryDate;
    document.getElementById('order-total').textContent = `$${order.total.toFixed(2)}`;
    
    // Format shipping address
    const shippingAddress = `${order.shipping.address}, ${order.shipping.city}, ${order.shipping.zip}, ${order.shipping.country}`;
    document.getElementById('shipping-address').textContent = shippingAddress;
    
    // Update view order button
    document.getElementById('view-order-btn').href = `orderInfo.html?id=${order.id}`;
    
    // Send order to sellers (simulated)
    notifySellers(order);
}

function notifySellers(order) {
    // In a real application, this would send notifications to sellers
    // For now, we'll just log to console and update localStorage
    
    console.log(`Order #${order.id} has been placed and should be sent to sellers`);
    
    // Get users to find sellers
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const sellers = users.filter(user => user.role === 'Seller');
    
    // Get existing seller notifications or initialize
    const sellerNotifications = JSON.parse(localStorage.getItem('sellerNotifications')) || {};
    
    // Add order to each seller's notifications
    sellers.forEach(seller => {
        if (!sellerNotifications[seller.id]) {
            sellerNotifications[seller.id] = [];
        }
        
        // Check if this order is already notified to prevent duplicates
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
    
    // Save notifications to localStorage
    localStorage.setItem('sellerNotifications', JSON.stringify(sellerNotifications));
    
    console.log('Sellers notified about the new order');
}