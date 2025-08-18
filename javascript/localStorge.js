// seed.js

const users = [{
        name: "Admin One",
        username: "admin1",
        email: "admin1@mail.com",
        password: "12345678",
        phone: "+1 (111) 111-1111",
        gender: "male",
        location: "New York",
        role: "Admin",
        logo: "logo.jpg",
    },
    {
        name: "Admin Two",
        username: "admin2",
        email: "admin2@mail.com",
        password: "12345678",
        phone: "+1 (222) 222-2222",
        gender: "female",
        location: "London",
        role: "Admin",
        logo: "logo.jpg",
    },
    {
        name: "Admin Three",
        username: "admin3",
        email: "admin3@mail.com",
        password: "12345678",
        phone: "+1 (333) 333-3333",
        gender: "male",
        location: "Berlin",
        role: "Admin",
        logo: "logo.jpg",
    },

    // 5 Sellers
    {
        name: "Seller One",
        username: "seller1",
        email: "seller1@mail.com",
        password: "12345678",
        phone: "+1 (444) 444-4444",
        gender: "male",
        location: "Cairo",
        role: "Seller",
        logo: "images.jpeg",
        store_id: 1
    },
    {
        name: "Seller Two",
        username: "seller2",
        email: "seller2@mail.com",
        password: "12345678",
        phone: "+1 (555) 555-5555",
        gender: "female",
        location: "Dubai",
        role: "Seller",
        logo: "images.jpeg",
        store_id: 2
    },
    {
        name: "Seller Three",
        username: "seller3",
        email: "seller3@mail.com",
        password: "12345678",
        phone: "+1 (666) 666-6666",
        gender: "male",
        location: "Paris",
        role: "Seller",
        logo: "images.jpeg",
        store_id: 3
    },
    {
        name: "Seller Four",
        username: "seller4",
        email: "seller4@mail.com",
        password: "12345678",
        phone: "+1 (777) 777-7777",
        gender: "male",
        location: "Rome",
        role: "Seller",
        logo: "images.jpeg",
        store_id: 4
    },
    {
        name: "Seller Five",
        username: "seller5",
        email: "seller5@mail.com",
        password: "12345678",
        phone: "+1 (888) 888-8888",
        gender: "female",
        location: "Madrid",
        role: "Seller",
        logo: "images.jpeg",
        store_id: 5
    },
];

// Generate 22 Buyers automatically
for (let i = 1; i <= 22; i++) {
    users.push({
        name: `Buyer ${i}`,
        username: `buyer${i}`,
        email: `buyer${i}@mail.com`,
        password: "12345678",
        phone: `+1 (900) 000-${1000 + i}`,
        gender: i % 2 === 0 ? "male" : "female",
        location: "Random City",
        role: "Buyer",
        logo: "profile.jpg",
    });
}

// Save in localStorage
localStorage.setItem("users", JSON.stringify(users));
console.log("30 users saved to localStorage ✅");
let stores = [{
        id: 1,
        name: "Fashion Hub",
        location: "Cairo",
        logo: "store1.jpg",
        owner: "seller1"
    },
    {
        id: 2,
        name: "Trendy Wear",
        location: "Alexandria",
        logo: "store2.jpg",
        owner: "seller2"
    },
    {
        id: 3,
        name: "Urban Style",
        location: "Cairo",
        logo: "store3.jpg",
        owner: "seller3"
    },
    {
        id: 4,
        name: "Classic Outfit",
        location: "Giza",
        logo: "store4.jpg",
        owner: "seller4"
    },
    {
        id: 5,
        name: "Luxury Fashion",
        location: "Luxor",
        logo: "store5.jpg",
        owner: "seller5"
    }
];

// Save in LocalStorage
localStorage.setItem("stores", JSON.stringify(stores));
let products = [];

// 25 Men's Products
for (let i = 1; i <= 25; i++) {
    products.push({
        id: i,
        name: `Men Product ${i}`,
        category: "Men",
        price: (100 + i * 5),
        stock: 50,
        store_id: (i % 5) + 1,
        image: "men.jpg"
    });
}

// 25 Women's Products
for (let i = 26; i <= 50; i++) {
    products.push({
        id: i,
        name: `Women Product ${i - 25}`,
        category: "Women",
        price: (120 + (i - 25) * 5),
        stock: 50,
        store_id: (i % 5) + 1,
        image: "women.jpg"
    });
}

// Save in LocalStorage
localStorage.setItem("products", JSON.stringify(products));
let orders = [];

// 30 orders divided into 3 statuses
let statuses = ["out to ship", "inqueue", "Delivered", "Cancelled", "Processing"];

for (let i = 1; i <= 30; i++) {
    orders.push({
        id: i,
        buyer: `buyer${(i % 22) + 1}`,
        product_id: (i % 50) + 1,
        quantity: (i % 3) + 1,
        total: (100 + i * 2),
        status: statuses[i % 5],
        date: new Date().toISOString().split("T")[0]
    });
}

// Save in LocalStorage
localStorage.setItem("orders", JSON.stringify(orders));