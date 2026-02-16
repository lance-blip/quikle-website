document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add staggered delay for pillar cards if it's a grid
                if (entry.target.classList.contains('pillar-card')) {
                   // Handled by CSS nth-child delays
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Stats Counter Animation
    const statsSection = document.querySelector('.trust-bar');
    let counted = false;

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                counted = true;
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const suffix = counter.getAttribute('data-suffix');
                    const duration = 2000; // 2 seconds
                    const steps = 50;
                    const stepValue = target / steps;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += stepValue;
                        if (current >= target) {
                            clearInterval(timer);
                            counter.textContent = target + suffix;
                        } else {
                            // Format number based on whether it's an integer or float
                            if (Number.isInteger(target)) {
                                counter.textContent = Math.floor(current) + suffix;
                            } else {
                                counter.textContent = current.toFixed(1) + suffix;
                            }
                        }
                    }, duration / steps);
                });
            }
        });
        statsObserver.observe(statsSection);
    }
});

// Nova Chatbot Toggle (Global function for button access)
window.toggleNova = function() {
    // This function interacts with the Nova widget if it exposes a toggle method
    // Assuming standard widget behavior or custom event
    const novaWidget = document.querySelector('.nova-widget');
    if (novaWidget) {
        // Simulate click on the trigger button if available
        const trigger = novaWidget.querySelector('.nova-trigger');
        if (trigger) trigger.click();
    } else {
        console.log('Nova Chatbot not loaded yet.');
    }
};
