// storage.js
const STORAGE_KEY = "seller_products";

function getProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// order section
/* const ORDER_STORAGE_KEY = "seller_orders";

function getOrders(){
  return JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY)) || [];
}

function saveOrders(orders) {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
} */



