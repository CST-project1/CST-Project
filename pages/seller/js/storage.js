const PRODUCTS_KEY = "products"; // all products
const USERS_KEY = "users"; // all users (sellers + buyers)
const CURRENT_USER_KEY = "currentUser";

// Users
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loginUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function logout() {
  localStorage.removeItem("currentUser");

  window.location.href = "../../../login.html";
}

// Products
function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
}

function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}
// order section
/* const ORDER_STORAGE_KEY = "seller_orders";

function getOrders(){
  return JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY)) || [];
}

function saveOrders(orders) {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
} */



