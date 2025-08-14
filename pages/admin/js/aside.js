       document.getElementById("toggleBtn").addEventListener("click", function () {
           document.querySelector("aside").classList.toggle("closed");
       });

       document.getElementById("mobileMenuBtn").addEventListener("click", function () {
           var offcanvas = new bootstrap.Offcanvas(document.getElementById("mobileSidebar"));
           offcanvas.show();
       });

       // Copy sidebar menu to mobile menu
       document.getElementById("mobileMenuList").innerHTML = document.getElementById("menuList").innerHTML;