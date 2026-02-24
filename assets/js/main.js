document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // Mobile Menu Toggle (Enhanced)
    // ===========================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Hamburger ↔ X icon animation
            if (menuIcon) {
                if (navLinks.classList.contains('active')) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking a nav link (smooth UX for mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    if (menuIcon) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    // ===========================
    // Sticky Header Scroll Effect
    // ===========================
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (header) {
            if (currentScrollY > 100) {
                header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'var(--shadow-soft)';
            }

            // Auto-hide navbar on scroll down, show on scroll up (mobile only)
            if (window.innerWidth <= 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                    header.style.transition = 'transform 0.3s ease';
                    // Also close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        if (menuIcon) {
                            menuIcon.classList.remove('fa-times');
                            menuIcon.classList.add('fa-bars');
                        }
                    }
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.style.transform = 'translateY(0)';
            }
        }

        lastScrollY = currentScrollY;
    });

    // ===========================
    // Mobile Menu Fix on Resize
    // ===========================
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Reset mobile menu state on desktop
            if (navLinks) {
                navLinks.classList.remove('active');
                navLinks.style.maxHeight = '';
                navLinks.style.opacity = '';
            }
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });

    // ===========================
    // Intersection Observer — Scroll Animations
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ===========================
    // Stats Counter Animation
    // ===========================
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
            const text = stat.innerText;
            // Handle text-only entries (e.g. "24/7")
            if (text.includes('/')) return;

            // Parse number and suffix (supports: 15+, 500+, 2M+, 5000+, 1K+)
            const hasPlus = text.includes('+');
            const hasM = text.includes('M');
            const hasK = text.includes('K');
            const cleanNum = text.replace(/[+MK]/g, '');
            const target = parseFloat(cleanNum);

            let suffix = '';
            if (hasM) suffix += 'M';
            if (hasK) suffix += 'K';
            if (hasPlus) suffix += '+';

            // For small numbers (< 100), slower increment
            const steps = target < 100 ? 40 : 50;
            const increment = target / steps;
            let count = 0;
            const isDecimal = target % 1 !== 0;

            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.innerText = (isDecimal ? target.toFixed(1) : target) + suffix;
                    clearInterval(timer);
                } else {
                    stat.innerText = (isDecimal ? count.toFixed(1) : Math.ceil(count)) + suffix;
                }
            }, 30);
        });
    }

    // ===========================
    // Lightbox Touch Enhancement
    // ===========================
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
        // Prevent body scroll when lightbox is open
        const observer2 = new MutationObserver(() => {
            if (lightboxModal.style.display === 'block') {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        observer2.observe(lightboxModal, { attributes: true, attributeFilter: ['style'] });

        // Touch swipe down to close
        let touchStartY = 0;
        lightboxModal.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        lightboxModal.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchEndY - touchStartY;

            // Swipe down > 80px = close
            if (deltaY > 80) {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        }, { passive: true });
    }

});
