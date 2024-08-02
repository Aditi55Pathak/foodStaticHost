document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');
    const backMenus = document.querySelector('.back-menus');
    const nextMenus = document.querySelector('.next-menus');
    const filterWrapper = document.querySelector('.filter-wrapper');
    const back = document.querySelector('.back');
    const next = document.querySelector('.next');
    const highlightWrapper = document.querySelector('.highlight-wrapper');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Toggle sidebar on mobile view
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        main.classList.toggle('sidebar-active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            main.classList.remove('sidebar-active');
        }
    });

    // Scroll filter menu
    function scroll(element, direction) {
        element.scrollBy({
            top: 0,
            left: direction * element.clientWidth,
            behavior: 'smooth'
        });
    }

    backMenus.addEventListener('click', () => scroll(filterWrapper, -1));
    nextMenus.addEventListener('click', () => scroll(filterWrapper, 1));

    // Scroll featured dishes
    back.addEventListener('click', () => scroll(highlightWrapper, -1));
    next.addEventListener('click', () => scroll(highlightWrapper, 1));

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        updateThemeIcon();
        saveThemePreference();
    });

    function updateThemeIcon() {
        const icon = themeToggle.querySelector('ion-icon');
        icon.setAttribute('name', body.classList.contains('dark-mode') ? 'sunny-outline' : 'moon-outline');
    }

    function saveThemePreference() {
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Load saved theme preference
    function loadThemePreference() {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            body.classList.add('dark-mode');
            updateThemeIcon();
        }
    }

    loadThemePreference();

    // Responsive sidebar behavior
    function handleResponsiveSidebar() {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            main.classList.remove('sidebar-active');
        }
    }

    window.addEventListener('resize', handleResponsiveSidebar);
    handleResponsiveSidebar(); // Check initial load

    // Active menu item
    document.querySelector('.sidebar-menus').addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            document.querySelectorAll('.sidebar-menus a').forEach(i => i.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => lazyLoadObserver.observe(img));

    // Add to cart functionality (placeholder)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            const productName = e.target.getAttribute('data-product');
            console.log(`Added ${productName} to cart`);
            // Here you would typically update the cart UI and send data to a server
        }
    });
});
