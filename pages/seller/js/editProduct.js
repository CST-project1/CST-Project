document.addEventListener("DOMContentLoaded", () => {
  const products = getProducts();
  const editIndex = localStorage.getItem("editIndex");

  if (editIndex !== null) {
    const product = products[editIndex];
    if (product) {
      document.getElementById("productName").value = product.name;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("productStock").value = product.stock;
      document.getElementById("productDesc").value = product.description || "";

      // images not editable
    //   const preview = document.getElementById("imagePreview");
    //   if(product.images && product.images.length > 0){
    //     preview.innerHTML = product.images
    //         .map(img => `<img src="${img}" width="50" height="50" class="me-2 mb-2">`)
    //         .join("") + `<p class="text-muted">(${product.images.length} file(s) uploaded)</p>`;
    //   }
    //   else{
    //     preview.innerHTML = "<p class='text-muted'>No images uploaded</p>";
    //   }
     }
  }

  //save changes
  document.getElementById("editProductForm").addEventListener("submit", e => {
    e.preventDefault();

    products[editIndex] = {
        ...products[editIndex],  // keep existing fields
      name: document.getElementById("productName").value,
      price: document.getElementById("productPrice").value,
      stock: document.getElementById("productStock").value,
      description: document.getElementById("productDesc").value,
    };

    saveProducts(products);
    localStorage.removeItem("editIndex"); 
    window.location.href = "productMange.html"; 
  });
});
