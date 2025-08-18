// seed.js

// Generate Users (Admins + Sellers + Buyers)
const users = [{
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
        name: "Seller One",
        username: "seller1",
        email: "seller1@mail.com",
        password: "12345678",
        phone: "+1 (444) 444-4444",
        gender: "male",
        location: "Cairo",
        role: "Seller",
        logo: "images.jpeg",
        store_id: 1,
    },
    {
        id: 5,
        name: "Seller Two",
        username: "seller2",
        email: "seller2@mail.com",
        password: "12345678",
        phone: "+1 (555) 555-5555",
        gender: "female",
        location: "Dubai",
        role: "Seller",
        logo: "images.jpeg",
        store_id: 2,
    },
    {
        id: 6,
        name: "Seller Three",
        username: "seller3",
        email: "seller3@mail.com",
        password: "12345678",
        phone: "+1 (666) 666-6666",
        gender: "male",
        location: "Paris",
        role: "Seller",
        logo: "images.jpeg",
        store_id: 3,
    },
    {
        id: 7,
        name: "Seller Four",
        username: "seller4",
        email: "seller4@mail.com",
        password: "12345678",
        phone: "+1 (777) 777-7777",
        gender: "male",
        location: "Rome",
        role: "Seller",
        logo: "images.jpeg",
        store_id: 4,
    },
    {
        id: 8,
        name: "Seller Five",
        username: "seller5",
        email: "seller5@mail.com",
        password: "12345678",
        phone: "+1 (888) 888-8888",
        gender: "female",
        location: "Madrid",
        role: "Seller",
        logo: "images.jpeg",
        store_id: 5,
    },
];

// Generate 22 Buyers automatically
let lastId = 8;
for (let i = 1; i <= 22; i++) {
    users.push({
        id: ++lastId,
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

localStorage.setItem("users", JSON.stringify(users));
console.log("30 users saved to localStorage ✅");

// Stores
let stores = [{
        id: 1,
        name: "Fashion Hub",
        location: "Cairo",
        logo: "store1.jpg",
        user_id: 4, // seller1
    },
    {
        id: 2,
        name: "Trendy Wear",
        location: "Alexandria",
        logo: "store2.jpg",
        user_id: 5, // seller2
    },
    {
        id: 3,
        name: "Urban Style",
        location: "Cairo",
        logo: "store3.jpg",
        user_id: 6, // seller3
    },
    {
        id: 4,
        name: "Classic Outfit",
        location: "Giza",
        logo: "store4.jpg",
        user_id: 7, // seller4
    },
    {
        id: 5,
        name: "Luxury Fashion",
        location: "Luxor",
        logo: "store5.jpg",
        user_id: 8, // seller5
    },
];
localStorage.setItem("stores", JSON.stringify(stores));

// Products
let products = [];
for (let i = 1; i <= 25; i++) {
    products.push({
        id: i,
        name: `Men Product ${i}`,
        category: "Men",
        price: 100 + i * 5,
        stock: 50,
        store_id: (i % 5) + 1,
        seller_id: ((i % 5) + 1) + 3, // يربط بالـ seller المناسب
        image: "men.jpg",
    });
}
for (let i = 26; i <= 50; i++) {
    products.push({
        id: i,
        name: `Women Product ${i - 25}`,
        category: "Women",
        price: 120 + (i - 25) * 5,
        stock: 50,
        store_id: (i % 5) + 1,
        seller_id: ((i % 5) + 1) + 3,
        image: "women.jpg",
    });
}
localStorage.setItem("products", JSON.stringify(products));

// Orders
let orders = [];
let statuses = ["out to ship", "inqueue", "Delivered", "Cancelled", "Processing"];

for (let i = 1; i <= 30; i++) {
    let buyer = users.find(u => u.role === "Buyer" && u.id === 8 + ((i % 22) + 1));
    let store_id = (i % 5) + 1;
    let storeProducts = products.filter(p => p.store_id === store_id);

    // اختار 2-3 منتجات من نفس المتجر
    let orderProducts = [];
    let count = Math.floor(Math.random() * 2) + 2; // 2 أو 3 منتجات
    for (let j = 0; j < count; j++) {
        let prod = storeProducts[Math.floor(Math.random() * storeProducts.length)];
        let qty = Math.floor(Math.random() * 3) + 1; // 1-3
        orderProducts.push({
            product_id: prod.id,
            quantity: qty,
            price: prod.price,
        });
    }

    // احسب الاجمالي
    let total = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    orders.push({
        id: i,
        buyer_id: buyer.id,
        store_id,
        seller_id: stores.find(s => s.id === store_id).user_id,
        products: orderProducts,
        total,
        status: statuses[i % 5],
        date: new Date().toISOString().split("T")[0],
    });
}

localStorage.setItem("orders", JSON.stringify(orders));
console.log("Orders saved ✅");