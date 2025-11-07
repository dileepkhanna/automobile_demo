document.addEventListener("DOMContentLoaded", () => {
    // Theme Selector with Dropdown
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeDropdown = document.getElementById('themeDropdown');
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Toggle dropdown
    themeToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeDropdown.contains(e.target) && e.target !== themeToggleBtn) {
            themeDropdown.classList.remove('show');
        }
    });

    function applyTheme(theme) {
        // Remove all theme classes
        body.classList.remove('light-theme', 'blue-theme', 'purple-theme', 'green-theme', 'sunset-theme');
        
        // Add the selected theme class
        if (theme !== 'dark') {
            body.classList.add(`${theme}-theme`);
        }

        // Update active option
        themeOptions.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === theme) {
                btn.classList.add('active');
            }
        });

        // Save preference
        localStorage.setItem('theme', theme);
    }

    themeOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            applyTheme(btn.dataset.theme);
            themeDropdown.classList.remove('show');
        });
    });

    // Mobile Navbar Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });
    document.querySelectorAll('.nav-menu a').forEach(link =>
        link.addEventListener('click', () => navMenu.classList.remove('open'))
    );

    // Optional: Prevent background scroll on menu open (uncomment to use)
    /*
    navToggle.addEventListener('click', () => {
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });
    */

    // Optional: Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link =>
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: "smooth" });
            }
        })
    );

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Initialize first slide
        if (slides[0]) {
            slides[0].classList.add('active');
        }
    }
});