// Function to toggle the sidebar visibility
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Add product
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addProductForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get current login user
    const currentUser = getCurrentUser();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;
    const stock = document.getElementById("productStock").value;
    const description = document.getElementById("productDesc").value;
    const files = document.getElementById("productImage").files;

    let status = stock > 0 ? "Active" : "Out of Stock";

    // Get image names only (not Base64)
    const images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(files[i].name); // اسم الملف فقط
    }

    let products = getProducts();
    const newId = products.length ? products[products.length - 1].id + 1 : 1;

    const product = {
      id: newId,
      name,
      price,
      category,
      stock,
      description,
      status,
      store_id: currentUser.store_id,
      image: images.length === 1 ? images[0] : null,
      images: images.length > 1 ? images : null,
      sellerId: currentUser.email,
    };

    // Save products
    products.push(product);
    saveProducts(products);

    // Redirect AFTER saving
    window.location.href = "productMange.html";
  });
});