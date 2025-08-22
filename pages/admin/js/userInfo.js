let users = JSON.parse(localStorage.getItem("users")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let params = new URLSearchParams(window.location.search);
let userIndex = params.get("id");
let user = users[userIndex];

if (user) {
    document.getElementById("userName").textContent = user.username || user.brand_name || "-";
    document.getElementById("userEmail").textContent = user.email || "-";
    document.getElementById("userRole").textContent = user.role || "-";
    document.getElementById("userGender").textContent = user.gender || "-";
    document.getElementById("userLocation").value = user.location || "";
    document.getElementById("profileImg").src = user.logo ? "../../../images/" + user.logo : "../../../images/1.jpg";
}

// Update Location
document.getElementById("locationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let newLoc = document.getElementById("userLocation").value;
    users[userIndex].location = newLoc;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Location updated successfully!");
});

// Change Password
document.getElementById("passwordForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let newPass = document.getElementById("newPassword").value;
    let confirmPass = document.getElementById("confirmPassword").value;

    if (newPass !== confirmPass) {
        alert("Passwords do not match!");
        return;
    }

    users[userIndex].password = newPass;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password updated successfully!");
});

// Render Order History
function renderOrders() {
    let tbody = document.getElementById("orderHistory");
    tbody.innerHTML = "";

    let userOrders = orders.filter(o => o.buyer?.toLowerCase() === user.username?.toLowerCase());

    if (userOrders.length === 0 && user.id != null) {
        userOrders = orders.filter(o => o.buyerId == user.id);
    }

    if (userOrders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center">No orders found</td></tr>`;
        return;
    }

    userOrders.forEach((order, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td><a href="orderInfo.html?id=${order.id}">#${order.id}</a></td>
                <td>${order.date}</td>
                <td>${order.status}</td>
                <td>${order.total}$</td>
            </tr>
        `;
    });
}

renderOrders();
