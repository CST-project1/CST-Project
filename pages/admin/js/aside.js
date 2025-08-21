fetch("../components/aside.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("sidebar-container").innerHTML = data;

        document.getElementById("toggleBtn").addEventListener("click", function () {
            document.querySelector("aside").classList.toggle("closed");
        });

        document.getElementById("mobileMenuBtn").addEventListener("click", function () {
            var offcanvas = new bootstrap.Offcanvas(document.getElementById("mobileSidebar"));
            offcanvas.show();
        });


        document.getElementById("mobileMenuList").innerHTML =
            document.getElementById("menuList").innerHTML;

        const currentPage = window.location.pathname.split("/").pop().toLowerCase();
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");
        const sellerId = urlParams.get("seller");
        const userId = urlParams.get("user");

        const orderId = urlParams.get("order");

        function handleSidebarLinks(selector) {
            document.querySelectorAll(selector + " a").forEach(link => {
                let href = link.getAttribute("href").toLowerCase();

                if (currentPage.includes("products.html") || currentPage.includes("productinfo.html")) {
                    if (href.includes("products.html")) {
                        link.parentElement.classList.add("active");

                        if (productId) {
                            link.innerHTML = `📦 Products <span class="badge bg-primary">#${productId}</span>`;
                        } else {
                            link.innerHTML = `📦 Products`;
                        }
                    }
                } else if (href.includes(currentPage)) {
                    link.parentElement.classList.add("active");
                }
                if (currentPage.includes("orders.html") || currentPage.includes("orderinfo.html")) {
                    if (href.includes("orders.html")) {
                        link.parentElement.classList.add("active");

                        if (orderId) {
                            link.innerHTML = `📦 Orders <span class="badge bg-primary">#${orderId}</span>`;
                        } else {
                            link.innerHTML = `📦 Orders`;
                        }
                    }
                }
                if (currentPage.includes("userspage.html") || currentPage.includes("userinfo.html")) {
                    if (href.includes("userspage.html")) {
                        link.parentElement.classList.add("active");

                        if (userId) {
                            link.innerHTML = `👤 Users <span class="badge bg-primary">#${userId}</span>`;
                        } else {
                            link.innerHTML = `👤 Users`;
                        }
                    }
                }
                if (currentPage.includes("sellers.html") || currentPage.includes("sellerinfo.html")) {
                    if (href.includes("sellers.html")) {
                        link.parentElement.classList.add("active");

                        if (sellerId) {
                            link.innerHTML = `🏪 Sellers <span class="badge bg-primary">#${sellerId}</span>`;
                        } else {
                            link.innerHTML = `🏪 Sellers`;
                        }
                    }
                }


            });
        }

        handleSidebarLinks("#menuList");
        handleSidebarLinks("#mobileMenuList");


        if ((currentPage.includes("products.html") || currentPage.includes("productinfo.html")) && productId) {
            let pageTitle = document.getElementById("page-title");
            if (pageTitle) {
                if (currentPage.includes("productinfo.html")) {
                    pageTitle.innerHTML = `Product Information - ID #${productId}`;
                } else {
                    pageTitle.innerHTML = `Products <span class="text-primary">#${productId}</span>`;
                }
            }

            let docTitle = document.getElementById("doc-title");
            if (docTitle) {
                docTitle.innerText = `Product Info - #${productId}`;
            }
        }
    });