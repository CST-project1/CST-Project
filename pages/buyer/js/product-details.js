document.addEventListener('DOMContentLoaded', function() {
    const cartCountSpan = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Product details elements
    const mainProductImage = document.getElementById('main-product-image');
    const productTitle = document.getElementById('product-title');
    const productPrice = document.getElementById('product-price');
    const productCategoryBadge = document.getElementById('product-category-badge');
    const productDescriptionText = document.getElementById('product-description-text');
    const productBreadcrumb = document.getElementById('product-breadcrumb');
    const quantityInput = document.getElementById('quantity-input');
    const decreaseQtyBtn = document.getElementById('decrease-qty');
    const increaseQtyBtn = document.getElementById('increase-qty');
    const addToCartMainBtn = document.getElementById('add-to-cart-main');
    const relatedProductsGrid = document.getElementById('related-products-grid');

    // Get current user from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // If no user is logged in, redirect to login page
    if (!currentUser) {
        window.location.href = '../../../login.html';
        return;
    }

    let cart = JSON.parse(localStorage.getItem(`cart_${currentUser.id}`)) || [];
    let currentProduct = null;
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Find the product
    const product = allProducts.find(p => p.id === productId);

    // Display product details
    function displayProductDetails() {
        if (!product) {
            // Handle product not found
            return;
        }

        document.getElementById('product-breadcrumb').textContent = product.name;
        document.getElementById('main-product-image').src = product.image;
        document.getElementById('product-category-badge').textContent = product.category;
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price}`;
        // ... set other details from the product object
    }

    // ----- Navbar Toggle Functionality ----- 
    if (menuToggle && navLinks){
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

    // Get product ID from URL parameters
    function getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id')) || 1; // Default to product 1 if no ID
    }

    // Load product details
    function loadProductDetails() {
        const productId = getProductIdFromURL();
        currentProduct = allProducts.find(product => product.id === productId);
        
        if (!currentProduct) {
            currentProduct = allProducts[0]; // Fallback to first product
        }

        // Update page elements
        if (mainProductImage) mainProductImage.src = currentProduct.image;
        if (productTitle) productTitle.textContent = currentProduct.name;
        if (productPrice) productPrice.textContent = `$${currentProduct.price}`;
        if (productCategoryBadge) productCategoryBadge.textContent = currentProduct.category.toUpperCase();
        if (productDescriptionText) productDescriptionText.textContent = currentProduct.description;
        if (productBreadcrumb) productBreadcrumb.textContent = currentProduct.name;

        // Calculate and update dynamic pricing
        updateDynamicPricing(currentProduct.price);

        // Update additional details
        const productBrand = document.getElementById('product-brand');
        const productType = document.getElementById('product-type');
        const topNotes = document.getElementById('top-notes');
        const heartNotes = document.getElementById('heart-notes');
        const baseNotes = document.getElementById('base-notes');

        if (productBrand) productBrand.textContent = currentProduct.brand;
        if (productType) productType.textContent = currentProduct.type;
        if (topNotes) topNotes.textContent = currentProduct.topNotes;
        if (heartNotes) heartNotes.textContent = currentProduct.heartNotes;
        if (baseNotes) baseNotes.textContent = currentProduct.baseNotes;

        // Load related products
        loadRelatedProducts();
    }

    // Function to calculate and update dynamic pricing
    function updateDynamicPricing(currentPrice) {
        // Calculate original price as 1.5 times the current price
        const originalPrice = currentPrice * 1.5;
        
        // Calculate discount percentage
        const discountAmount = originalPrice - currentPrice;
        const discountPercentage = Math.round((discountAmount / originalPrice) * 100);
        
        // Update the original price element
        const originalPriceElement = document.getElementById('original-price');
        if (originalPriceElement) {
            originalPriceElement.textContent = `$${originalPrice.toFixed(2)}`;
        }
        
        // Update the discount badge element
        const discountBadgeElement = document.getElementById('discount-badge');
        if (discountBadgeElement) {
            discountBadgeElement.textContent = `${discountPercentage}% OFF`;
        }
    }

    // Load related products (same category, excluding current product)
    function loadRelatedProducts() {
        const relatedProducts = allProducts
            .filter(product => product.category === currentProduct.category && product.id !== currentProduct.id)
            .slice(0, 3);

        if (relatedProductsGrid) {
            relatedProductsGrid.innerHTML = relatedProducts.map(product => `
                <div class="product-card" onclick="goToProductDetails(${product.id})">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">$${product.price}</p>
                        <button class="add-to-cart-btn" data-id="${product.id}" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Quantity controls
    if (decreaseQtyBtn) {
        decreaseQtyBtn.addEventListener('click', () => {
            const currentQty = parseInt(quantityInput.value);
            if (currentQty > 1) {
                quantityInput.value = currentQty - 1;
            }
        });
    }

    if (increaseQtyBtn) {
        increaseQtyBtn.addEventListener('click', () => {
            const currentQty = parseInt(quantityInput.value);
            if (currentQty < 10) {
                quantityInput.value = currentQty + 1;
            }
        });
    }

    // Add to cart functionality
    function addToCart(productId, quantity = 1) {
        const product = allProducts.find(p => p.id === parseInt(productId));
        if (!product) return;

        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity: quantity
            });
        }

        localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
        updateCartUI();
    }

    // Main add to cart button
    if (addToCartMainBtn) {
        addToCartMainBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            addToCart(currentProduct.id, quantity);
            
            // Visual feedback
            addToCartMainBtn.innerHTML = '<span class="cart-icon-btn">✓</span> Added to Cart!';
            addToCartMainBtn.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                addToCartMainBtn.innerHTML = '<span class="cart-icon-btn">🛒</span> Add to Cart';
                addToCartMainBtn.style.backgroundColor = '';
            }, 2000);
        });
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

    // Navigate to product details
    function goToProductDetails(productId) {
        window.location.href = `product-details.html?id=${productId}`;
    }

    // Make functions global
    window.updateQuantity = updateQuantity;
    window.removeFromCart = removeFromCart;
    window.addToCart = addToCart;
    window.goToProductDetails = goToProductDetails;
    
    // Initialize
    displayProductDetails();
    loadProductDetails();
    updateCartUI();
});