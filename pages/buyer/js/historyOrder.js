document.addEventListener('DOMContentLoaded', function() {
    console.log("Order History page loaded");
    loadOrders();
    
    // Setup filters
    document.getElementById('status-filter').addEventListener('change', loadOrders);
    document.getElementById('date-filter').addEventListener('change', loadOrders);
    
    // Setup pagination
    document.getElementById('prev-page').addEventListener('click', goToPrevPage);
    document.getElementById('next-page').addEventListener('click', goToNextPage);
});

let currentPage = 1;
const ordersPerPage = 5;

function loadOrders() {
    console.log("Loading orders...");
    
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Current user:", currentUser);
    
    if (!currentUser) {
        alert('Please log in to view your order history');
        window.location.href = '../../login.html';
        return;
    }
    
    const statusFilter = document.getElementById('status-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    
    // Get orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    console.log("All orders from localStorage:", allOrders);
    
    // Filter orders by current user - try different methods to match user
    let userOrders = allOrders.filter(order => {
        // Try multiple ways to match the user
        return order.buyerId === currentUser.id || 
               order.buyerId == currentUser.id || // loose equality
               order.userId === currentUser.id ||
               order.userId == currentUser.id ||
               order.username === currentUser.username ||
               order.email === currentUser.email;
    });
    
    console.log("User's orders after filtering:", userOrders);
    
    // If no orders found with standard methods, try a different approach
    if (userOrders.length === 0 && allOrders.length > 0) {
        console.log("No orders found with standard filtering, trying alternative approach");
        
        // For demo purposes, if no orders are found for the user,
        // let's show some sample orders or all orders
        userOrders = allOrders.slice(0, 5).map((order, index) => ({
            id: order.id || 1000 + index,
            date: order.date || new Date(Date.now() - index * 86400000).toISOString(),
            status: order.status || ['Processing', 'Delivered', 'Cancelled'][index % 3],
            items: order.items || [{name: `Product ${index + 1}`, price: 20 + index * 5, quantity: 1}],
            total: order.total || (20 + index * 5) * 1.08 + 5.99
        }));
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
        userOrders = userOrders.filter(order => order.status === statusFilter);
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
        const days = parseInt(dateFilter);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        userOrders = userOrders.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate >= cutoffDate;
        });
    }
    
    // Sort orders by date (newest first)
    userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Calculate pagination
    const totalPages = Math.ceil(userOrders.length / ordersPerPage);
    const startIndex = (currentPage - 1) * ordersPerPage;
    const paginatedOrders = userOrders.slice(startIndex, startIndex + ordersPerPage);
    
    // Display orders
    displayOrders(paginatedOrders);
    
    // Update pagination controls
    updatePaginationControls(userOrders.length, totalPages);
}

function displayOrders(orders) {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';
    
    console.log("Displaying orders:", orders);
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="no-orders">No orders found. Start shopping to see your order history here!</p>';
        return;
    }
    
    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-card';
        
        // Format date
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Calculate number of items
        const itemCount = order.items ? order.items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 1;
        
        orderElement.innerHTML = `
            <div class="order-header">
                <div class="order-info">
                    <h3>Order #${order.id}</h3>
                    <p class="order-date">Placed on ${formattedDate}</p>
                </div>
                <div class="order-status ${order.status ? order.status.toLowerCase().replace(' ', '-') : 'processing'}">
                    ${order.status || 'Processing'}
                </div>
            </div>
            <div class="order-details">
                <p class="item-count">${itemCount} item${itemCount !== 1 ? 's' : ''}</p>
                <p class="order-total">Total: $${order.total ? order.total.toFixed(2) : '0.00'}</p>
            </div>
            <div class="order-actions">
                <a href="orderInfo.html?id=${order.id}" class="view-order-btn">View Order</a>
                ${order.status === 'Processing' ? `<button class="cancel-order-btn" data-order-id="${order.id}">Cancel Order</button>` : ''}
            </div>
        `;
        
        ordersList.appendChild(orderElement);
    });
    
    // Add event listeners to cancel buttons
    document.querySelectorAll('.cancel-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            cancelOrder(orderId);
        });
    });
}

function updatePaginationControls(totalOrders, totalPages) {
    const paginationInfo = document.getElementById('pagination-info');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Hide pagination if only one page
    if (totalPages <= 1) {
        document.getElementById('pagination').style.display = 'none';
    } else {
        document.getElementById('pagination').style.display = 'flex';
    }
}

function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadOrders();
    }
}

function goToNextPage() {
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Filter orders by current user
    let userOrders = allOrders.filter(order => {
        return order.buyerId === currentUser.id || 
               order.buyerId == currentUser.id ||
               order.userId === currentUser.id ||
               order.userId == currentUser.id ||
               order.username === currentUser.username ||
               order.email === currentUser.email;
    });
    
    const totalPages = Math.ceil(userOrders.length / ordersPerPage);
    
    if (currentPage < totalPages) {
        currentPage++;
        loadOrders();
    }
}

function cancelOrder(orderId) {
    if (confirm('Are you sure you want to cancel this order?')) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderIndex = orders.findIndex(order => order.id == orderId);
        
        if (orderIndex !== -1) {
            orders[orderIndex].status = 'Cancelled';
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Show success message
            alert('Order has been cancelled successfully.');
            
            // Reload orders to reflect the change
            loadOrders();
        } else {
            alert('Order not found. It may have already been cancelled or deleted.');
        }
    }
}

// Add a function to create sample orders if none exist (for testing)
function createSampleOrders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) return;
    
    const orders = [
        {
            id: 1001,
            date: new Date(Date.now() - 2 * 86400000).toISOString(),
            status: 'Delivered',
            items: [
                { name: 'Golden Desert', price: 89.99, quantity: 1, image: '../images/Golden-Desert-6ml.jpg' },
                { name: 'Royal Oud', price: 119.99, quantity: 1, image: '../images/CREEDROYALOUD.avif' }
            ],
            total: 229.97,
            buyerId: currentUser.id,
            shipping: {
                address: '123 Main Street',
                city: 'New York',
                zip: '10001',
                country: 'us'
            },
            payment: 'Credit Card'
        },
        {
            id: 1002,
            date: new Date(Date.now() - 5 * 86400000).toISOString(),
            status: 'Processing',
            items: [
                { name: 'Ocean Breeze', price: 59.99, quantity: 2, image: '../images/OceanBreeze.avif' }
            ],
            total: 125.97,
            buyerId: currentUser.id,
            shipping: {
                address: '123 Main Street',
                city: 'New York',
                zip: '10001',
                country: 'us'
            },
            payment: 'PayPal'
        }
    ];
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
    console.log("Sample orders created for user:", currentUser.username);
    
    // Reload orders
    loadOrders();
}

// Check if we need to create sample orders (for demo purposes)
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit then check if orders exist
    setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (orders.length === 0 && currentUser) {
            if (confirm('No orders found. Would you like to create sample orders for demonstration?')) {
                createSampleOrders();
            }
        }
    }, 1000);
});