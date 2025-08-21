// Function to toggle the sidebar visibility
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }
//add product
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addProductForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    //get current login user
    const currentUser = getCurrentUser();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;
    const stock = document.getElementById("productStock").value;
    const description = document.getElementById("productDesc").value;
    const files = document.getElementById("productImage").files;

    let status = stock > 0 ? "Active" : "Out of Stock";

    // Convert all selected images to Base64
    const readers = [];
    const images = [];

    for (let i = 0; i < files.length; i++) {
      readers.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            images.push(e.target.result); // push Base64 string
            resolve();
          };
          reader.onerror = reject;
          reader.readAsDataURL(files[i]);
        })
      );
    }

    // Wait for all images to be processed
    Promise.all(readers).then(() => {
      const product = {
        name,
        price,
        category,
        stock,
        description,
        status,
        images, // always array now
        sellerId: currentUser.email,
      };

      // use helper functions from storage.js
      let products = getProducts();
      products.push(product);
      saveProducts(products);

      // redirect AFTER saving
      window.location.href = "productMange.html";
    });
  });
});
