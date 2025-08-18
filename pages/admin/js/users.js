    let users = JSON.parse(localStorage.getItem("users")) || [];
    let tbody = document.querySelector("tbody");

    function renderUsers() {
        tbody.innerHTML = ""; // تفريغ الجدول
        users.forEach((user, index) => {
            tbody.innerHTML += `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                        <a href="UserInfo.html?id=${index}" class="d-flex align-items-center">
                            <img src="../../../images/${user.profile_pic || user.logo || '../../../images/logo.jpg'}" 
                                 alt="User" class="me-3 rounded-circle"
                                 style="width: 40px; height: 40px; object-fit: cover;">
                            <div>
                                <div class="fw-semibold">${user.username || user.brand_name}</div>
                                <div class="text-muted small">#U-${index + 1}</div>
                            </div>
                        </a>
                        </div>
                    </td>
                    <td class="text-muted">${user.email}</td>
                    <td>${user.gender || '-'}</td>
                    <td>${user.role}</td>
                    <td>
                        <span class="badge bg-success">active</span>
                    </td>
                    <td>
                        <div>
                            <a href="UserEdit.html?id=${index}" class="btn btn-sm btn-outline-primary">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </a>
                            <button onclick="deleteUser(${index})" class="btn btn-sm btn-outline-danger">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
    }

    function deleteUser(index) {
        if (confirm("هل انت متأكد انك عايز تحذف المستخدم؟")) {
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users));
            renderUsers();
        }
    }
    renderUsers();