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
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentProduct = null;

    // All products data (updated with local images)
    const allProducts = [
        // Men's Fragrances
        { 
            id: 1, 
            name: 'Golden Desert', 
            price: 89.99, 
            category: 'men', 
            image: '../images/Golden-Desert-6ml.jpg', 
            featured: true,
            description: 'A luxurious blend that captures the essence of golden sand dunes at sunset. This sophisticated fragrance combines warm amber notes with exotic spices, creating an unforgettable masculine scent that exudes confidence and mystery.',
            brand: "L'Essence Elite",
            type: 'Eau de Parfum',
            topNotes: 'Bergamot, Cardamom, Pink Pepper',
            heartNotes: 'Saffron, Rose, Cinnamon',
            baseNotes: 'Amber, Sandalwood, Vanilla'
        },
        { 
            id: 2, 
            name: 'Royal Oud', 
            price: 119.99, 
            category: 'men', 
            image: '../images/CREEDROYALOUD.avif', 
            featured: true,
            description: 'An opulent fragrance fit for royalty. This rich and complex scent features the finest oud wood, balanced with precious rose and warm spices. A true masterpiece for the discerning gentleman.',
            brand: "L'Essence Royal",
            type: 'Eau de Parfum',
            topNotes: 'Rose, Saffron, Nutmeg',
            heartNotes: 'Oud, Patchouli, Geranium',
            baseNotes: 'Amber, Musk, Sandalwood'
        },
        { 
            id: 3, 
            name: 'Ocean Breeze', 
            price: 59.99, 
            category: 'men', 
            image: '../images/OceanBreeze.avif', 
            featured: false,
            description: 'Fresh and invigorating like a morning walk by the sea. This aquatic fragrance combines crisp marine notes with citrus and herbs, perfect for the modern man who loves adventure.',
            brand: "L'Essence Fresh",
            type: 'Eau de Toilette',
            topNotes: 'Sea Salt, Lemon, Mint',
            heartNotes: 'Marine Notes, Lavender, Rosemary',
            baseNotes: 'Driftwood, Musk, Ambergris'
        },
        { 
            id: 4, 
            name: 'Black Leather', 
            price: 95.99, 
            category: 'men', 
            image: '../images/BlackLeather.jpg', 
            featured: false,
            description: 'Bold and masculine with a rebellious edge. This intense fragrance features rich leather accords complemented by smoky woods and dark spices, perfect for evening wear.',
            brand: "L'Essence Dark",
            type: 'Eau de Parfum',
            topNotes: 'Black Pepper, Juniper, Grapefruit',
            heartNotes: 'Leather, Tobacco, Violet',
            baseNotes: 'Vetiver, Cedar, Patchouli'
        },
        { 
            id: 5, 
            name: 'Woody Spice', 
            price: 79.99, 
            category: 'men', 
            image: '../images/WoodySpice.jpg', 
            featured: false,
            description: 'Warm and comforting with a sophisticated twist. This aromatic blend features rich woods enhanced by exotic spices, creating a timeless fragrance for the refined gentleman.',
            brand: "L'Essence Classic",
            type: 'Eau de Parfum',
            topNotes: 'Cinnamon, Nutmeg, Orange',
            heartNotes: 'Cedar, Pine, Clove',
            baseNotes: 'Sandalwood, Vanilla, Musk'
        },
        
        // Women's Fragrances
        { 
            id: 6, 
            name: 'White Musk', 
            price: 69.99, 
            category: 'women', 
            image: '../images/WhiteMusk.jpg', 
            featured: true,
            description: 'Pure elegance in a bottle. This delicate fragrance features soft white musk enhanced by gentle florals and clean cotton notes, creating an aura of sophisticated femininity.',
            brand: "L'Essence Pure",
            type: 'Eau de Parfum',
            topNotes: 'White Tea, Bergamot, Pear',
            heartNotes: 'White Musk, Jasmine, Lily',
            baseNotes: 'Cotton, Vanilla, Soft Woods'
        },
        { 
            id: 7, 
            name: 'Cherry Blossom', 
            price: 79.99, 
            category: 'women', 
            image: '../images/CherryBlossom.jpg', 
            featured: true,
            description: 'Romantic and enchanting like spring in full bloom. This floral masterpiece captures the delicate beauty of cherry blossoms with soft petals and sweet undertones.',
            brand: "L'Essence Bloom",
            type: 'Eau de Parfum',
            topNotes: 'Cherry Blossom, Mandarin, Green Leaves',
            heartNotes: 'Peony, Rose, Magnolia',
            baseNotes: 'White Musk, Cedar, Soft Amber'
        },
        { 
            id: 8, 
            name: 'Midnight Rose', 
            price: 94.99, 
            category: 'women', 
            image: '../images/MidnightRose.jpg', 
            featured: false,
            description: 'Mysterious and seductive, perfect for evening occasions. This intense floral fragrance features deep red roses enhanced by dark berries and sensual woods.',
            brand: "L'Essence Night",
            type: 'Eau de Parfum',
            topNotes: 'Black Currant, Pink Pepper, Bergamot',
            heartNotes: 'Red Rose, Peony, Freesia',
            baseNotes: 'Patchouli, Vanilla, Dark Chocolate'
        },
        { 
            id: 9, 
            name: 'Vanilla Dreams', 
            price: 74.99, 
            category: 'women', 
            image: '../images/VanillaDreams.jpg', 
            featured: false,
            description: 'Sweet and comforting like a warm embrace. This gourmand fragrance features rich vanilla enhanced by caramel and soft florals, creating a dreamy and addictive scent.',
            brand: "L'Essence Sweet",
            type: 'Eau de Parfum',
            topNotes: 'Mandarin, Pear, Pink Pepper',
            heartNotes: 'Vanilla Orchid, Jasmine, Orange Blossom',
            baseNotes: 'Vanilla, Caramel, Sandalwood'
        },
        { 
            id: 10, 
            name: 'Floral Elegance', 
            price: 84.99, 
            category: 'women', 
            image: '../images/FloralElegance.jpg', 
            featured: false,
            description: 'Timeless sophistication in every drop. This classic floral bouquet combines the finest white flowers with green notes, creating an elegant and refined fragrance.',
            brand: "L'Essence Classic",
            type: 'Eau de Parfum',
            topNotes: 'Green Mandarin, Blackcurrant, Pear',
            heartNotes: 'White Flowers, Jasmine, Rose',
            baseNotes: 'White Musk, Cedar, Blonde Woods'
        },
        { 
            id: 11, 
            name: 'Pink Peony', 
            price: 67.99, 
            category: 'women', 
            image: '../images/PinkPeony.jpg', 
            featured: false,
            description: 'Fresh and feminine with a playful spirit. This delightful fragrance captures the essence of blooming peonies with fruity top notes and a soft musky base.',
            brand: "L'Essence Fresh",
            type: 'Eau de Toilette',
            topNotes: 'Pink Grapefruit, Lychee, Peony',
            heartNotes: 'Rose, Magnolia, Lily of the Valley',
            baseNotes: 'White Musk, Blonde Woods, Soft Amber'
        },
        
        // Unisex Fragrances
        { 
            id: 12, 
            name: 'Citrus Burst', 
            price: 64.99, 
            category: 'unisex', 
            image: '../images/CitrusBurst.jpg', 
            featured: false,
            description: 'Energizing and uplifting for any occasion. This vibrant citrus blend combines zesty fruits with aromatic herbs, perfect for those who love fresh and invigorating scents.',
            brand: "L'Essence Energy",
            type: 'Eau de Toilette',
            topNotes: 'Lemon, Orange, Grapefruit',
            heartNotes: 'Mint, Basil, Green Tea',
            baseNotes: 'White Musk, Light Woods, Vetiver'
        },
        { 
            id: 13, 
            name: 'Fresh Mint', 
            price: 54.99, 
            category: 'unisex', 
            image: '../images/FreshMint.jpg', 
            featured: false,
            description: 'Cool and refreshing like a mountain breeze. This invigorating fragrance features crisp mint enhanced by eucalyptus and clean aquatic notes.',
            brand: "L'Essence Cool",
            type: 'Eau de Toilette',
            topNotes: 'Spearmint, Eucalyptus, Lime',
            heartNotes: 'Peppermint, Green Leaves, Aquatic Notes',
            baseNotes: 'White Musk, Light Cedar, Clean Cotton'
        },
        { 
            id: 14, 
            name: 'Amber Glow', 
            price: 89.99, 
            category: 'unisex', 
            image: '../images/AmberGlow.jpg', 
            featured: false,
            description: 'Warm and mysterious with universal appeal. This sophisticated fragrance features rich amber enhanced by spices and precious woods, suitable for any gender.',
            brand: "L'Essence Luxury",
            type: 'Eau de Parfum',
            topNotes: 'Pink Pepper, Cardamom, Bergamot',
            heartNotes: 'Amber, Rose, Cinnamon',
            baseNotes: 'Sandalwood, Vanilla, Patchouli'
        },
        { 
            id: 15, 
            name: 'Green Tea', 
            price: 49.99, 
            category: 'unisex', 
            image: '../images/GreenTea.jpg', 
            featured: false,
            description: 'Zen-like tranquility in a bottle. This calming fragrance features pure green tea enhanced by citrus and white flowers, perfect for meditation and relaxation.',
            brand: "L'Essence Zen",
            type: 'Eau de Toilette',
            topNotes: 'Green Tea, Lemon, Mint',
            heartNotes: 'White Tea, Jasmine, Ginger',
            baseNotes: 'White Musk, Light Woods, Clean Cotton'
        }
    ];

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

        localStorage.setItem('cart', JSON.stringify(cart));
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
        localStorage.setItem('cart', JSON.stringify(cart));
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
            localStorage.setItem('cart', JSON.stringify(cart));
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
    loadProductDetails();
    updateCartUI();
});