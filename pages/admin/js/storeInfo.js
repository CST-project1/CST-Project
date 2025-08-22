let stores = JSON.parse(localStorage.getItem("stores")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];
let params = new URLSearchParams(window.location.search);
let storeId = params.get("id");

let store = stores.find(s => s.id == storeId);

if (store) {
    // Store Info
    document.querySelector(".store-name").textContent = store.name;
    document.querySelector(".store-category").textContent = store.category;
    document.querySelector(".store-description").textContent = store.description || "Welcome to our store!";
    document.querySelector(".store-email").textContent = store.email || "-";
    document.querySelector(".store-phone").textContent = store.phone || "-";

    let locationLink = document.querySelector(".store-location");
    locationLink.href = `https://maps.google.com/?q=${store.location || ""}`;
    locationLink.textContent = store.location || "-";

    document.querySelector(".card img").src = store.logo ? "../images/" + store.logo : "../images/store-logo.png";

    // Products
    let productContainer = document.querySelector(".product-container");
    productContainer.innerHTML = "";

    let storeProducts = products.filter(p => p.store_id == store.id);

    if (storeProducts.length === 0) {
        productContainer.innerHTML = `<p class="text-center">No products found for this store.</p>`;
    } else {
        storeProducts.forEach(p => {
            productContainer.innerHTML += `
                <div class="col-md-4 mb-3">
                    <div class="card h-40">
                        <img src="../../../images/${p.image || 'images.jpeg'}" class="card-img-top h-30 !important  object-fit-cover"  alt="${p.name}" >
                        <div class="card-body">
                            <h5 class="card-title">${p.name}</h5>
                            <p class="card-text">$${p.price} - ${p.description || ''}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
} else {
    document.querySelector("main").innerHTML = `<p class="text-center">Store not found.</p>`;
}