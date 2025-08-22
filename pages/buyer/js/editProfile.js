document.addEventListener('DOMContentLoaded', function() {
    // Initialize Toast
    const toastEl = document.getElementById('successToast');
    const successToast = toastEl ? new bootstrap.Toast(toastEl) : null;
    
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        alert('Please log in to edit your profile');
        window.location.href = 'login.html';
        return;
    }
    
    console.log('Current user:', currentUser); // Debug log
    
    // Load user data
    loadUserData(currentUser.id);
    
    // Profile photo upload functionality
    const profilePhoto = document.getElementById('profile-picture-upload');
    const profileImage = document.getElementById('profile-image');
    
    if (profilePhoto && profileImage) {
        profilePhoto.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    profileImage.src = event.target.result;
                    // Save to user data
                    updateUserField(currentUser.id, 'logo', event.target.result);
                }
                
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }
    
    // Form submission
    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileChanges(currentUser.id);
        });
    }
    
    // Function to load user data
    function loadUserData(userId) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        // Convert userId to number for comparison (localStorage might store it as string)
        const user = users.find(u => u.id === parseInt(userId));
        
        console.log('Loading user data:', user); // Debug log
        
        if (user) {
            // Load profile photo
            if (user.logo && profileImage) {
                // Check if it's a data URL or a file name
                if (user.logo.startsWith('data:image')) {
                    profileImage.src = user.logo;
                } else {
                    // It's a filename, construct the path
                    profileImage.src = `../images/${user.logo}`;
                }
            }
            
            // Split full name into first and last names
            let firstName = '';
            let lastName = '';
            if (user.name) {
                const nameParts = user.name.split(' ');
                firstName = nameParts[0] || '';
                lastName = nameParts.slice(1).join(' ') || '';
            }
            
            // Fill form fields
            document.getElementById('first-name').value = firstName;
            document.getElementById('last-name').value = lastName;
            document.getElementById('email').value = user.email || '';
            document.getElementById('phone').value = user.phone || '';
            document.getElementById('username').value = user.username || '';
            
            // Clear password fields
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
        } else {
            console.error('User not found with ID:', userId);
        }
    }
    
    // Function to save profile changes
    function saveProfileChanges(userId) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        // Convert userId to number for comparison
        const userIndex = users.findIndex(u => u.id === parseInt(userId));
        
        if (userIndex === -1) {
            alert('User not found!');
            return;
        }
        
        // Get form values
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const username = document.getElementById('username').value;
        
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Validate password change
        if (newPassword) {
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match!');
                return;
            }
            
            // Verify current password
            if (currentPassword !== users[userIndex].password) {
                alert('Current password is incorrect!');
                return;
            }
            
            users[userIndex].password = newPassword;
        }
        
        // Update user data
        users[userIndex].name = `${firstName} ${lastName}`.trim();
        users[userIndex].email = email;
        users[userIndex].phone = phone;
        users[userIndex].username = username;
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update currentUser in localStorage
        const updatedUser = users[userIndex];
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Show success message
        if (successToast) {
            successToast.show();
        } else {
            alert('Profile updated successfully!');
        }
        
        // Clear password fields
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
        
        // Reload the data to confirm it's saved
        setTimeout(() => loadUserData(userId), 1000);
    }
    
    // Function to update single user field
    function updateUserField(userId, key, value) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        // Convert userId to number for comparison
        const userIndex = users.findIndex(u => u.id === parseInt(userId));
        
        if (userIndex !== -1) {
            users[userIndex][key] = value;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Update currentUser if this is the logged-in user
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.id === parseInt(userId)) {
                currentUser[key] = value;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
        }
    }
});