document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.querySelector('.form-group');
    const profilePhotoInput = document.getElementById('profilePhoto');
    const profileImg = document.querySelector('img');
    const newPassInput = document.getElementById('newpass');
    const confirmPassInput = document.getElementById('confirmpass');
    
    // Load saved profile data if exists
    function loadProfileData() {
        const profileData = JSON.parse(localStorage.getItem('profileData'));
        
        if (profileData) {
            document.getElementById('fullName').value = profileData.fullName || '';
            document.getElementById('email').value = profileData.email || '';
            document.getElementById('phone').value = profileData.phone || '';
            document.getElementById('birth').value = profileData.birth || '';
            
            if (profileData.profilePhoto) {
                profileImg.src = profileData.profilePhoto;
            }
        }
    }
    
    // Handle profile photo upload preview
    profilePhotoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                profileImg.src = event.target.result;
                
                // Save to localStorage
                const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
                profileData.profilePhoto = event.target.result;
                localStorage.setItem('profileData', JSON.stringify(profileData));
            }
            
            reader.readAsDataURL(file);
        }
    });
    
    // Password confirmation validation
    function validatePassword() {
        if (newPassInput.value !== confirmPassInput.value) {
            confirmPassInput.setCustomValidity("Passwords don't match");
            return false;
        } else {
            confirmPassInput.setCustomValidity('');
            return true;
        }
    }
    
    newPassInput.addEventListener('input', validatePassword);
    confirmPassInput.addEventListener('input', validatePassword);
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 3 && value.length <= 6) {
            value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
        } else if (value.length > 6) {
            value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
        }
        
        e.target.value = value;
    });
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validatePassword()) {
            return;
        }
        
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        // Save profile data
        const profileData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            birth: document.getElementById('birth').value,
            profilePhoto: profileImg.src
        };
        
        localStorage.setItem('profileData', JSON.stringify(profileData));
        
        // Check if password was changed
        const currentPass = document.getElementById('currentpass').value;
        if (currentPass && newPassInput.value) {
            // In a real app, you would verify current password with server
            // and then update to new password
            alert('Password changed successfully!');
        }
        
        alert('Profile updated successfully!');
    });
    
    // Load profile data when page loads
    loadProfileData();
    
    // Add Bootstrap validation
    form.addEventListener('input', function() {
        if (form.classList.contains('was-validated')) {
            form.classList.remove('was-validated');
        }
    });
});