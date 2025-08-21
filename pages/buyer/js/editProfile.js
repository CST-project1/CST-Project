document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap Toast
    const toastEl = document.getElementById('toast');
    const toast = new bootstrap.Toast(toastEl);
    
    // Load profile data from localStorage
    loadProfileData();
    
    // Profile photo upload
    const profilePhoto = document.getElementById('profilePhoto');
    const profileImage = document.getElementById('profileImage');
    
    profilePhoto.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                profileImage.src = event.target.result;
                // Save to localStorage as base64
                localStorage.setItem('profilePhoto', event.target.result);
            }
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordField = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Form submission
    const profileForm = document.getElementById('profileForm');
    
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        
        // Save to localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        
        // Only update password if it's not empty
        if (password) {
            localStorage.setItem('password', password);
        }
        
        // Show toast notification
        toast.show();
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.hide();
        }, 3000);
    });
    
    // Cancel button
    document.getElementById('cancelBtn').addEventListener('click', function() {
        loadProfileData();
    });
    
    // Function to load profile data from localStorage
    function loadProfileData() {
        // Load profile photo
        const savedPhoto = localStorage.getItem('profilePhoto');
        if (savedPhoto) {
            profileImage.src = savedPhoto;
        }
        
        // Load other fields
        document.getElementById('username').value = localStorage.getItem('username') || '';
        document.getElementById('email').value = localStorage.getItem('email') || '';
        document.getElementById('phone').value = localStorage.getItem('phone') || '';
        
        // Don't load password for security reasons
        document.getElementById('password').value = '';
    }
    
    // Initialize with default data if localStorage is empty
    if (!localStorage.getItem('username')) {
        localStorage.setItem('username', 'johndoe');
        localStorage.setItem('email', 'john@example.com');
        localStorage.setItem('phone', '+1234567890');
        loadProfileData();
    }
});