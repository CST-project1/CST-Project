document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.querySelector('.needs-validation');
    
    form.addEventListener('submit', function(e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        form.classList.add('was-validated');
    }, false);

    // Load cart items from localStorage and display in order summary
    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const orderSummary = document.querySelector('.card');
        const productContainer = orderSummary.querySelector('.card-header').nextElementSibling;
        
        // Clear existing items (except the first one which is the header)
        while (orderSummary.children.length > 1) {
            orderSummary.removeChild(orderSummary.lastChild);
        }
        
        if (cartItems.length === 0) {
            const emptyCart = document.createElement('div');
            emptyCart.className = 'p-3 text-center';
            emptyCart.textContent = 'Your cart is empty';
            orderSummary.appendChild(emptyCart);
            return;
        }
        
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'd-flex p-3';
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="ms-3 my-2">
                    <h6 class="my-0">${item.name}</h6>
                    <caption>${item.description || ''}</caption>
                    <p class="mt-1">$${item.price} x ${item.quantity}</p>
                </div>
            `;
            
            orderSummary.insertBefore(itemElement, orderSummary.querySelector('.subCard'));
        });
        
        // Update order totals
        updateOrderTotals(cartItems);
    }
    
    // Calculate and update order totals
    function updateOrderTotals(cartItems) {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 5.00; // Fixed shipping cost
        const taxRate = 0.1; // 10% tax
        const tax = subtotal * taxRate;
        
        // Check for promo code in URL
        const urlParams = new URLSearchParams(window.location.search);
        const promoCode = urlParams.get('promo');
        let discount = 0;
        
        if (promoCode === 'SAVE10') {
            discount = subtotal * 0.1; // 10% discount
        } else if (promoCode === 'SAVE5') {
            discount = 5.00; // $5 discount
        }
        
        const total = subtotal + shipping + tax - discount;
        
        // Update the DOM
        const subtotalElement = document.querySelector('.subCard div:nth-child(1) span');
        const shippingElement = document.querySelector('.subCard div:nth-child(2) span');
        const taxElement = document.querySelector('.subCard div:nth-child(3) span');
        const discountElement = document.querySelector('.subCard div:nth-child(4) span');
        const totalElement = document.querySelector('.subCard div:nth-child(5) span');
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        
        if (discount > 0) {
            discountElement.textContent = `-$${discount.toFixed(2)}`;
            document.querySelector('.subCard div:nth-child(4)').style.display = 'flex';
        } else {
            document.querySelector('.subCard div:nth-child(4)').style.display = 'none';
        }
        
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Credit card formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '');
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
            }
            e.target.value = value;
        });
    }
    
    // Expiration date formatting
    const expireInput = document.getElementById('expire');
    if (expireInput) {
        expireInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // CVV validation
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    // State and country dependency
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    
    if (countrySelect && stateSelect) {
        const stateOptions = {
            'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
            'USA': ['California', 'New York', 'Texas', 'Florida']
        };
        
        countrySelect.addEventListener('change', function() {
            const selectedCountry = this.value;
            stateSelect.innerHTML = '<option value="">choose...</option>';
            
            if (selectedCountry && stateOptions[selectedCountry]) {
                stateOptions[selectedCountry].forEach(state => {
                    const option = document.createElement('option');
                    option.value = state.substring(0, 2).toUpperCase();
                    option.textContent = state;
                    stateSelect.appendChild(option);
                });
            }
        });
    }
    
    // Load cart items when page loads
    loadCartItems();
    
    // Save form data to localStorage for persistence
    const formInputs = form.querySelectorAll('input, select');
    formInputs.forEach(input => {
        // Load saved data if exists
        const savedValue = localStorage.getItem(`checkout_${input.name}`);
        if (savedValue) {
            input.value = savedValue;
        }
        
        // Save data on change
        input.addEventListener('change', function() {
            localStorage.setItem(`checkout_${this.name}`, this.value);
        });
    });
});