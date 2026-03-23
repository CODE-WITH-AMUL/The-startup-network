// ============================================
// TSN Website - Vanilla JavaScript
// Converted from React/Next.js to Static HTML/CSS/JS
// ============================================

// ===================
// 1. CUSTOM CURSOR
// ===================
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('custom-cursor');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.speed = 0.15;
        
        this.init();
    }
    
    init() {
        // Only enable on devices with mouse
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });
            
            this.animate();
            this.addHoverEffects();
        }
    }
    
    animate() {
        // Smooth following effect
        this.cursorX += (this.mouseX - this.cursorX) * this.speed;
        this.cursorY += (this.mouseY - this.cursorY) * this.speed;
        
        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
    
    addHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .magnetic-btn');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
    }
}

// ===================
// 2. NAVBAR SCROLL
// ===================
class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScroll = 0;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class after 80px
            if (currentScroll > 80) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            this.lastScroll = currentScroll;
        });
    }
}

// ===================
// 3. MOBILE MENU
// ===================
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('mobile-menu-toggle');
        this.menuClose = document.getElementById('mobile-menu-close');
        this.menu = document.getElementById('mobile-menu');
        this.menuLinks = document.querySelectorAll('.mobile-menu-link');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.menuToggle.addEventListener('click', () => this.toggle());
        this.menuClose.addEventListener('click', () => this.close());
        
        // Close menu when clicking on a link
        this.menuLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.isOpen = true;
        this.menu.classList.remove('mobile-menu-hidden');
        this.menu.classList.add('mobile-menu-visible');
        this.menuToggle.classList.add('hamburger-menu-open');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.isOpen = false;
        this.menu.classList.remove('mobile-menu-visible');
        this.menu.classList.add('mobile-menu-hidden');
        this.menuToggle.classList.remove('hamburger-menu-open');
        document.body.style.overflow = '';
    }
}

// ===================
// 4. HERO PARTICLE SYSTEM
// ===================
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.x -= dx * force * 0.02;
                particle.y -= dy * force * 0.02;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 71, 225, ${particle.opacity})`;
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(0, 71, 225, ${0.15 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===================
// 5. SMOOTH SCROLL
// ===================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 80; // Account for navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===================
// 6. SCROLL ANIMATIONS
// ===================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.animate-on-scroll');
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.options);
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// ===================
// 7. MAGNETIC BUTTONS
// ===================
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.magnetic-btn');
        this.strength = 0.3;
        
        this.init();
    }
    
    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * this.strength}px, ${y * this.strength}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// ===================
// 8. SCROLL TO TOP
// ===================
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scroll-to-top');
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });
        
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===================
// 9. PROGRAM CARDS TILT EFFECT
// ===================
class TiltCards {
    constructor() {
        this.cards = document.querySelectorAll('.program-card');
        
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
}

// ===================
// 10. PARALLAX EFFECTS
// ===================
class ParallaxEffects {
    constructor() {
        this.elements = {
            hero: document.querySelector('#hero'),
            statsBar: document.querySelector('.stats-bar')
        };
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // Hero parallax
            if (this.elements.hero) {
                const heroCanvas = this.elements.hero.querySelector('#hero-canvas');
                if (heroCanvas) {
                    heroCanvas.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            }
        });
    }
}

// ===================
// 11. LAZY LOAD IMAGES
// ===================
class LazyLoadImages {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        
        this.init();
    }
    
    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, options);
        
        this.images.forEach(img => observer.observe(img));
    }
}

// ===================
// 12. PERFORMANCE MONITORING
// ===================
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Log page load time
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page Load Time: ${pageLoadTime}ms`);
        });
    }
}

// ===================
// 13. KEYBOARD NAVIGATION
// ===================
class KeyboardNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        // Tab navigation enhancement
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

// ===================
// 14. ANALYTICS (Optional)
// ===================
class Analytics {
    constructor() {
        this.init();
    }
    
    init() {
        // Track CTA clicks
        document.querySelectorAll('a[href*="apply"], a[href*="contact"]').forEach(link => {
            link.addEventListener('click', () => {
                console.log('CTA Clicked:', link.textContent);
                // Send to analytics service if needed
            });
        });
        
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercentage > maxScroll) {
                maxScroll = Math.floor(scrollPercentage / 25) * 25; // Track in 25% increments
                console.log('Scroll Depth:', maxScroll + '%');
            }
        });
    }
}

// ===================
// 15. RESPONSIVE UTILITIES
// ===================
class ResponsiveUtils {
    constructor() {
        this.init();
    }
    
    init() {
        // Detect touch device
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
        }
        
        // Detect viewport size
        this.updateViewport();
        window.addEventListener('resize', () => this.updateViewport());
    }
    
    updateViewport() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        
        if (vw < 640) {
            document.body.setAttribute('data-viewport', 'mobile');
        } else if (vw < 1024) {
            document.body.setAttribute('data-viewport', 'tablet');
        } else {
            document.body.setAttribute('data-viewport', 'desktop');
        }
    }
}

// ===================
// 16. ERROR HANDLING
// ===================
class ErrorHandler {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('error', (e) => {
            console.error('Global Error:', e.message);
        });
        
        // Handle broken images
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', () => {
                img.style.display = 'none';
                console.warn('Failed to load image:', img.src);
            });
        });
    }
}

// ===================
// INITIALIZATION
// ===================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 TSN Website Initialized');
    
    // Initialize all modules
    new CustomCursor();
    new Navbar();
    new MobileMenu();
    new ParticleSystem('hero-canvas');
    new SmoothScroll();
    new ScrollAnimations();
    new MagneticButtons();
    new ScrollToTop();
    new TiltCards();
    new ParallaxEffects();
    new LazyLoadImages();
    new KeyboardNavigation();
    new ResponsiveUtils();
    new Analytics();
    new ErrorHandler();
    
    // Remove loading class
    document.body.classList.remove('loading');
    
    console.log('✅ All modules loaded successfully');
});

// ===================
// WINDOW LOAD EVENT
// ===================
window.addEventListener('load', () => {
    console.log('✅ Page fully loaded');
    new PerformanceMonitor();
});

// ===================
// EXPORTS (if using modules)
// ===================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CustomCursor,
        Navbar,
        MobileMenu,
        ParticleSystem,
        SmoothScroll,
        ScrollAnimations,
        MagneticButtons,
        ScrollToTop,
        TiltCards,
        ParallaxEffects
    };
}
