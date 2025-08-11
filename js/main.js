document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const mobileNavPanel = document.getElementById('mobile-nav');
    const closeNavBtn = document.getElementById('close-nav-btn');

    function openNav() {
        if (mobileNavPanel) mobileNavPanel.classList.add('active');
    }

    function closeNav() {
        if (mobileNavPanel) mobileNavPanel.classList.remove('active');
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openNav);
    }

    if (closeNavBtn) {
        closeNavBtn.addEventListener('click', closeNav);
    }
});
