// js/main.js - FINAL
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation ---
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const mobileNavPanel = document.getElementById('mobile-nav');
    const closeNavBtn = document.getElementById('close-nav-btn');

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => mobileNavPanel.classList.add('active'));
    if (closeNavBtn) closeNavBtn.addEventListener('click', () => mobileNavPanel.classList.remove('active'));

    // --- GLOBAL FIREBASE & AUTH LOGIC ---
    // This code now runs on every page.
    const firebaseConfig = {
        apiKey: "AIzaSyBtCSFfTvu1peSJvU2mt2di29C4dlCRmLA",
        authDomain: "notebook-021.firebaseapp.com",
        projectId: "notebook-021",
        storageBucket: "notebook-021.appspot.com",
        messagingSenderId: "698880291664",
        appId: "1:698880291664:web:2df8500cc801fb856c3255",
        measurementId: "G-TSYHPTNMME"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const db = firebase.firestore();

    // Function to show a modal on ANY page
    function showGlobalModal(htmlContent) {
        // Create modal overlay if it doesn't exist
        let modal = document.getElementById('global-modal-container');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'global-modal-container';
            modal.className = 'modal-overlay';
            document.body.appendChild(modal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('visible');
            });
        }
        modal.innerHTML = `<div class="modal-box">${htmlContent}</div>`;
        modal.classList.add('visible');
        return modal;
    }

    // This function updates all Admin UI elements across the site
    function updateAdminUI(user) {
        const sideNavAdminLink = document.getElementById('sidenav-admin-link');
        const footerAdminLink = document.getElementById('footer-admin-link');
        
        if (user) {
            // Logged IN state
            if(sideNavAdminLink) sideNavAdminLink.innerHTML = `<a href="gallery.html">Admin Panel</a><li><a href="#" data-action="logout">Logout</a></li>`;
            if(footerAdminLink) footerAdminLink.innerHTML = `<a href="gallery.html" class="admin-link">Admin Panel</a> &middot; <a href="#" data-action="logout" class="admin-link">Logout</a>`;
        } else {
            // Logged OUT state
            if(sideNavAdminLink) sideNavAdminLink.innerHTML = `<a href="#" data-action="login">Admin Login</a>`;
            if(footerAdminLink) footerAdminLink.innerHTML = `<a href="#" data-action="login" class="admin-link">Admin Login</a>`;
        }
    }
    
    // Listen for auth state changes and update the UI
    auth.onAuthStateChanged(updateAdminUI);

    // Global click listener for login/logout actions
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        const action = target.dataset.action;

        if (action === 'logout') {
            e.preventDefault();
            auth.signOut();
        }

        if (action === 'login') {
            e.preventDefault();
            const modal = showGlobalModal(`
                <h2>Admin Login</h2>
                <form id="global-login-form">
                    <div class="form-group"><label for="email">Email</label><input type="email" id="email" name="email" class="modal-input" required></div>
                    <div class="form-group"><label for="password">Password</label><input type="password" id="password" name="password" class="modal-input" required></div>
                    <button type="submit" class="primary-button" style="width:100%;">Login</button>
                </form>
            `);

            const loginForm = modal.querySelector('#global-login-form');
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const btn = loginForm.querySelector('button');
                btn.textContent = 'Logging in...';
                btn.disabled = true;
                
                auth.signInWithEmailAndPassword(loginForm.email.value, loginForm.password.value)
                    .then(() => modal.classList.remove('visible'))
                    .catch(err => {
                        alert("Login Failed: " + err.message);
                        btn.textContent = 'Login';
                        btn.disabled = false;
                    });
            });
        }
    });
});
