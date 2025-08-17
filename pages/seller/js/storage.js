// storage.js
const STORAGE_KEY = "seller_products";

function getProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}
