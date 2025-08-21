document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // Fill profile card
//   document.getElementById("storeDisplayName").innerHTML = user.brand_name;
  document.getElementById("storeDisplayName").innerHTML = user.username;
  document.getElementById("storeDisplayEmail").textContent = user.email;
  document.getElementById("storeDisplayPhone").textContent = user.phone;
  document.getElementById("storeDisplayLocation").textContent = user.location || "Not provided";
  document.getElementById("storeDisplayAbout").textContent = user.about || "No description provided.";
  document.getElementById("storeDisplayLogo").src = user.logo
    ? `../images/${user.logo}`
    : "../images/placeholder.jpg";

  // get number of products from storage
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const sellerProducts = products.filter(p => p.sellerId === user.email);
  document.getElementById("storeProductsCount").textContent = sellerProducts.length;

  // Prefill modal fields
  document.getElementById("storeName").value = user.username;
  document.getElementById("storeEmail").value = user.email;
  document.getElementById("storePhone").value = user.phone;
  document.getElementById("storeLocation").value = user.location || "";
  document.getElementById("storeAbout").value = user.about || "";
});

//Save Changes
document.getElementById("save-btn").addEventListener("click", () => {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  // Update fields
  user.brand_name = document.getElementById("storeName").value;
  user.email = document.getElementById("storeEmail").value;
  user.phone = document.getElementById("storePhone").value;
  user.location = document.getElementById("storeLocation").value;
  user.about = document.getElementById("storeAbout").value;

  // Save back
  localStorage.setItem("currentUser", JSON.stringify(user));

  // Also update users in localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const idx = users.findIndex(u => u.username === user.username);
  if (idx !== -1) {
    users[idx] = user;
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Update profile display
  document.getElementById("storeDisplayName").textContent = user.brand_name;
  document.getElementById("storeDisplayEmail").textContent = user.email;
  document.getElementById("storeDisplayPhone").textContent = user.phone;
  document.getElementById("storeDisplayLocation").textContent = user.location;
  document.getElementById("storeDisplayAbout").textContent = user.about;

  alert("Profile updated successfully!");
  bootstrap.Modal.getInstance(document.getElementById("editProfileModal")).hide();
});

//Logout
// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("logout-btn").addEventListener("click", logout);
//   document.getElementById("logout-btn-2").addEventListener("click", logout);
// });

document.addEventListener("DOMContentLoaded", () => {
  const btn1 = document.getElementById("logout-btn");
  const btn2 = document.getElementById("logout-btn-2");

  if (btn1) {
    btn1.addEventListener("click", (e) => {
      e.preventDefault(); // stop <a href="#"> reload
      logout();
    });
  }
  if (btn2) {
    btn2.addEventListener("click", logout);
  }
});


//Sidebar Toggle
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}
