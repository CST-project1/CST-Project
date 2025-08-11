document.addEventListener("DOMContentLoaded", function(){
    const editbtn = document.querySelector("#edit-btn");
    const savebtn = document.querySelector("#editProfileModal .btn-primary");

    //displayed elements
    const displayName = document.getElementById("storeDisplayName");
    const displayEmail = document.getElementById("storeDisplayEmail");
    const displayPhone = document.getElementById("storeDisplayPhone");
    const displayLocation = document.getElementById("storeDisplayLocation");
    const displayAbout = document.getElementById("storeDisplayAbout");

    //input fields
    const inputName = document.getElementById("storeName");
    const inputEmail = document.getElementById("storeEmail");
    const inputPhone = document.getElementById("storePhone");
    const inputLocation = document.getElementById("storeLocation");
    const inputAbout = document.getElementById("storeAbout");

    //load user info in form when he clicks edit button
    editbtn.addEventListener("click", function(){
        inputName.value = displayName.textContent.trim();
        inputEmail.value = displayEmail.textContent.trim();
        inputPhone.value = displayPhone.textContent.trim();
        inputLocation.value = displayLocation.textContent.trim();
        inputAbout.value = displayAbout.textContent.trim();
    });

    //save changes
    savebtn.addEventListener("click", function(){
        displayName.textContent = inputName.value;
        displayEmail.textContent = inputEmail.value;
        displayPhone.textContent = inputPhone.value;
        displayLocation.textContent = inputLocation.value;
        displayAbout.textContent = inputAbout.value;

        //close model
        const model = bootstrap.Modal.getInstance(document.getElementById("editProfileModal"));
        model.hide();
    });
})