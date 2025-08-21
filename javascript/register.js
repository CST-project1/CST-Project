const roleSelect = document.getElementById("role");
const sellerFields = document.getElementById("sellerFields");
const buyerFields = document.getElementById("buyerFields");

roleSelect.addEventListener("change", function () {
    if (this.value === "Seller") {
        sellerFields.classList.remove("d-none");
        buyerFields.classList.add("d-none");
    } else if (this.value === "Buyer") {
        buyerFields.classList.remove("d-none");
        sellerFields.classList.add("d-none");
    } else {
        sellerFields.classList.add("d-none");
        buyerFields.classList.add("d-none");
    }
});

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        role: document.getElementById("role").value
    };

    if (data.role === "Seller") {
        data.brand_name = document.getElementById("brand_name").value;
        data.location = document.getElementById("seller_location").value;
        data.logo = document.getElementById("logo").files[0]?.name || null;
    } else if (data.role === "Buyer") {
        data.location = document.getElementById("buyer_location").value;
        data.profile_pic = document.getElementById("profile_pic").files[0]?.name || null;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    this.reset();
    sellerFields.classList.add("d-none");
    buyerFields.classList.add("d-none");

    window.location.href = "login.html";
});
