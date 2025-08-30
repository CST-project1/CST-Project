document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

    if (!orderId) {
        alert('No order ID found. Redirecting to order history.');
        window.location.href = 'orderHistory.html';
        return;
    }

    loadOrderDetails(orderId);

    document.getElementById('reorder-btn').addEventListener('click', function () {
        reorderItems(orderId);
    });

    document.getElementById('cancel-order-btn').addEventListener('click', function () {
        cancelOrder(orderId);
    });

    document.getElementById('contact-support-btn').addEventListener('click', function () {
        contactSupport(orderId);
    });
});

function loadOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id == orderId);

    if (!order) {
        alert('Order not found. Redirecting to order history.');
        window.location.href = 'orderHistory.html';
        return;
    }

    document.getElementById('order-id').textContent = order.id;
    document.getElementById('order-status-badge').textContent = order.status;
    document.getElementById('order-status-badge').className = `order-status-badge ${order.status.toLowerCase().replace(' ', '-')}`;

    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('order-date').textContent = formattedDate;
    document.getElementById('order-status').textContent = order.status;
    document.getElementById('payment-method').textContent = order.payment || 'Credit Card';
    document.getElementById('payment-status').textContent = 'Paid';

    // shipping مش موجود -> هنظهر buyerId
    document.getElementById('shipping-address').textContent = `Buyer ID: ${order.buyerId}`;

    // Estimated delivery
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    document.getElementById('estimated-delivery').textContent = deliveryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('tracking-number').textContent = `TRK${order.id}`;

    // هنا معندكش order.items -> هنضيف منتج واحد من الـ order
    displayOrderItems(order);

    // Totals
    document.getElementById('subtotal').textContent = `$${order.total.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$5.99`;
    const tax = order.total * 0.08;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('grand-total').textContent = `$${(order.total + 5.99 + tax).toFixed(2)}`;

    if (order.status !== 'Processing') {
        document.getElementById('cancel-order-btn').style.display = 'none';
    }
}

function displayOrderItems(order) {
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = '';

    // بدل order.items هنستخدم المنتج المبسط
    const itemElement = document.createElement('div');
    itemElement.className = 'order-item';
    itemElement.innerHTML = `
        <div class="item-details">
            <h4>Product #${order.product_id}</h4>
            <p>$${(order.total / order.quantity).toFixed(2)} x ${order.quantity}</p>
        </div>
        <div class="item-total">
            $${order.total.toFixed(2)}
        </div>
    `;
    orderItemsContainer.appendChild(itemElement);
}

function reorderItems(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id == orderId);

    if (order) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(cartItem => cartItem.product_id === order.product_id);

        if (existingItem) {
            existingItem.quantity += order.quantity;
        } else {
            cart.push({
                id: order.product_id,
                name: `Product #${order.product_id}`,
                price: order.total / order.quantity,
                quantity: order.quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
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