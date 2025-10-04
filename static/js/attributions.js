/**
 * Attributions Page JavaScript
 * Particle animations and interactive effects
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // Initialize all animations and interactions
    initFloatingParticles();
    initNeuralConnections();
    initContributionStats();
    initFormInteractions();
    initTitleAnimation();
    initScrollEffects();
});

/**
 * Floating Particles Animation
 */
function initFloatingParticles() {
    const particlesContainer = document.getElementById('floating-particles');
    if (!particlesContainer) return;

    const particleCount = 40;
    const particles = [];

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, particles);
    }

    // Continuously create new particles
    setInterval(() => {
        if (particles.length < particleCount) {
            createParticle(particlesContainer, particles);
        }
    }, 3000);
}

function createParticle(container, particlesArray) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '-10px';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random color
    const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    
    // Random animation duration
    const duration = 8 + Math.random() * 8;
    particle.style.animationDuration = duration + 's';
    
    // Random horizontal drift
    const drift = (Math.random() - 0.5) * 100;
    particle.style.setProperty('--drift', drift + 'px');
    
    container.appendChild(particle);
    particlesArray.push(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            const index = particlesArray.indexOf(particle);
            if (index > -1) {
                particlesArray.splice(index, 1);
            }
        }
    }, duration * 1000);
}

/**
 * Neural Connections Background
 */
function initNeuralConnections() {
    const connectionsContainer = document.getElementById('neural-connections-bg');
    if (!connectionsContainer) return;

    const lineCount = 20;
    
    for (let i = 0; i < lineCount; i++) {
        createNeuralLine(connectionsContainer);
    }
    
    // Recreate lines periodically
    setInterval(() => {
        const existingLines = connectionsContainer.querySelectorAll('.neural-line');
        if (existingLines.length < lineCount) {
            createNeuralLine(connectionsContainer);
        }
    }, 5000);
}

function createNeuralLine(container) {
    const line = document.createElement('div');
    line.className = 'neural-line';
    
    // Random position
    line.style.left = Math.random() * 100 + '%';
    line.style.top = Math.random() * 100 + '%';
    
    // Random width
    line.style.width = (Math.random() * 300 + 100) + 'px';
    
    // Random rotation
    line.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Random animation delay
    line.style.animationDelay = Math.random() * 4 + 's';
    
    container.appendChild(line);
    
    // Remove after some time to prevent accumulation
    setTimeout(() => {
        if (line.parentNode) {
            line.parentNode.removeChild(line);
        }
    }, 20000);
}

/**
 * Contribution Stats Animation
 */
function initContributionStats() {
    const statItems = document.querySelectorAll('.stat-item');
    
    // Animate numbers on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.5
    });
    
    statItems.forEach(item => {
        observer.observe(item);
        
        // Add hover interactions
        item.addEventListener('mouseenter', () => {
            createStatRipple(item);
        });
        
        // Add click interaction
        item.addEventListener('click', () => {
            createStatPulse(item);
        });
    });
}

function animateStatNumber(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    if (!numberElement) return;
    
    const finalNumber = numberElement.textContent;
    const isNumeric = /^\d+/.test(finalNumber);
    
    if (isNumeric) {
        const targetNumber = parseInt(finalNumber.replace(/\D/g, ''));
        const suffix = finalNumber.replace(/\d/g, '');
        
        let currentNumber = 0;
        const increment = targetNumber / 60; // 60 frames for 1 second
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }
            
            numberElement.textContent = Math.floor(currentNumber) + suffix;
        }, 16); // ~60fps
    }
}

function createStatRipple(statItem) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(59, 130, 246, 0.2)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'statRipple 0.8s ease-out';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '100%';
    ripple.style.height = '100%';
    ripple.style.marginLeft = '-50%';
    ripple.style.marginTop = '-50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1';
    
    statItem.style.position = 'relative';
    statItem.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 800);
}

function createStatPulse(statItem) {
    const icon = statItem.querySelector('.stat-icon');
    if (icon) {
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'statPulse 0.6s ease-in-out';
        }, 10);
    }
}

/**
 * Form Interactions
 */
function initFormInteractions() {
    const formWrapper = document.querySelector('.form-wrapper');
    const iframe = document.getElementById('igem-attribution-form');
    
    if (iframe && formWrapper) {
        // Show loading state
        iframe.addEventListener('load', () => {
            formWrapper.classList.add('loaded');
            createFormLoadEffect();
        });
        
        // Add resize observer for better responsiveness
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    updateFormLayout(entry.target);
                });
            });
            
            resizeObserver.observe(iframe);
        }
    }
}

function createFormLoadEffect() {
    const formContainer = document.querySelector('.form-container');
    if (!formContainer) return;
    
    // Create success indicator
    const indicator = document.createElement('div');
    indicator.style.position = 'absolute';
    indicator.style.top = '10px';
    indicator.style.right = '10px';
    indicator.style.width = '10px';
    indicator.style.height = '10px';
    indicator.style.backgroundColor = '#10B981';
    indicator.style.borderRadius = '50%';
    indicator.style.boxShadow = '0 0 10px #10B981';
    indicator.style.opacity = '0';
    indicator.style.animation = 'fadeInPulse 1s ease-in-out';
    indicator.style.zIndex = '10';
    
    formContainer.style.position = 'relative';
    formContainer.appendChild(indicator);
    
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.style.opacity = '0';
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 500);
        }
    }, 3000);
}

function updateFormLayout(iframe) {
    // Ensure iframe maintains proper aspect ratio and responsiveness
    const containerWidth = iframe.parentElement.clientWidth;
    if (containerWidth < 768) {
        iframe.style.minHeight = '800px';
    } else {
        iframe.style.minHeight = '600px';
    }
}

/**
 * Title Animation
 */
function initTitleAnimation() {
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        // Add staggered hover effects
        word.addEventListener('mouseenter', () => {
            word.style.animation = 'none';
            setTimeout(() => {
                word.style.animation = 'titleGlow 1s ease-in-out infinite alternate';
            }, 10);
        });
        
        // Add click effects
        word.addEventListener('click', () => {
            createTitleBurst(word);
        });
    });
}

function createTitleBurst(element) {
    const burstCount = 6;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < burstCount; i++) {
        const burst = document.createElement('div');
        burst.style.position = 'fixed';
        burst.style.left = (rect.left + rect.width / 2) + 'px';
        burst.style.top = (rect.top + rect.height / 2) + 'px';
        burst.style.width = '4px';
        burst.style.height = '4px';
        burst.style.backgroundColor = '#3B82F6';
        burst.style.borderRadius = '50%';
        burst.style.pointerEvents = 'none';
        burst.style.zIndex = '9999';
        
        const angle = (i / burstCount) * Math.PI * 2;
        const distance = 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        burst.style.animation = `titleBurst 0.8s ease-out forwards`;
        burst.style.setProperty('--x', x + 'px');
        burst.style.setProperty('--y', y + 'px');
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 800);
    }
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.neural-line, .particle');
    parallaxElements.forEach(element => {
        const speed = 0.3;
        const yPos = scrolled * speed;
        element.style.transform += ` translateY(${yPos}px)`;
    });
    
    // Update contribution cards based on scroll
    const contributionCards = document.querySelectorAll('.contribution-card');
    contributionCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const visible = rect.top < windowHeight && rect.bottom > 0;
        
        if (visible) {
            const progress = 1 - (rect.top / windowHeight);
            const scale = 0.9 + (progress * 0.1);
            card.style.transform = `scale(${Math.min(scale, 1)})`;
        }
    });
    
    ticking = false;
}

/**
 * CSS Animations via JavaScript
 */
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes statRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes statPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes fadeInPulse {
        0% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1.2); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes titleBurst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--x), var(--y)) scale(0);
            opacity: 0;
        }
    }
    
    .form-wrapper.loaded::before {
        display: none;
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;
document.head.appendChild(additionalStyles);

/**
 * Accessibility Enhancements
 */
function initAccessibilityEnhancements() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
    
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.stat-item, .contribution-card, .medal-card');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
        
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #3B82F6';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

/**
 * Performance Monitoring
 */
function initPerformanceOptimization() {
    // Pause animations when page is not visible
    document.addEventListener('visibilitychange', () => {
        const animations = document.querySelectorAll('.particle, .neural-line');
        animations.forEach(el => {
            if (document.hidden) {
                el.style.animationPlayState = 'paused';
            } else {
                el.style.animationPlayState = 'running';
            }
        });
    });
    
    // Reduce particles on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index % 2 === 0) { // Remove every other particle
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }
        });
    }
}

// Initialize accessibility and performance features
initAccessibilityEnhancements();
initPerformanceOptimization();