// orderInfo.js
const orders = JSON.parse(localStorage.getItem('orders')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];
const products = JSON.parse(localStorage.getItem('products')) || [];
const stores = JSON.parse(localStorage.getItem('stores')) || [];

// افترض أننا نريد أول order (يمكن تغييره حسب id من URL)
const order = orders[0];

if(order){
    // Order basic info
    document.getElementById('orderId').textContent = order.id || '-';
    document.getElementById('orderDate').textContent = order.date || '-';
    document.getElementById('orderStatus').textContent = order.status || '-';
    document.getElementById('orderTotal').textContent = '$' + (order.total || '0');

    // Customer
    const customer = users.find(u => u.id === order.buyer_id);
    document.getElementById('customerName').textContent = customer?.name || '-';
    document.getElementById('customerEmail').textContent = customer?.email || '-';
    document.getElementById('customerPhone').textContent = customer?.phone || '-';
    document.getElementById('customerAddress').textContent = customer?.location || '-';

    // Ordered Products
    const tbody = document.getElementById('orderProducts');
    tbody.innerHTML = '';
    order.products.forEach(item => {
        const product = products.find(p => p.id === item.product_id);
        const quantity = item.quantity || 1;
        const price = product?.price || 0;
        const total = quantity * price;
        tbody.innerHTML += `
            <tr>
                <td><a href="productInfo.html?id=${product?.id}">${product?.name || '-'}</a></td>
                <td>${quantity}</td>
                <td>$${price}</td>
                <td>$${total}</td>
            </tr>
        `;
    });

    // Seller & Store
    const firstProduct = products.find(p => p.id === order.products[0]?.product_id);
    const store = stores.find(s => s.id === firstProduct?.store_id);
    const seller = users.find(u => u.id === store?.ownerId);

    document.getElementById('storeName').innerHTML = store ? `<a href="storeInfo.html?id=${store.id}">${store.name}</a>` : '-';
    document.getElementById('sellerName').innerHTML = seller ? `<a href="sellerInfo.html?id=${seller.id}">${seller.name || seller.username}</a>` : '-';
    document.getElementById('sellerPhone').textContent = seller?.phone || '-';
    document.getElementById('sellerLocation').textContent = store?.location || '-';

} else {
    console.warn('No orders found in localStorage');
}
