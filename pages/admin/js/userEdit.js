   let users = JSON.parse(localStorage.getItem("users")) || [];
   let urlParams = new URLSearchParams(window.location.search);
   let userIndex = urlParams.get("id");

   let form = document.getElementById("editUserForm");
   let usernameInput = document.getElementById("username");
   let emailInput = document.getElementById("email");
   let genderInput = document.getElementById("gender");
   let roleInput = document.getElementById("role");
   let profileInput = document.getElementById("profile_pic");
   let profilePreview = document.getElementById("profilePreview");

   // لو المستخدم موجود
   if (userIndex !== null && users[userIndex]) {
       let user = users[userIndex];
       usernameInput.value = user.username || user.brand_name || "";
       emailInput.value = user.email || "";
       genderInput.value = user.gender || "";
       roleInput.value = user.role || "";
       profilePreview.src = user.profile_pic ?
           "../../../images/" + user.profile_pic :
           "../../../images/logo.jpg";
   }

   // تغيير صورة البروفايل (preview)
   profileInput.addEventListener("change", function (e) {
       let file = e.target.files[0];
       if (file) {
           let reader = new FileReader();
           reader.onload = function (e) {
               profilePreview.src = e.target.result;
           };
           reader.readAsDataURL(file);
       }
   });

   // حفظ التعديلات
   form.addEventListener("submit", function (e) {
       e.preventDefault();

       let updatedUser = {
           ...users[userIndex],
           username: usernameInput.value,
           email: emailInput.value,
           gender: genderInput.value,
           role: roleInput.value,
           profile_pic: profileInput.files[0] ?
               profileInput.files[0].name : users[userIndex].profile_pic
       };

       users[userIndex] = updatedUser;
       localStorage.setItem("users", JSON.stringify(users));
       alert("User updated successfully!");
       window.location.href = "UsersPage.html";
   });