// js/auth.js

loginBtn.addEventListener('click', () => {
    showAuthModal('login');
});

registerBtn.addEventListener('click', () => {
    showAuthModal('register');
});

logoutBtn.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
    toggleAuthButtons();
});

function showAuthModal(type) {
    authModal.style.display = 'block';
    authContent.innerHTML = `
        <h2 class="text-xl font-bold mb-4">${type === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h2>
        <form id="authForm">
            <input type="text" id="username" placeholder="Tên người dùng" class="w-full mb-4 p-2 rounded bg-gray-700 border border-gray-600" required>
            <input type="password" id="password" placeholder="Mật khẩu" class="w-full mb-4 p-2 rounded bg-gray-700 border border-gray-600" required>
            <button type="submit" class="w-full py-2 bg-green-500 hover:bg-green-600 rounded">Xác nhận</button>
        </form>
    `;
    document.getElementById('authForm').addEventListener('submit', e => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        currentUser = { username };
        saveUserToStorage();
        toggleAuthButtons();
        authModal.style.display = 'none';
    });
}

function toggleAuthButtons() {
    const isLoggedIn = !!currentUser;
    loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    registerBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
    uploadBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
    editBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
}
