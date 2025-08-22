document.addEventListener('DOMContentLoaded', function() {
    const allProductsGrid = document.getElementById('all-products-grid');
    const cartCountSpan = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Get current user from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // If no user is logged in, redirect to login page
    if (!currentUser) {
        window.location.href = '../../../login.html';
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem(`cart_${currentUser.id}`)) || [];
    let currentFilter = 'all';

    // ----- Navbar Toggle Functionality ----- 
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });

        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            }
        });
    }

    // ----- Cart Functionality -----

    // Open cart sidebar
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close cart sidebar
    function closeCartSidebar() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);

    const allProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Navigate to product details
    function goToProductDetails(productId) {
        window.location.href = `product-details.html?id=${productId}`;
    }

    // Display all products with filtering
    function displayProducts(filter = 'all') {
        if (!allProductsGrid) return;
        
        let productsToShow = allProducts;
        if (filter !== 'all') {
            productsToShow = allProducts.filter(product => product.category === filter);
        }
        
        allProductsGrid.innerHTML = '';
        
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="../images/${product.image}" alt="${product.name}" class="product-image" onclick="goToProductDetails(${product.id})">
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            allProductsGrid.appendChild(productCard);
        });
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter category
            const category = button.getAttribute('data-category');
            currentFilter = category;
            
            // Display filtered products
            displayProducts(category);
        });
    });

    // Add product to cart
    function addToCart(productId) {
        const product = allProducts.find(p => p.id === parseInt(productId));
        if (!product) return;

        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
        updateCartUI();
    }

    // Remove product from cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== parseInt(productId));
        localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
        updateCartUI();
    }

    // Update product quantity in cart
    function updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const item = cart.find(item => item.id === parseInt(productId));
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
            updateCartUI();
        }
    }

    // Update cart UI
    function updateCartUI() {
        // Update cart count
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCountSpan) {
            cartCountSpan.textContent = cartCount;
            cartCountSpan.style.display = cartCount > 0 ? 'block' : 'none';
        }

        // Update cart items
        if (cartItems) {
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <p>Your cart is empty</p>
                        <p>Add some products to get started!</p>
                    </div>
                `;
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price}</div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Update total
        if (cartTotal) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = total.toFixed(2);
        }
    }

    // Make functions global so they can be called from HTML
    window.updateQuantity = updateQuantity;
    window.removeFromCart = removeFromCart;
    window.goToProductDetails = goToProductDetails;

    // Add click functionality to "Add to Cart" buttons
    if (allProductsGrid) {
        allProductsGrid.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const productId = e.target.getAttribute('data-id');
                addToCart(productId);
                
                // Add simple animation effect to button when clicked
                e.target.textContent = 'Added!';
                e.target.classList.add('added');
                setTimeout(() => {
                    e.target.textContent = 'Add to Cart';
                    e.target.classList.remove('added');
                }, 1500);
            }
        });
    }
    
    // Initialize
    displayProducts();
    updateCartUI();
});

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../../../login.html';
}