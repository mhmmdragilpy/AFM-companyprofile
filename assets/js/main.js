document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        // Add a class for styling animation if needed in CSS
        navLinks.classList.toggle('active');
    });

    // Sticky Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '0'; // Condensed
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '0'; // Reset/Standard
            header.style.boxShadow = 'var(--shadow-soft)';
        }
    });

    // Mobile Menu Fix on Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none'; // Reset to hidden on mobile default
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    // Observe all elements with the 'fade-in-up' class explicitly added in HTML
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Stats Counter Animation
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
                statsObserver.unobserve(statsSection);
            }
        });
        statsObserver.observe(statsSection);
    }

    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.innerText.replace('+', '').replace('K', ''));
            const suffix = stat.innerText.includes('+') ? '+' : (stat.innerText.includes('K') ? 'K' : '');
            let count = 0;
            const increment = target / 50; // Speed adjustment

            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.innerText = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.innerText = Math.ceil(count) + suffix;
                }
            }, 30);
        });
    }

});
