    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(u => u.username === username && u.password === password);

      if (!user) {
        alert("Invalid username or password!");
        return;
      }

      //Save logged-in user to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));

      if (user.role === "Seller") {
        window.location.href = "pages/seller/pages/index.html";
      } else if (user.role === "Buyer") {
        window.location.href = "pages/buyer/pages/index.html";
      }else if (user.role === "Admin") {
        window.location.href = "pages/admin/pages/index.html";
      } else {
        alert("Unknown role! Please register again.");
      }
    });