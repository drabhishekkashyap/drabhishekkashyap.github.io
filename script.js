/* ==========================================================================
   Dr. Abhishek Kashyap - Portfolio Interactivity Engine (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Dynamic Role Typewriter Animation
    // ----------------------------------------------------------------------
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const roles = [
            "MD Physician (MBBS Specialist)",
            "AI in Healthcare Innovator",
            "Generative AI & Agentic AI Developer",
            "WordPress & Web Architect",
            "Clinical AI Prompt Specialist"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 90;
        const erasingSpeed = 40;
        const delayBetweenRoles = 2000;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let nextSpeed = isDeleting ? erasingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentRole.length) {
                nextSpeed = delayBetweenRoles;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                nextSpeed = 500;
            }

            setTimeout(typeEffect, nextSpeed);
        }

        typeEffect();
    }

    // ----------------------------------------------------------------------
    // 2. Dark / Light Theme Toggle & Persistence
    // ----------------------------------------------------------------------
    const themeBtn = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeBtn) return;
        const icon = themeBtn.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // ----------------------------------------------------------------------
    // 3. Ultra-Responsive Mobile Navigation Drawer & Overlay
    // ----------------------------------------------------------------------
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    const sidemenu = document.getElementById('sidemenu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function openMobileMenu() {
        if (sidemenu) sidemenu.classList.add('open');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (sidemenu) sidemenu.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuOpen) menuOpen.addEventListener('click', openMobileMenu);
    if (menuClose) menuClose.addEventListener('click', closeMobileMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Active Navigation Link Scroll Highlight
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            if (activeLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // ----------------------------------------------------------------------
    // 4. Interactive Card Slider / Carousel Controller
    // ----------------------------------------------------------------------
    function setupSlider(trackId, prevBtnId, nextBtnId, dotsContainerId) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const dotsContainer = document.getElementById(dotsContainerId);

        if (!track) return;

        const cards = track.children;
        const totalCards = cards.length;

        if (totalCards === 0) return;

        // Build dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalCards; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    const cardWidth = cards[0].offsetWidth + 25; // includes gap
                    track.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            if (!dotsContainer) return;
            const cardWidth = cards[0].offsetWidth + 25;
            const activeIndex = Math.round(track.scrollLeft / cardWidth);
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((d, idx) => {
                d.classList.toggle('active', idx === activeIndex);
            });
        }

        track.addEventListener('scroll', updateDots, { passive: true });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const cardWidth = cards[0].offsetWidth + 25;
                track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const cardWidth = cards[0].offsetWidth + 25;
                track.scrollBy({ left: cardWidth, behavior: 'smooth' });
            });
        }
    }

    setupSlider('services-track', 'services-prev', 'services-next', 'services-dots');
    setupSlider('portfolio-track', 'portfolio-prev', 'portfolio-next', 'portfolio-dots');

    // ----------------------------------------------------------------------
    // 5. Scroll Reveal Intersection Observer
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------------------------------------------------------------
    // 6. About Section Tab Switcher
    // ----------------------------------------------------------------------
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');

    tabLinks.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            tabLinks.forEach(t => t.classList.remove('active-link'));
            tabContents.forEach(c => c.classList.remove('active-tab'));

            tab.classList.add('active-link');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active-tab');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 7. CV Download Verification Modal Handler
    // ----------------------------------------------------------------------
    const cvTrigger = document.getElementById('cv-trigger');
    const cvModal = document.getElementById('cv-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const cvGateForm = document.getElementById('cv-gate-form');

    if (cvTrigger && cvModal) {
        cvTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            cvModal.classList.add('modal-active');
            cvModal.setAttribute('aria-hidden', 'false');
        });
    }

    function closeModal() {
        if (cvModal) {
            cvModal.classList.remove('modal-active');
            cvModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    if (cvModal) {
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) closeModal();
        });
    }

    if (cvGateForm) {
        cvGateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const link = document.createElement('a');
            link.href = 'images/my-cv.pdf';
            link.download = 'Dr_Abhishek_Kashyap_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert('Authorization successful! Dr. Abhishek Kashyap\'s CV download has started.');
            cvGateForm.reset();
            closeModal();
        });
    }

    // ----------------------------------------------------------------------
    // 8. Contact Form Transmission Handler
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const msgSpan = document.getElementById('msg');

    if (contactForm && msgSpan) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            msgSpan.style.color = 'var(--accent-color)';
            msgSpan.textContent = 'Message transmitted successfully! Dr. Abhishek will get back to you soon.';
            contactForm.reset();
            setTimeout(() => {
                msgSpan.textContent = '';
            }, 5000);
        });
    }

    // ----------------------------------------------------------------------
    // 9. Navbar Glassmorphic Header Scroll Effect
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
});
