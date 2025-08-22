function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

const ITEMS_PER_PAGE = 5;
let currentPage = 1;

function loadProducts() {
  const user = getCurrentUser();
  if (!user) return;

  const allProducts = getProducts();
  const products = allProducts.filter(
    p => p.store_id === user.store_id
    // (p) => p.sellerId?.toLowerCase() === user.email.toLowerCase()
  );

  renderTable(products, currentPage, allProducts);
  renderPagination(products);
}

function renderTable(products, page, allProducts) {
  const productTable = document.getElementById("product-table-body");
  productTable.innerHTML = "";

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(start, end);

  paginatedProducts.forEach((product, index) => {
    
    const absoluteIndex = allProducts.findIndex(
      (p) => p.name === product.name && p.sellerId === product.sellerId
    );

    const images = product.images || (product.image ? [product.image] : []);
    let imageHTML = "";

    if (images.length > 1) {
      const carouselId = `carousel-${page}-${index}`;
      imageHTML = `
        <div id="${carouselId}" class="carousel slide" data-bs-interval="false" style="width:50px; object-fit:cover">
          <div class="carousel-inner">
            ${images
              .map(
                (img, i) => `
                <div class="carousel-item ${i === 0 ? "active" : ""}">
                  <img src="${img}" class="d-block w-100" alt="${product.name}">
                </div>`
              )
              .join("")}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>`;
    } else {
      const img = images.length ? images[0] : "../images/placeholder.jpg";
      imageHTML = `<img src="${img}" alt="${product.name}" width="50" height="50">`;
    }
    //Status depends on stock
    const status = Number(product.stock) >= 1 ? "Active" : "Out of Stock";

    const row = `
      <tr>
        <td>${imageHTML}</td>
        <td>
          <a href="productInfo.html?index=${absoluteIndex}" class="product-link">
            ${product.name}
          </a>
        </td>
        <td>$${product.price}</td>
        <td>${product.stock}</td>
        <td>
          <span class="badge ${
            status === "Active"
              ? "bg-success"
              : status === "Out of Stock"
              ? "bg-danger"
              : "bg-secondary"
          }">${status}</span>
        </td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editProduct(${absoluteIndex})"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger" onclick="deleteProduct(${absoluteIndex})"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
    productTable.innerHTML += row;
  });
}

function renderPagination(products) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // Previous button
  pagination.innerHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
    </li>`;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>`;
  }

  // Next button
  pagination.innerHTML += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
    </li>`;
}

function changePage(page) {
  const user = getCurrentUser();
  const allProducts = getProducts();
  const products = allProducts.filter(
    p => p.store_id === user.store_id
    // (p) => p.sellerId?.toLowerCase() === user.email.toLowerCase()
  );

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;

  currentPage = page;
  renderTable(products, currentPage, allProducts);
  renderPagination(products);
}

// Delete product
function deleteProduct(index) {
  const products = getProducts();
  let delete_confirm = confirm("Are you sure you want to delete this product?");
  if (delete_confirm) {
    products.splice(index, 1);
    saveProducts(products);
  }
  loadProducts();
}

// Edit product
function editProduct(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "editProduct.html";
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadProducts);

//logout function
document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault(); // stop <a> from reloading page
      logout(); // call logout from storage.js
    });
  }
});

