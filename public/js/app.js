function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token || !user) {
        window.location.href = 'index.html';
        return null;
    }
    return user;
}

async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('token');
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    options.headers = { ...defaultHeaders, ...options.headers };
    
    const res = await fetch(url, options);
    
    if (res.status === 401) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
    
    return res;
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
    });
}
