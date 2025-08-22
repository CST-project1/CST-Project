// seed.js

const users = [{
        id: 0,
        name: "Admin One",
        username: "admin1",
        email: "admin1@mail.com",
        password: "12345678",
        phone: "+1 (111) 111-1111",
        gender: "male",
        location: "New York",
        role: "Admin",
        logo: "store.jpg"
    },
    {
        id: 1,
        name: "Admin Two",
        username: "admin2",
        email: "admin2@mail.com",
        password: "12345678",
        phone: "+1 (222) 222-2222",
        gender: "female",
        location: "London",
        role: "Admin",
        logo: "store.jpg"
    },
    {
        id: 2,
        name: "Admin Three",
        username: "admin3",
        email: "admin3@mail.com",
        password: "12345678",
        phone: "+1 (333) 333-3333",
        gender: "male",
        location: "Berlin",
        role: "Admin",
        logo: "store.jpg"
    },

    // 5 Sellers
    {
        id: 3,
        name: "Seller One",
        username: "seller1",
        email: "seller1@mail.com",
        password: "12345678",
        phone: "+1 (444) 444-4444",
        gender: "male",
        location: "Cairo",
        role: "Seller",
        logo: "store.jpg",
        store_id: 1
    },
    {
        id: 4,
        name: "Seller Two",
        username: "seller2",
        email: "seller2@mail.com",
        password: "12345678",
        phone: "+1 (555) 555-5555",
        gender: "female",
        location: "Dubai",
        role: "Seller",
        logo: "store.jpg",
        store_id: 2
    },
    {
        id: 5,
        name: "Seller Three",
        username: "seller3",
        email: "seller3@mail.com",
        password: "12345678",
        phone: "+1 (666) 666-6666",
        gender: "male",
        location: "Paris",
        role: "Seller",
        logo: "store.jpg",
        store_id: 3
    },
    {
        id: 6,
        name: "Seller Four",
        username: "seller4",
        email: "seller4@mail.com",
        password: "12345678",
        phone: "+1 (777) 777-7777",
        gender: "male",
        location: "Rome",
        role: "Seller",
        logo: "store.jpg",
        store_id: 4
    },
    {
        id: 7,
        name: "Seller Five",
        username: "seller5",
        email: "seller5@mail.com",
        password: "12345678",
        phone: "+1 (888) 888-8888",
        gender: "female",
        location: "Madrid",
        role: "Seller",
        logo: "store.jpg",
        store_id: 5
    },
];

// Generate 22 Buyers automatically
for (let i = 1; i <= 22; i++) {
    users.push({
        id: i + 7,
        name: `Buyer ${i}`,
        username: `buyer${i}`,
        email: `buyer${i}@mail.com`,
        password: "12345678",
        phone: `+1 (900) 000-${1000 + i}`,
        gender: i % 2 === 0 ? "male" : "female",
        location: "Random City",
        role: "Buyer",
        logo: "logo.jpg",
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

products.push({
        id: 1,
        stock: 50,
        name: 'Golden Desert',
        price: 89.99,
        store_id: 1,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'Golden-Desert-6ml.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 2,
        stock: 50,
        name: 'Royal Oud',
        price: 119.99,
        store_id: 2,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CREEDROYALOUD.avif',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 3,
        stock: 50,
        name: 'Ocean Breeze',
        price: 59.99,
        store_id: 3,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'OceanBreeze.avif',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 4,
        stock: 50,
        name: 'Black Leather',
        price: 95.99,
        store_id: 0,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'BlackLeather.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 5,
        stock: 50,
        name: 'Woody Spice',
        price: 79.99,
        store_id: 1,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'WoodySpice.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    },

    // Women's Fragrances
    {

        id: 6,
        stock: 50,
        name: 'White Musk',
        price: 69.99,
        store_id: 4,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'WhiteMusk.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 7,
        stock: 50,
        name: 'Cherry Blossom',
        price: 79.99,
        store_id: 1,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CherryBlossom.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 8,
        stock: 50,
        name: 'Midnight Rose',
        price: 94.99,
        store_id: 2,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'MidnightRose.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 9,
        stock: 50,
        name: 'Vanilla Dreams',
        price: 74.99,
        store_id: 1,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'VanillaDreams.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 10,
        stock: 50,
        name: 'Floral Elegance',
        price: 84.99,
        store_id: 0,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'FloralElegance.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 11,
        stock: 50,
        name: 'Pink Peony',
        price: 67.99,
        store_id: 4,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'PinkPeony.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    },

    // Unisex Fragrances
    {

        id: 12,
        stock: 50,
        name: 'Citrus Burst',
        price: 64.99,
        store_id: 2,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CitrusBurst.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 13,
        stock: 50,
        name: 'Fresh Mint',
        price: 54.99,
        store_id: 1,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'FreshMint.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 14,
        stock: 50,
        name: 'Amber Glow',
        price: 89.99,
        store_id: 0,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'AmberGlow.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 15,
        stock: 50,
        name: 'Green Tea',
        price: 49.99,
        store_id: 3,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'GreenTea.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {
        id: 1,
        stock: 50,
        name: 'Golden Desert',
        price: 89.99,
        store_id: 1,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'Golden-Desert-6ml.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 2,
        stock: 50,
        name: 'Royal Oud',
        price: 119.99,
        store_id: 2,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CREEDROYALOUD.avif',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 3,
        stock: 50,
        name: 'Ocean Breeze',
        price: 59.99,
        store_id: 3,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'OceanBreeze.avif',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 4,
        stock: 50,
        name: 'Black Leather',
        price: 95.99,
        store_id: 0,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'BlackLeather.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 5,
        stock: 50,
        name: 'Woody Spice',
        price: 79.99,
        store_id: 1,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'WoodySpice.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    },

    // Women's Fragrances
    {

        id: 6,
        stock: 50,
        name: 'White Musk',
        price: 69.99,
        store_id: 4,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'WhiteMusk.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 7,
        stock: 50,
        name: 'Cherry Blossom',
        price: 79.99,
        store_id: 1,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CherryBlossom.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 8,
        stock: 50,
        name: 'Midnight Rose',
        price: 94.99,
        store_id: 2,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'MidnightRose.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 9,
        stock: 50,
        name: 'Vanilla Dreams',
        price: 74.99,
        store_id: 1,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'VanillaDreams.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 10,
        stock: 50,
        name: 'Floral Elegance',
        price: 84.99,
        store_id: 0,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'FloralElegance.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 11,
        stock: 50,
        name: 'Pink Peony',
        price: 67.99,
        store_id: 4,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'PinkPeony.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    },

    // Unisex Fragrances
    {

        id: 12,
        stock: 50,
        name: 'Citrus Burst',
        price: 64.99,
        store_id: 2,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CitrusBurst.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 13,
        stock: 50,
        name: 'Fresh Mint',
        price: 54.99,
        store_id: 1,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'FreshMint.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 14,
        stock: 50,
        name: 'Amber Glow',
        price: 89.99,
        store_id: 0,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'AmberGlow.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {
        id: 15,
        stock: 50,
        name: 'Golden Desert',
        price: 89.99,
        store_id: 1,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'Golden-Desert-6ml.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 16,
        stock: 50,
        name: 'Royal Oud',
        price: 119.99,
        store_id: 2,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CREEDROYALOUD.avif',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 17,
        stock: 50,
        name: 'Ocean Breeze',
        price: 59.99,
        store_id: 3,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'OceanBreeze.avif',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 18,
        stock: 50,
        name: 'Black Leather',
        price: 95.99,
        store_id: 0,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'BlackLeather.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 19,
        stock: 50,
        name: 'Woody Spice',
        price: 79.99,
        store_id: 1,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'WoodySpice.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    },

    // Women's Fragrances
    {

        id: 20,
        stock: 50,
        name: 'White Musk',
        price: 69.99,
        store_id: 4,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'WhiteMusk.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 21,
        stock: 50,
        name: 'Cherry Blossom',
        price: 79.99,
        store_id: 1,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CherryBlossom.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 22,
        stock: 50,
        name: 'Midnight Rose',
        price: 94.99,
        store_id: 2,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'MidnightRose.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 23,
        stock: 50,
        name: 'Vanilla Dreams',
        price: 74.99,
        store_id: 1,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'VanillaDreams.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 24,
        stock: 50,
        name: 'Floral Elegance',
        price: 84.99,
        store_id: 0,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'FloralElegance.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 25,
        stock: 50,
        name: 'Pink Peony',
        price: 67.99,
        store_id: 4,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'PinkPeony.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    },

    // Unisex Fragrances
    {

        id: 26,
        stock: 50,
        name: 'Citrus Burst',
        price: 64.99,
        store_id: 2,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CitrusBurst.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 27,
        stock: 50,
        name: 'Fresh Mint',
        price: 54.99,
        store_id: 1,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'FreshMint.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 28,
        stock: 50,
        name: 'Amber Glow',
        price: 89.99,
        store_id: 0,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'AmberGlow.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {
        id: 29,
        stock: 50,
        name: 'Golden Desert',
        price: 89.99,
        store_id: 1,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'Golden-Desert-6ml.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 30,
        stock: 50,
        name: 'Royal Oud',
        price: 119.99,
        store_id: 2,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CREEDROYALOUD.avif',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 31,
        stock: 50,
        name: 'Ocean Breeze',
        price: 59.99,
        store_id: 3,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'OceanBreeze.avif',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 32,
        stock: 50,
        name: 'Black Leather',
        price: 95.99,
        store_id: 0,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'BlackLeather.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 33,
        stock: 50,
        name: 'Woody Spice',
        price: 79.99,
        store_id: 1,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'WoodySpice.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    },

    // Women's Fragrances
    {

        id: 34,
        stock: 50,
        name: 'White Musk',
        price: 69.99,
        store_id: 4,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'WhiteMusk.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 35,
        stock: 50,
        name: 'Cherry Blossom',
        price: 79.99,
        store_id: 1,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CherryBlossom.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 36,
        stock: 50,
        name: 'Midnight Rose',
        price: 94.99,
        store_id: 2,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'MidnightRose.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 37,
        stock: 50,
        name: 'Vanilla Dreams',
        price: 74.99,
        store_id: 1,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'VanillaDreams.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 38,
        stock: 50,
        name: 'Floral Elegance',
        price: 84.99,
        store_id: 0,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'FloralElegance.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 39,
        stock: 50,
        name: 'Pink Peony',
        price: 67.99,
        store_id: 4,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'PinkPeony.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    },

    // Unisex Fragrances
    {

        id: 40,
        stock: 50,
        name: 'Citrus Burst',
        price: 64.99,
        store_id: 2,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CitrusBurst.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 41,
        stock: 50,
        name: 'Fresh Mint',
        price: 54.99,
        store_id: 1,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'FreshMint.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 42,
        stock: 50,
        name: 'Amber Glow',
        price: 89.99,
        store_id: 0,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'AmberGlow.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {
        id: 43,
        stock: 50,
        name: 'Golden Desert',
        price: 89.99,
        store_id: 1,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'Golden-Desert-6ml.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 44,
        stock: 50,
        name: 'Royal Oud',
        price: 119.99,
        store_id: 2,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CREEDROYALOUD.avif',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 45,
        stock: 50,
        name: 'Ocean Breeze',
        price: 59.99,
        store_id: 3,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'OceanBreeze.avif',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 4,
        stock: 50,
        name: 'Black Leather',
        price: 95.99,
        store_id: 0,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'BlackLeather.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 46,
        stock: 50,
        name: 'Woody Spice',
        price: 79.99,
        store_id: 1,
        category: 'men',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'WoodySpice.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    },

    // Women's Fragrances
    {

        id: 47,
        stock: 50,
        name: 'White Musk',
        price: 69.99,
        store_id: 4,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'WhiteMusk.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 48,
        stock: 50,
        name: 'Cherry Blossom',
        price: 79.99,
        store_id: 1,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CherryBlossom.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 49,
        stock: 50,
        name: 'Midnight Rose',
        price: 94.99,
        store_id: 2,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'MidnightRose.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 50,
        stock: 50,
        name: 'Vanilla Dreams',
        price: 74.99,
        store_id: 1,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'VanillaDreams.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 51,
        stock: 50,
        name: 'Floral Elegance',
        price: 84.99,
        store_id: 0,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'FloralElegance.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 52,
        stock: 50,
        name: 'Pink Peony',
        price: 67.99,
        store_id: 4,
        category: 'women',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'PinkPeony.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    },

    // Unisex Fragrances
    {

        id: 53,
        stock: 50,
        name: 'Citrus Burst',
        price: 64.99,
        store_id: 2,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'CitrusBurst.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: true
    }, {

        id: 54,
        stock: 50,
        name: 'Fresh Mint',
        price: 54.99,
        store_id: 1,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'FreshMint.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    }, {

        id: 55,
        stock: 50,
        name: 'Amber Glow',
        price: 89.99,
        store_id: 0,
        category: 'unisex',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
        image: 'AmberGlow.jpg',
        rating: 4.5,
        discount: 10,
        rating_count: 100,
        Ingredients: "",
        CountryofOrigin: "",
        featured: false
    },
)



localStorage.setItem("products", JSON.stringify(products));
let orders = [];

// 30 orders divided into 5 statuses
let statuses = ["out to ship", "inqueue", "Delivered", "Cancelled", "Processing"];

for (let i = 1; i <= 30; i++) {
    // توزيع الشهور (من 0 لـ 7)
    let randomMonth = i % 8;
    let randomDay = (i % 28) + 1; // علشان نتجنب مشاكل الشهور الصغيرة

    let productId = (i % 50) + 1;
    let product = products.find(p => p.id === productId);
    let store = stores.find(s => s.id === product.store_id);
    if (!store) continue;
    let seller = users.find(u => u.role === "Seller" && u.store_id === store.id);

    // random buyer
    let buyerId = 8 + (i % 22); // أول مشترى يبدأ من id = 8

    orders.push({
        id: i,
        sellerId: seller ? seller.id : null,
        buyerId: buyerId,
        product_id: productId,
        quantity: (i % 3) + 1,
        total: product.price * ((i % 3) + 1),
        status: statuses[i % 5],
        date: new Date(2024, randomMonth, randomDay).toISOString().split("T")[0]
    });

}

// Save in LocalStorage
localStorage.setItem("orders", JSON.stringify(orders));