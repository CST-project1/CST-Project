document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // فلترة البياّنات بحيث يعرض فقط Sellers
    let sellers = users.filter(user => user.role === "Seller");

    let tbody = document.getElementById("sellersTable");
    let searchInput = document.querySelector("input[type='text']");

    function renderTable(data) {
        tbody.innerHTML = "";

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No sellers found</td></tr>`;
            return;
        }

        data.forEach((user) => {
            tbody.innerHTML += `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <a href="sellerInfo.html?id=${user.id}" class="d-flex align-items-center text-decoration-none text-dark">
                                <img src="${user.profile_pic || '../../../images/logo.jpg'}" 
                                     alt="profile" width="40" height="40" class="rounded-circle me-2">
                                <div>
                                    <div class="fw-semibold">${user.username}</div>
                                    <div class="text-muted small">#${user.id || 'N/A'}</div>
                                </div>
                            </a>
                        </div>
                    </td>
                    <td>${user.email}</td>
                    <td>${user.gender || '-'}</td>
                    <td>${user.store_name || 'No Store'}</td>
                    <td>
                        <span class="badge ${user.status === "active" ? "bg-success" : "bg-danger"}">
                            ${user.status || 'inactive'}
                        </span>
                    </td>
                    <td>
                        <a href="#" class="btn btn-sm btn-outline-primary me-1">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="#" class="btn btn-sm btn-outline-danger">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                    </td>
                </tr>
            `;
        });
    }

    renderTable(sellers);
    searchInput.addEventListener("input", function () {
        let term = this.value.toLowerCase();
        let filtered = sellers.filter(user =>
            (user.username && user.username.toLowerCase().includes(term)) ||
            (user.email && user.email.toLowerCase().includes(term)) ||
            (user.id && user.id.toString().toLowerCase().includes(term)) ||
            (user.store_name && user.store_name.toLowerCase().includes(term))
        );
        renderTable(filtered);
    });
});