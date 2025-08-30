document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const index = params.get("index");

  if (index === null) {
    alert("No product selected");
    window.location.href = "productMange.html";
    return;
  }

  const products = getProducts();
  const product = products[index];

  if (!product) {
    alert("Product not found");
    window.location.href = "productMange.html";
    return;
  }

  // Fill product details
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent = "$" + product.price;
  document.getElementById("productStock").textContent = product.stock;
  document.getElementById("productStatus").textContent = product.status;
  document.getElementById("productDesc").textContent = product.description || "No description available";

  // Images
  const basePath = "../../../images/";
  const images = product.images || (product.image ? [product.image] : []);
  const imagesDiv = document.getElementById("productImages");

  if (images.length > 1) {
    const carouselId = "productInfoCarousel";
    imagesDiv.innerHTML = `
      <div id="${carouselId}" class="carousel slide" data-bs-interval="false" style="width:300px; height:250px; margin:auto;">
        <div class="carousel-inner">
          ${images.map((img, i) => `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
              <img src="${basePath + img}" 
                   onerror="this.src='https://placehold.co/300x250';"
                   class="d-block w-100" 
                   style="width:300px; height:250px; object-fit:cover;" 
                   alt="${product.name}">
            </div>
          `).join("")}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>`;
  } else {
    const imgSrc = images[0] ? basePath + images[0] : "https://placehold.co/300x250";
    imagesDiv.innerHTML = `
      <img src="${imgSrc}" 
           onerror="this.src='https://placehold.co/300x250';"
           class="img-fluid" 
           style="width:300px; height:250px; object-fit:cover;" 
           alt="${product.name}">
    `;
  }
});