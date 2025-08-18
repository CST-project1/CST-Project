 // Function to toggle the sidebar visibility
 function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }
  // Array of products (each product has id, name, price, stock, status, image, description)
   /* let products = [
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
        },
        {
          id: 3,
          name: "Stranger with you",
          price: 120,
          stock: 15,
          status: "Inactive",
          image: "https://www.perfumeshub.pk/cdn/shop/files/THE_GRANDMASTER.jpg?v=1737022629",
          description: "Stranger with you fragrance with a mysterious touch."
          }
          ]; */

          // Get the table where products will be inserted
          let productsTable = document.getElementById("product-table");
          // Loop through each product and create a table row for it
          products.forEach(product => {
            let badgeClass = "";
            if (product.status === "Active") {
              badgeClass = "badge bg-success";
              } else if (product.status === "out of stock") {
                badgeClass = "badge bg-danger";
                } else {
                  badgeClass = "badge bg-secondary";
                  }
                  // Create a table row for the product
                let row = `
                  <tr>
                    <td><img src="${product.image}" alt="${product.name}" width="80"></td>
                    <td><a href="productinfo.html?id=${product.id}" class="text-decoration-none">${product.name}</a></td>
                    <td>${product.price}</td>
                    <td>${product.stock}</td>
                    <td><span class="${badgeClass}">${product.status}</span></td>
                    <td>
                      <button class="btn btn-sm btn-primary">
                        <i class="fas fa-edit"></i> 
                      </button>
                      <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                `;
                // Insert the table row into the table
                productsTable.innerHTML += row;
              

            
          });