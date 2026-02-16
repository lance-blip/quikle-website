document.addEventListener('DOMContentLoaded', () => {
    // =============================================
    // Mobile Navigation
    // =============================================
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
            if (mobileToggle) mobileToggle.classList.remove('active');
        });
    });

    // =============================================
    // Sticky Header
    // =============================================
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =============================================
    // Scroll Reveal Animation
    // =============================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // =============================================
    // Stats Counter Animation
    // =============================================
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
                    const duration = 2000;
                    const steps = 50;
                    const stepValue = target / steps;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += stepValue;
                        if (current >= target) {
                            clearInterval(timer);
                            counter.textContent = target + suffix;
                        } else {
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

    // =============================================
    // Testimonial Carousel
    // =============================================
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (track && dotsContainer) {
        const cards = track.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        let autoplayInterval;
        let cardsPerView = window.innerWidth <= 768 ? 1 : 2;

        // Calculate total slides (number of "positions")
        function getTotalSlides() {
            cardsPerView = window.innerWidth <= 768 ? 1 : 2;
            return Math.max(1, cards.length - cardsPerView + 1);
        }

        // Build dots
        function buildDots() {
            dotsContainer.innerHTML = '';
            const total = getTotalSlides();
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        // Go to slide
        function goToSlide(index) {
            const total = getTotalSlides();
            currentIndex = Math.max(0, Math.min(index, total - 1));
            
            // Calculate offset
            const card = cards[0];
            const gap = parseFloat(getComputedStyle(track).gap) || 32;
            const cardWidth = card.offsetWidth + gap;
            const offset = currentIndex * cardWidth;
            
            track.style.transform = 'translateX(-' + offset + 'px)';
            
            // Update dots
            dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        // Auto-play
        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(() => {
                const total = getTotalSlides();
                const next = (currentIndex + 1) % total;
                goToSlide(next);
            }, 4000);
        }

        function stopAutoplay() {
            if (autoplayInterval) clearInterval(autoplayInterval);
        }

        // Pause on hover
        const carouselWrapper = track.closest('.carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', stopAutoplay);
            carouselWrapper.addEventListener('mouseleave', startAutoplay);
        }

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(currentIndex - 1);
                }
            }
            startAutoplay();
        }, { passive: true });

        // Handle resize
        window.addEventListener('resize', () => {
            buildDots();
            goToSlide(Math.min(currentIndex, getTotalSlides() - 1));
        });

        // Init
        buildDots();
        goToSlide(0);
        startAutoplay();
    }

    // =============================================
    // Contact Form — n8n Webhook Integration
    // =============================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('contact-submit-btn');
            const statusEl = document.getElementById('contact-status');
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            data.source = 'quikle-website';
            data.timestamp = new Date().toISOString();

            // Validate
            if (!data.name || !data.email || !data.message) {
                statusEl.style.display = 'block';
                statusEl.style.color = 'var(--coral)';
                statusEl.textContent = 'Please fill in all required fields.';
                return;
            }

            // Show loading
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            statusEl.style.display = 'none';

            try {
                const response = await fetch('https://webhooks.quikle.co.za/webhook/6c83f300-494f-4a21-9b67-e1bcc96f232f', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                statusEl.style.display = 'block';
                if (response.ok) {
                    statusEl.style.color = 'var(--success)';
                    statusEl.innerHTML = '✅ Message sent! We\'ll respond within 24 hours.';
                    contactForm.reset();
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                statusEl.style.display = 'block';
                statusEl.style.color = 'var(--coral)';
                statusEl.innerHTML = '❌ Failed to send. Please try again or email <a href="mailto:grow@quikle.co.za" style="color:var(--accent);">grow@quikle.co.za</a>';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }

    // =============================================
    // Image Fallback Handler
    // =============================================
    document.querySelectorAll('img[referrerpolicy="no-referrer"]').forEach(img => {
        img.addEventListener('error', function() {
            // If first load fails and no fallback tried yet
            if (!this.dataset.fallbackTried) {
                this.dataset.fallbackTried = 'true';
                // Try thumbnail API as last resort
                const match = this.src.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (match) {
                    this.src = 'https://drive.google.com/thumbnail?id=' + match[1] + '&sz=w600';
                }
            }
        });
    });
});

// =============================================
// Nova Chatbot — Toggle & Webhook Integration
// =============================================
window.toggleNova = function() {
    const panel = document.getElementById('nova-panel');
    const launcher = document.getElementById('nova-launcher');
    
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'flex';
        launcher.style.display = 'none';
        // Focus input
        setTimeout(() => {
            const input = document.getElementById('nova-input');
            if (input) input.focus();
        }, 100);
    } else {
        panel.style.display = 'none';
        launcher.style.display = 'flex';
    }
};

window.sendNovaMessage = async function() {
    const input = document.getElementById('nova-input');
    const messagesEl = document.getElementById('nova-messages');
    const text = input.value.trim();
    
    if (!text) return;
    input.value = '';

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'nova-msg nova-user';
    userMsg.innerHTML = '<p style="background:var(--accent);color:white;padding:0.75rem 1rem;border-radius:12px 12px 4px 12px;font-size:0.9rem;max-width:85%;margin:0;">' + escapeHtml(text) + '</p>';
    messagesEl.appendChild(userMsg);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    // Show typing indicator
    const typingMsg = document.createElement('div');
    typingMsg.className = 'nova-msg nova-bot';
    typingMsg.id = 'nova-typing';
    typingMsg.innerHTML = '<p style="background:var(--accent-light);padding:0.75rem 1rem;border-radius:12px 12px 12px 4px;font-size:0.9rem;max-width:85%;margin:0;color:var(--text-muted);">Typing...</p>';
    messagesEl.appendChild(typingMsg);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
        const response = await fetch('https://webhooks.quikle.co.za/webhook/nova-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: text,
                source: 'quikle-website',
                timestamp: new Date().toISOString()
            })
        });

        // Remove typing indicator
        const typing = document.getElementById('nova-typing');
        if (typing) typing.remove();

        let reply = "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to email grow@quikle.co.za or call +27 10 880 8823.";
        
        if (response.ok) {
            try {
                const data = await response.json();
                if (data.reply || data.message || data.response) {
                    reply = data.reply || data.message || data.response;
                }
            } catch(e) {
                // Use default reply if JSON parse fails
            }
        }

        // Add bot reply
        const botMsg = document.createElement('div');
        botMsg.className = 'nova-msg nova-bot';
        botMsg.innerHTML = '<p style="background:var(--accent-light);padding:0.75rem 1rem;border-radius:12px 12px 12px 4px;font-size:0.9rem;max-width:85%;margin:0;">' + escapeHtml(reply) + '</p>';
        messagesEl.appendChild(botMsg);
        messagesEl.scrollTop = messagesEl.scrollHeight;

    } catch (error) {
        // Remove typing indicator
        const typing = document.getElementById('nova-typing');
        if (typing) typing.remove();

        const errorMsg = document.createElement('div');
        errorMsg.className = 'nova-msg nova-bot';
        errorMsg.innerHTML = '<p style="background:var(--accent-light);padding:0.75rem 1rem;border-radius:12px 12px 12px 4px;font-size:0.9rem;max-width:85%;margin:0;">Sorry, I\'m having trouble connecting. Please email <a href="mailto:grow@quikle.co.za" style="color:var(--accent);">grow@quikle.co.za</a> or call <a href="tel:+27108808823" style="color:var(--accent);">+27 10 880 8823</a>.</p>';
        messagesEl.appendChild(errorMsg);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }
};

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
