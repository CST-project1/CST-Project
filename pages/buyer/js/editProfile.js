// document.addEventListener('DOMContentLoaded', function() {
//             // Initialize Toast
//             const successToast = new bootstrap.Toast(document.getElementById('successToast'));
            
//             // Get the current user ID (in a real app, this would come from authentication)
//             // For demo purposes, we'll use the first buyer (ID 8)
//             const currentUserId = 8;
            
//             // Load user data
//             loadUserData(currentUserId);
            
            
//             // Profile photo upload functionality
//             const profilePhoto = document.getElementById('profilePhoto');
//             const profileImage = document.getElementById('profileImage');
            
//             profilePhoto.addEventListener('change', function(e) {
//                 if (e.target.files && e.target.files[0]) {
//                     const reader = new FileReader();
                    
//                     reader.onload = function(event) {
//                         profileImage.src = event.target.result;
//                         // Save to user data
//                         updateUserData(currentUserId, 'logo', event.target.result);
//                     }
                    
//                     reader.readAsDataURL(e.target.files[0]);
//                 }
//             });
            
//             // // Password visibility toggle
//             // document.querySelectorAll('.password-toggle').forEach(toggle => {
//             //     toggle.addEventListener('click', function() {
//             //         const targetId = this.getAttribute('data-target');
//             //         const passwordField = document.getElementById(targetId);
//             //         const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
//             //         passwordField.setAttribute('type', type);
                    
//             //         // Toggle eye icon
//             //         const eyeIcon = this.querySelector('i');
//             //         if (type === 'password') {
//             //             eyeIcon.classList.remove('fa-eye-slash');
//             //             eyeIcon.classList.add('fa-eye');
//             //         } else {
//             //             eyeIcon.classList.remove('fa-eye');
//             //             eyeIcon.classList.add('fa-eye-slash');
//             //         }
//             //     });
//             // });
            
//             // Save button
//             document.getElementById('saveBtn').addEventListener('click', function() {
//                 // Get form values
//                 const name = document.getElementById('name').value;
//                 const username = document.getElementById('username').value;
//                 const email = document.getElementById('email').value;
//                 const phone = document.getElementById('phone').value;
//                 const location = document.getElementById('location').value;
//                 const gender = document.getElementById('gender').value;
                
//                 // Update user data
//                 updateUserData(currentUserId, 'name', name);
//                 updateUserData(currentUserId, 'username', username);
//                 updateUserData(currentUserId, 'email', email);
//                 updateUserData(currentUserId, 'phone', phone);
//                 updateUserData(currentUserId, 'location', location);
//                 updateUserData(currentUserId, 'gender', gender);
                
//                 // Handle password change if provided
//                 const currentPassword = document.getElementById('currentPassword').value;
//                 const newPassword = document.getElementById('newPassword').value;
//                 const confirmPassword = document.getElementById('confirmPassword').value;
                
//                 if (newPassword) {
//                     if (newPassword !== confirmPassword) {
//                         alert('New passwords do not match!');
//                         return;
//                     }
                    
//                     // In a real app, you would verify current password first
//                     updateUserData(currentUserId, 'password', newPassword);
//                 }
                
//                 // Show success toast
//                 successToast.show();
                
//                 // Clear password fields
//                 document.getElementById('currentPassword').value = '';
//                 document.getElementById('newPassword').value = '';
//                 document.getElementById('confirmPassword').value = '';
//             });
            
//             // Cancel button
//             document.getElementById('cancelBtn').addEventListener('click', function() {
//                 loadUserData(currentUserId);
//             });
            
//             // Function to load user data
//             function loadUserData(userId) {
//                 const users = JSON.parse(localStorage.getItem('users') || '[]');
//                 const user = users.find(u => u.id === userId);
                
//                 if (user) {
//                     // Load profile photo
//                     if (user.logo && user.logo !== 'profile.jpg') {
//                         profileImage.src = user.logo;
//                     }
                    
//                     // Load other fields
//                     document.getElementById('name').value = user.name || '';
//                     document.getElementById('username').value = user.username || '';
//                     document.getElementById('email').value = user.email || '';
//                     document.getElementById('phone').value = user.phone || '';
//                     document.getElementById('location').value = user.location || '';
//                     document.getElementById('gender').value = user.gender || '';
                    
//                     // Don't load password for security reasons
//                     document.getElementById('currentPassword').value = '';
//                     document.getElementById('newPassword').value = '';
//                     document.getElementById('confirmPassword').value = '';
//                 }
//             }
            
//             // Function to update user data
//             function updateUserData(userId, key, value) {
//                 const users = JSON.parse(localStorage.getItem('users') || '[]');
//                 const userIndex = users.findIndex(u => u.id === userId);
                
//                 if (userIndex !== -1) {
//                     users[userIndex][key] = value;
//                     localStorage.setItem('users', JSON.stringify(users));
//                 }
//             }
//         });



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
                    updateUserData(currentUser.id, 'logo', event.target.result);
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
        const user = users.find(u => u.id === userId);
        
        if (user) {
            // Load profile photo
            if (user.logo && profileImage) {
                profileImage.src = user.logo;
            }
            
            // Load other fields
            document.getElementById('first-name').value = user.name ? user.name.split(' ')[0] : '';
            document.getElementById('last-name').value = user.name ? user.name.split(' ').slice(1).join(' ') : '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('phone').value = user.phone || '';
            document.getElementById('username').value = user.username || '';
            
            // Load address if available
            if (user.address) {
                document.getElementById('address').value = user.address || '';
            }
            if (user.city) {
                document.getElementById('city').value = user.city || '';
            }
            if (user.zip) {
                document.getElementById('zip').value = user.zip || '';
            }
            if (user.country) {
                document.getElementById('country').value = user.country || 'us';
            }
            
            // Clear password fields
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
        }
    }
    
    // Function to save profile changes
    function saveProfileChanges(userId) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            // Update basic info
            users[userIndex].name = document.getElementById('first-name').value + ' ' + document.getElementById('last-name').value;
            users[userIndex].email = document.getElementById('email').value;
            users[userIndex].phone = document.getElementById('phone').value;
            users[userIndex].username = document.getElementById('username').value;
            
            // Update address
            users[userIndex].address = document.getElementById('address').value;
            users[userIndex].city = document.getElementById('city').value;
            users[userIndex].zip = document.getElementById('zip').value;
            users[userIndex].country = document.getElementById('country').value;
            
            // Handle password change
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (newPassword) {
                if (newPassword !== confirmPassword) {
                    alert('New passwords do not match!');
                    return;
                }
                
                // Verify current password (in real app, you'd hash this)
                if (currentPassword !== users[userIndex].password) {
                    alert('Current password is incorrect!');
                    return;
                }
                
                users[userIndex].password = newPassword;
            }
            
            // Save updated users
            localStorage.setItem('users', JSON.stringify(users));
            
            // Update current user in localStorage
            const currentUser = users[userIndex];
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
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
        }
    }
    
    // Function to update user data
    function updateUserData(userId, key, value) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            users[userIndex][key] = value;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Also update current user if this is the logged-in user
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.id === userId) {
                currentUser[key] = value;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
        }
    }
});
