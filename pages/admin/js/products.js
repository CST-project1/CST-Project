const productTableBody = document.getElementById("productTableBody");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const stockFilter = document.getElementById("stockFilter");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
    productTableBody.innerHTML = "";
    const searchValue = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedStock = stockFilter.value;
    const maxPrice = parseFloat(priceRange.value);

    products
        .filter(p => {
            const matchesSearch =
                p.name.toLowerCase().includes(searchValue) ||
                String(p.id).includes(searchValue) ||
                p.category.toLowerCase().includes(searchValue);
            if (!matchesSearch) return false;

            if (selectedCategory !== "all" && p.category !== selectedCategory) return false;

            if (selectedStock === "inStock" && p.stock <= 0) return false;
            if (selectedStock === "outOfStock" && p.stock > 0) return false;

            if (p.price > maxPrice) return false;

            p.status = p.stock > 0 ? "active" : "inactive";

            return true;
        })
        .forEach(p => {
            const row = document.createElement("tr");
            row.innerHTML = `
                        <td>
                            <a href="ProductInfo.html?id=${p.id}" class="text-decoration-none text-dark">
                                <div class="d-flex align-items-center">
                                  
                                    <img src="../../../images/${p.image}" alt="${p.name}" class="me-3 rounded-circle" style="width:40px;height:40px;object-fit:cover;">
                                    <div>
                                        <div class="fw-semibold">${p.name}</div>
                                        <div class="text-muted small">#${p.id}</div>
                                    </div>
                                </div>
                            </a>
                        </td>
                        <td class="text-muted">${p.category}</td>
                        <td>$${p.price}</td>
                        <td>${p.stock}</td>
                        <td>
                            <span class="badge ${p.status === "active" ? "bg-success" : "bg-danger"}">${p.status}</span>
                        </td>
                        <td>
                            <a href="editProduct.html?id=${p.id}" class="btn btn-sm btn-outline-primary me-1">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </a>
                            <button onclick="deleteProduct('${p.id}')" class="btn btn-sm btn-outline-danger">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    `;
            productTableBody.appendChild(row);
        });
}

function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        products = products.filter(p => String(p.id) !== String(id));
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
    }
}

window.deleteProduct = deleteProduct;

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
stockFilter.addEventListener("change", renderProducts);
priceRange.addEventListener("input", () => {
    priceValue.textContent = priceRange.value;
    renderProducts();
});

renderProducts();