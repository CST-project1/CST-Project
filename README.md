# 🛍️ Perfume E-Commerce Platform

## 📌 Overview
This project is a **web-based e-commerce platform** built for perfume sellers and buyers.  
It provides a complete system with **Seller, Buyer, and Admin dashboards**, and manages products, stores, and orders using **localStorage**.  

The project was developed as part of a **ITI 4 Months Scolarship** to practice **frontend, JavaScript, and localStorage-based data management** without a backend server.  

---

## 🚀 Features

### 🔑 Authentication & Users
- Login system for **Admin, Seller, and Buyer** roles.
- LocalStorage stores users, products, stores, and orders.
- Current logged-in user tracked via `currentUser`.

### 🛒 Seller Dashboard
- Add, edit, and delete products.
- Manage store details (name, logo, price, stock).
- Track seller statistics:
  - **Total Products**
  - **In-Stock Units**
  - **Orders Received**
  - **Sales This Month**
- Product management with:
  - Pagination
  - Product images (supports multiple images with carousel)
  - Stock-based status (**Active / Out of Stock**).

### 👤 Buyer Dashboard
- Browse products by category (Men / Women).
- Add products to cart.
- Place orders and track order status.

### 🛠️ Admin Dashboard
- Manage users (Admins, Sellers, Buyers).
- View all products and orders.
- Control store visibility.

### 📦 Orders System
- Buyers can place orders.
- Orders tracked with statuses:
  - **In Queue, Out to Ship, Processing, Delivered, Cancelled**.
- Admin and sellers can view order history.

---

## 🗂️ Data Structure (LocalStorage)
We use `localStorage` to simulate a database.  

### Users (`seller`)
```json
{
    "username": "Amira Mohamed",
    "email": "amiramo@seller.com",
    "password": "123456789",
    "phone": "01025589661",
    "brand_name": "Amira Mohamed",
    "location": "Mansoura",
    "about": "this is about Amira store",
    "logo": "logo.png",
    "role": "Seller",
}
```
### Users (`admin`)
```json
{
    "id": 0,
    "name": "Admin One",
    "username": "admin1",
    "email": "admin1@mail.com",
    "password": "12345678",
    "phone": "+1 (111) 111-1111",
    "gender": "male",
    "location": "New York",
    "role": "Admin",
    "logo": "logo.jpg",
}
```
### Users (`buyer`)
```json
{
    "id": 0,
    "name": "buyer1",
    "username": "Buyer1",
    "email": "buyer1@mail.com",
    "password": "12345678",
    "phone": "+1 (111) 111-1111",
    "gender": "female",
    "location": "Cairo",
    "role": "Buyer",
    "logo": "profile.jpg",
}
```
---
## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Bootstrap 5
- **Scripting**: JavaScript (ES6+)
- **Data Storage**: Browser LocalStorage
- **Icons & UI**: FontAwesome, Bootstrap Icons
- **Version Control**: Git & GitHub

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/CST-project1/CST-Project.git
   cd CST-Project

## ▶️ Run Locally

1. **Open directly in browser**
   - Locate the project folder.
   - Double-click on `index.html`.

2. **Using Live Server (Recommended)**
   - Open the project in **VS Code**.
   - Install the **Live Server** extension (if not installed).
   - Right-click on `index.html` → **"Open with Live Server"**.

---
## 📝 Usage Guide

### 1️⃣ Login
- Open the project in your browser.
- Use one of the demo accounts (see below).
- System redirects based on **role**:
  - **Admin → Admin Dashboard**
  - **Seller → Seller Dashboard**
  - **Buyer → Buyer Dashboard**

### 2️⃣ Seller Workflow
- **Dashboard** → View store statistics.
- **Add Product** → Upload new products with images.
- **Product Management** → Edit, delete, or view product details.
- **Orders History** → See received orders and their status.

### 3️⃣ Buyer Workflow
- **Browse Products** → View Men’s and Women’s categories.
- **Add to Cart** → Select quantity and add to cart.
- **Checkout** → Place an order.
- **Track Orders** → See order status in history.

### 4️⃣ Admin Workflow
- **Manage Users** → View and manage all registered users.
- **View Stores** → See all seller stores and details.
- **Orders Panel** → Track all orders in the system.

---   