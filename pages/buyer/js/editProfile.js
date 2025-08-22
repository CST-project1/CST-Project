document.addEventListener('DOMContentLoaded', function () {
    // Initialize Toast
    const toastEl = document.getElementById('successToast');
    const successToast = toastEl ? new bootstrap.Toast(toastEl) : null;

    // Get DOM elements (خليهم فوق عشان يبقوا متاحين لكل الفانكشنات)
    const profilePhoto = document.getElementById('profile-picture-upload');
    const profileImage = document.getElementById('profile-image');
    const editProfileForm = document.getElementById('edit-profile-form');

    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to edit your profile');
        window.location.href = 'login.html';
        return;
    }
    console.log('Current user:', currentUser);

    // Load user data
    loadUserData(currentUser.id);

    // Profile photo upload functionality
    if (profilePhoto && profileImage) {
        profilePhoto.addEventListener('change', function (e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    profileImage.src = event.target.result;
                    updateUserField(currentUser.id, 'logo', event.target.result);
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    // Form submission
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            saveProfileChanges(currentUser.id);
        });
    }

    // ---------------- Functions ---------------- //

    function loadUserData(userId) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.id === parseInt(userId));
        console.log('Loading user data:', user);

        if (user) {
            // Load profile photo
            if (user.logo && profileImage) {
                if (user.logo.startsWith('data:image')) {
                    profileImage.src = user.logo;
                } else {
                    profileImage.src = `../../../images/${user.logo}`;
                }
            }

            // Split full name
            let firstName = '';
            let lastName = '';
            if (user.name) {
                const nameParts = user.name.split(' ');
                firstName = nameParts[0] || '';
                lastName = nameParts.slice(1).join(' ') || '';
            }

            // Fill form
            document.getElementById('first-name').value = firstName;
            document.getElementById('last-name').value = lastName;
            document.getElementById('email').value = user.email || '';
            document.getElementById('phone').value = user.phone || '';
            document.getElementById('username').value = user.username || '';

            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
        } else {
            console.error('User not found with ID:', userId);
        }
    }

    function saveProfileChanges(userId) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === parseInt(userId));
        if (userIndex === -1) {
            alert('User not found!');
            return;
        }

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const username = document.getElementById('username').value;
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword) {
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match!');
                return;
            }
            if (currentPassword !== users[userIndex].password) {
                alert('Current password is incorrect!');
                return;
            }
            users[userIndex].password = newPassword;
        }

        users[userIndex].name = `${firstName} ${lastName}`.trim();
        users[userIndex].email = email;
        users[userIndex].phone = phone;
        users[userIndex].username = username;

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

        if (successToast) {
            successToast.show();
        } else {
            alert('Profile updated successfully!');
        }

        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';

        setTimeout(() => loadUserData(userId), 1000);
    }

    function updateUserField(userId, key, value) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === parseInt(userId));
        if (userIndex !== -1) {
            users[userIndex][key] = value;
            localStorage.setItem('users', JSON.stringify(users));

            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.id === parseInt(userId)) {
                currentUser[key] = value;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
        }
    }
});