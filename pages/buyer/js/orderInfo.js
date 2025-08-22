document.addEventListener('DOMContentLoaded', function() {
    // Get order ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    
    if (!orderId) {
        alert('No order ID found. Redirecting to order history.');
        window.location.href = 'orderHistory.html';
        return;
    }
    
    // Load order details
    loadOrderDetails(orderId);
    
    // Set up event listeners
    document.getElementById('reorder-btn').addEventListener('click', function() {
        reorderItems(orderId);
    });
    
    document.getElementById('cancel-order-btn').addEventListener('click', function() {
        cancelOrder(orderId);
    });
    
    document.getElementById('contact-support-btn').addEventListener('click', function() {
        contactSupport(orderId);
    });
});

function loadOrderDetails(orderId) {
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id == orderId);
    
    if (!order) {
        alert('Order not found. Redirecting to order history.');
        window.location.href = 'orderHistory.html';
        return;
    }
    
    // Update order header
    document.getElementById('order-id').textContent = order.id;
    document.getElementById('order-status-badge').textContent = order.status;
    document.getElementById('order-status-badge').className = `order-status-badge ${order.status.toLowerCase().replace(' ', '-')}`;
    
    // Format date
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update order details
    document.getElementById('order-date').textContent = formattedDate;
    document.getElementById('order-status').textContent = order.status;
    document.getElementById('payment-method').textContent = order.payment || 'Credit Card';
    document.getElementById('payment-status').textContent = 'Paid';
    
    // Format shipping address
    if (order.shipping) {
        const shippingAddress = `${order.shipping.address}, ${order.shipping.city}, ${order.shipping.zip}, ${order.shipping.country}`;
        document.getElementById('shipping-address').textContent = shippingAddress;
    }
    
    // Calculate delivery date
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('estimated-delivery').textContent = formattedDeliveryDate;
    
    // Generate tracking number
    document.getElementById('tracking-number').textContent = `TRK${order.id}`;
    
    // Display order items
    displayOrderItems(order.items);
    
    // Update totals
    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('grand-total').textContent = `$${total.toFixed(2)}`;
    
    // Show/hide cancel button based on order status
    if (order.status !== 'Processing') {
        document.getElementById('cancel-order-btn').style.display = 'none';
    }
}

function displayOrderItems(items) {
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = '';
    
    if (!items || items.length === 0) {
        orderItemsContainer.innerHTML = '<p class="no-items">No items in this order</p>';
        return;
    }
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <div class="item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        `;
        orderItemsContainer.appendChild(itemElement);
    });
}

function reorderItems(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id == orderId);
    
    if (order && order.items) {
        // Add items to cart
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        order.items.forEach(item => {
            const existingItem = cart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cart.push({...item});
            }
        });
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalItems;
        
        alert('Items have been added to your cart!');
        window.location.href = 'products.html';
    }
}

function cancelOrder(orderId) {
    if (confirm('Are you sure you want to cancel this order?')) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderIndex = orders.findIndex(order => order.id == orderId);
        
        if (orderIndex !== -1) {
            orders[orderIndex].status = 'Cancelled';
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Update UI
            document.getElementById('order-status-badge').textContent = 'Cancelled';
            document.getElementById('order-status-badge').className = 'order-status-badge cancelled';
            document.getElementById('order-status').textContent = 'Cancelled';
            document.getElementById('cancel-order-btn').style.display = 'none';
            
            alert('Order has been cancelled.');
        }
    }
}

function contactSupport(orderId) {
    window.location.href = `mailto:ahmed185taha@gmail.com?subject=Order Support - Order #${orderId}`;
}