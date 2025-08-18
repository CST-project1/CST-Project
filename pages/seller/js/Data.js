if (!localStorage.getItem("products")) {
let productsData = [
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
          ];
          localStorage.setItem("products", JSON.stringify(productsData));

        }



if (!localStorage.getItem("orders")) {        
let ordersData = [
    {
       id: 1, 
       customer: "Zoe Smith", 
       qty: 2, 
       date: "2025-07-20", 
       status: "Pending", 
    // total: 140,
       products: [
         { ...productsData[0], quantity: 1, total: productsData[0].price * 1 },
         { ...productsData[1], quantity: 1, total: productsData[1].price * 1 }
       ]
      },
      {
        id: 2,
        customer: "John Marsel", 
        qty: 3, 
        date: "2025-06-16", 
        status: "Delivered", 
        // total: 180,
        products: [
          { ...productsData[1], quantity: 2, total: productsData[1].price * 2 },
          { ...productsData[2], quantity: 1, total: productsData[2].price * 1 }
       ]
        },
        {
          id: 3,
          customer: "Majesty Brand", 
          qty: 4, 
          date: "2025-08-16", 
          status: "Cancelled", 
          //total: 220,
          products: [
            { ...productsData[0], quantity: 2, total: productsData[0].price * 2 },
            { ...productsData[1], quantity: 2, total: productsData[1].price * 2 }
         ]
          },
          {
           id: 4, 
           customer: "Elena Argent", 
           qty: 2, 
           date: "2025-03-20", 
           status: "Pending", 
           //total: 120,
           products: [
             { ...productsData[2], quantity: 1, total: productsData[2].price * 1 },
             { ...productsData[1], quantity: 1, total: productsData[1].price * 1 }
         ]       
          },
      {
        id: 5,
        customer: "Jack Henry", 
        qty: 1, 
        date: "2025-05-16", 
        status: "Delivered", 
        //total: 65,
        products: [
          { ...productsData[1], quantity: 1, total: productsData[1].price * 1 }
         ]
        },
          {
           id: 6,
           customer: "David Samuel", 
           qty: 1, 
           date: "2025-04-10", 
           status: "Cancelled", 
           //total: 100,
           products: [
             { ...productsData[2], quantity: 1, total: productsData[2].price * 1 }
         ]
          },
          {
           id: 7,
           customer: "Joshua Kim", 
           qty: 3, 
           date: "2025-06-26", 
           status: "Cancelled", 
           //total: 160,
           products: [
             { ...productsData[0], quantity: 1, total: productsData[0].price * 1 },
             { ...productsData[2], quantity: 2, total: productsData[2].price * 2 }
         ]
          },
          {
          id: 8,
          customer: "Emma James", 
          qty: 1, 
          date: "2025-02-06", 
          status: "Cancelled", 
          //total: 90,
          products: [
            { ...productsData[1], quantity: 1, total: productsData[1].price * 1 }
         ]
          }
        ];
       
         localStorage.setItem("orders", JSON.stringify(ordersData));


    }

    if (!localStorage.getItem("customers")) {

        let customersData = [
    {
        id: 1,
        name: "Zoe Smith",
        email: "zoe.smith@gmail.com",
        phone: "9876543210",
        address: "456 Elm St, Anytown, USA"
        
       
    },
    
    {
        
        id: 2,
        name: "John Marsel",
        email: "john.marsel@gmail.com",
        phone: "1234567890",
        address: "123 Main St, Anytown, USA"
    },
    {
        id: 3,
        name: "Joshua Kim",
        email: "joshua.kim@gmail.com",
        phone: "0116543210",
        address: "789 Oak St, Anytown, USA"
        },
    {
        id: 4,
        name: "Emma James",
        email: "emma.james@gmail.com",
        phone: "0106543222",
        address: "456 Maple St, Anytown, USA"
        },
    {
        id: 5,
        name: "David Samuel",
        email: "david.samuel@gmail.com",
        phone: "0116543233",
        address: "789 Pine St, Anytown, USA"
        },
    {
        id: 6,
        name: "Jack Henry",
        email: "jack.henry@gmail.com",
        phone: "0126543244",
        address: "123 Cedar St, Anytown, USA"
        },
    {
        id: 7,
        name:"Elena Argent",
        email: "elena.argent@gmail.com",
        phone: "0136543255",
        address: "456 Walnut St, Anytown, USA"
        },
    {
        id: 8,
        name: "Majesty Brand",
        email: "majesty.brand@gmail.com",
        phone: "0146543266",
        address: "789 Elm St, Anytown, USA"
        }
    ];

    localStorage.setItem("customers", JSON.stringify(customersData));

}

    // saving data in local storage
   
        /* localStorage.setItem("products", JSON.stringify(productsData));
   
        localStorage.setItem("orders", JSON.stringify(ordersData));
        
        localStorage.setItem("customers", JSON.stringify(customersData));
 */

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let customerInfo = JSON.parse(localStorage.getItem("customers")) || [];


    


    

        