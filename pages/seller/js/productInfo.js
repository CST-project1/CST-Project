
        // product details
        let products = [
    {
      id: 1,
      name: "Rose Elegance",
      price: 120,
      stock: 15,
      status: "Active",
      image: "https://www.perfumeshub.pk/cdn/shop/files/THE_GRANDMASTER.jpg?v=1737022629",
      description: "Elegant rose perfume with fresh scent."
      },
      {
        id: 2,
        name: "Golden Mist",
        price: 95,
        stock: 0,
        status: "out of stock",
        image: "https://www.perfumeshub.pk/cdn/shop/files/THE_GRANDMASTER.jpg?v=1737022629",
        description: "Golden Mist fragrance with a luxurious touch."
        }
        ];
        // get id from url 
        let urlParams = new URLSearchParams(window.location.search);
        let productId = parseInt( urlParams.get('id'));
        // search product by id
        let product = products.find(product => product.id === productId);
        
        if (product){
            document.getElementById("product-image").src = product.image;
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-price").textContent = `$${product.price}`;
            document.getElementById("product-description").textContent = product.description;
            document.getElementById("product-stock").textContent = product.stock;

            let statusElement = document.getElementById("product-status");
            statusElement.textContent = product.status;
            if (product.status === "Active"){
                statusElement.className = "badge bg-success";
            } else {
                statusElement.className = "badge bg-danger";

            } 
        } else {
            
            document.querySelector(".card").innerHTML = `<p class="text-danger">Product not found!</p>` ;
        }
           