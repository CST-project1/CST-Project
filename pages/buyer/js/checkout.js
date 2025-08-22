document.addEventListener('DOMContentLoaded', function() {
    // Load cart items
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    window.currentUser = currentUser;
    loadCheckoutItems();
    
    // Setup payment method toggle
    setupPaymentMethods();
    
    // Handle form submission
    document.getElementById('checkout-form').addEventListener('submit', placeOrder);
    
    // Calculate totals
    calculateTotals();
});

function loadCheckoutItems() {
    const currentUser = window.currentUser || JSON.parse(localStorage.getItem('currentUser'));
    const cartItems = currentUser ? JSON.parse(localStorage.getItem(`cart_${currentUser.id}`)) || [] : [];
    const checkoutItemsContainer = document.getElementById('checkout-items');
    
    checkoutItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        checkoutItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <img src="../images/${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <div class="item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        `;
        checkoutItemsContainer.appendChild(itemElement);
    });
}

function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const creditCardForm = document.getElementById('credit-card-form');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                creditCardForm.style.display = 'block';
            } else {
                creditCardForm.style.display = 'none';
            }
        });
    });
}

function calculateTotals() {
    const currentUser = window.currentUser || JSON.parse(localStorage.getItem('currentUser'));
    const cartItems = currentUser ? JSON.parse(localStorage.getItem(`cart_${currentUser.id}`)) || [] : [];
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('grand-total').textContent = `$${total.toFixed(2)}`;
}

function placeOrder(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        shipping: {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            zip: document.getElementById('zip').value,
            country: document.getElementById('country').value
        },
        payment: document.querySelector('input[name="payment"]:checked').value,
    items: (window.currentUser ? JSON.parse(localStorage.getItem(`cart_${window.currentUser.id}`)) : []) || [],
        total: parseFloat(document.getElementById('grand-total').textContent.replace('$', ''))
    };
    
    // Get current user
    const currentUser = window.currentUser || JSON.parse(localStorage.getItem('currentUser'));
    
    // Get existing orders or initialize empty array
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Create new order with unique ID
    const newOrder = {
        id: Date.now(), // Unique ID based on timestamp
        date: new Date().toISOString(),
        status: 'Processing',
        items: formData.items,
        total: formData.total,
        shipping: formData.shipping,
        payment: formData.payment,
        buyerId: currentUser.id
    };
    
    // Add to orders array
    orders.push(newOrder);
    
    // Save back to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    if (currentUser) {
        localStorage.removeItem(`cart_${currentUser.id}`);
    }
    document.getElementById('cart-count').textContent = '0';
    
    // Redirect to confirmation page with order ID
    window.location.href = `orderConfirmation.html?orderId=${newOrder.id}`;
}