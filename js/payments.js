document.addEventListener("DOMContentLoaded", function() {
    // Initialize the payment method icons with staggered animations on page load
    initPaymentIcons();

    // Add hover effects for payment methods
    addPaymentMethodEffects();
    
    // Initialize security feature animations
    initSecurityFeatures();
});

function initPaymentIcons() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach((method, index) => {
        // Add a staggered entrance animation
        setTimeout(() => {
            method.style.opacity = '1';
            method.style.transform = 'translateY(0)';
        }, 100 * index);
        
        // Add random slight rotation to icons for a more dynamic look
        const icon = method.querySelector('.method-icon');
        if (icon) {
            const randomRotation = Math.random() * 6 - 3; // Random value between -3 and 3
            icon.style.transform = `rotate(${randomRotation}deg)`;
            
            // If using Font Awesome icons, add a subtle initial animation
            const faIcon = icon.querySelector('i');
            if (faIcon) {
                setTimeout(() => {
                    faIcon.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        faIcon.style.transform = 'scale(1)';
                    }, 500);
                }, 100 * index + 300);
            }
        }
    });
}

function addPaymentMethodEffects() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            // Add a subtle pulse effect to the icon
            const icon = this.querySelector('.method-icon');
            if (icon) {
                icon.classList.add('pulse-effect');
                
                // Trigger the shine effect
                triggerShineEffect(icon);
                
                // Add special effect for Font Awesome icons
                const faIcon = icon.querySelector('i');
                if (faIcon) {
                    faIcon.style.transition = 'all 0.3s ease';
                    faIcon.style.color = '#FFD700'; // Bright gold
                }
            }
        });
        
        method.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.method-icon');
            if (icon) {
                icon.classList.remove('pulse-effect');
                
                // Reset Font Awesome icon style
                const faIcon = icon.querySelector('i');
                if (faIcon) {
                    faIcon.style.transition = 'all 0.5s ease';
                    faIcon.style.color = ''; // Reset to CSS value
                }
            }
        });
    });
}

function initSecurityFeatures() {
    const securityFeatures = document.querySelectorAll('.security-feature');
    
    securityFeatures.forEach((feature, index) => {
        // Add a staggered entrance animation
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, 150 * index);
        
        // Add subtle animation to the icons
        const icon = feature.querySelector('.feature-icon i');
        if (icon) {
            // Add a slight pulse animation
            setInterval(() => {
                icon.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 1000);
            }, 3000 + (index * 500)); // Stagger the animations
        }
    });
    
    // Add shine effect on hover
    securityFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                triggerSecurityShineEffect(icon);
            }
        });
    });
}

function triggerShineEffect(element) {
    // Remove any existing shine element
    const existingShine = element.querySelector('.shine-effect');
    if (existingShine) {
        element.removeChild(existingShine);
    }
    
    // Create a new shine element
    const shine = document.createElement('div');
    shine.classList.add('shine-effect');
    element.appendChild(shine);
    
    // Remove the shine element after animation completes
    setTimeout(() => {
        if (shine.parentNode === element) {
            element.removeChild(shine);
        }
    }, 1000);
}

function triggerSecurityShineEffect(element) {
    // Create a new shine effect
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    const shine = document.createElement('div');
    shine.style.position = 'absolute';
    shine.style.top = '-50%';
    shine.style.left = '-50%';
    shine.style.width = '200%';
    shine.style.height = '200%';
    shine.style.background = 'linear-gradient(to bottom right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)';
    shine.style.transform = 'rotate(45deg)';
    shine.style.animation = 'security-shine 1.5s forwards';
    shine.style.pointerEvents = 'none';
    
    element.appendChild(shine);
    
    // Remove the shine element after animation completes
    setTimeout(() => {
        if (shine.parentNode === element) {
            element.removeChild(shine);
        }
    }, 1500);
} 