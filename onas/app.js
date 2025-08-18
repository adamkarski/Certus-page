// CERTUS Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element) => {
        observer.observe(element);
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // CTA Button interactions - Fixed scroll functionality
    const ctaButtons = document.querySelectorAll('.cta-button, .btn--primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Handle different button types
            const buttonText = this.textContent.toLowerCase();
            if (buttonText.includes('produkty')) {
                // Scroll to products section
                setTimeout(() => {
                    const produktySection = document.querySelector('.produkty');
                    if (produktySection) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = produktySection.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 200);
            } else if (buttonText.includes('kontakt')) {
                // Scroll to footer contact
                setTimeout(() => {
                    const footer = document.querySelector('.footer');
                    if (footer) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = footer.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 200);
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--color-surface)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // Stagger animation for grid items
    const staggerElements = (selector, delay = 100) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * delay}ms`;
        });
    };

    // Apply stagger animations
    staggerElements('.strength-card', 150);
    staggerElements('.product-card', 100);
    staggerElements('.industry-card', 80);
    staggerElements('.timeline-item', 200);

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.strength-card, .product-card, .industry-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('strength-card') ? 
                'translateY(-10px)' : 
                this.classList.contains('industry-card') ? 
                'scale(1.05)' : 
                'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact info click handlers
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const span = item.querySelector('span');
        const text = span.textContent;
        
        item.addEventListener('click', function() {
            if (text.includes('@')) {
                // Email
                window.open(`mailto:${text}`, '_blank');
            } else if (text.includes('+48')) {
                // Phone
                window.open(`tel:${text}`, '_blank');
            } else if (text.includes('www.')) {
                // Website
                window.open(`https://${text}`, '_blank');
            }
        });

        // Add cursor pointer for clickable items
        if (text.includes('@') || text.includes('+48') || text.includes('www.')) {
            item.style.cursor = 'pointer';
            item.addEventListener('mouseenter', function() {
                this.style.color = 'var(--color-primary)';
            });
            item.addEventListener('mouseleave', function() {
                this.style.color = 'var(--color-text-secondary)';
            });
        }
    });

    // Parallax effect for hero section (lighter effect to avoid performance issues)
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            ticking = false;
        };

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Add loading animation
    const pageLoader = () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            document.body.style.opacity = '1';
        }, 100);
    };

    // Initialize page loader
    pageLoader();

    // Enhanced timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 300);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Mobile menu handling (if needed in future)
    const handleMobileMenu = () => {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    };

    handleMobileMenu();

    // Scroll to top functionality
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Add scroll to top button
    const createScrollToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'scroll-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--color-primary);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        `;

        button.addEventListener('click', scrollToTop);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });

        document.body.appendChild(button);
    };

    // Initialize scroll to top button
    createScrollToTopButton();

    // Additional smooth scroll behavior for all internal links
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
            const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
            const href = link.getAttribute('href');
            
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });

    console.log('CERTUS website initialized successfully!');
});