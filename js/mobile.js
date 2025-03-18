document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs for installation guide
    initTabs();
    
    // Add animations for features
    animateFeatures();
    
    // Mobile app showcase animations
    animateShowcase();
});

function initTabs() {
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Remove active class from all headers and panes
            tabHeaders.forEach(h => h.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked header
            this.classList.add('active');
            
            // Get the target tab
            const targetTab = this.getAttribute('data-tab');
            
            // Show the corresponding tab pane
            document.getElementById(targetTab + '-tab').classList.add('active');
            
            // Animate step items in the active tab
            animateSteps(document.getElementById(targetTab + '-tab'));
        });
    });
    
    // Initialize animations for the default active tab
    const activeTab = document.querySelector('.tab-pane.active');
    if (activeTab) {
        animateSteps(activeTab);
    }
}

function animateSteps(tabPane) {
    const steps = tabPane.querySelectorAll('.step-item');
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('animated');
        }, 200 * index);
    });
}

function animateFeatures() {
    const features = document.querySelectorAll('.feature-item');
    
    // Set up IntersectionObserver to detect when features are in viewport
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const feature = entry.target;
                
                // Add animation class
                feature.classList.add('feature-animated');
                
                // Animate icon
                const icon = feature.querySelector('.feature-icon');
                if (icon) {
                    setTimeout(() => {
                        icon.classList.add('icon-animated');
                    }, 300);
                }
                
                // Unobserve after animation
                featureObserver.unobserve(feature);
            }
        });
    }, observerOptions);
    
    // Observe each feature item
    features.forEach(feature => {
        featureObserver.observe(feature);
    });
}

function animateShowcase() {
    const showcaseText = document.querySelector('.showcase-text');
    const showcaseImage = document.querySelector('.showcase-image');
    
    if (showcaseText && showcaseImage) {
        // Animate text content
        setTimeout(() => {
            showcaseText.classList.add('animate-in');
        }, 300);
        
        // Animate image
        setTimeout(() => {
            showcaseImage.classList.add('animate-in');
        }, 600);
    }
    
    // Platform badges animation
    const badges = document.querySelectorAll('.platform-badges img');
    badges.forEach((badge, index) => {
        setTimeout(() => {
            badge.classList.add('badge-animated');
        }, 900 + (index * 200));
    });
}

// Add scroll animation for page elements
window.addEventListener('scroll', function() {
    animateOnScroll();
});

function animateOnScroll() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.8) {
            element.classList.add('animated');
        }
    });
}

// Add hover effects for step numbers
const stepNumbers = document.querySelectorAll('.step-number');
stepNumbers.forEach(stepNumber => {
    stepNumber.addEventListener('mouseenter', function() {
        this.classList.add('pulse');
    });
    
    stepNumber.addEventListener('mouseleave', function() {
        this.classList.remove('pulse');
    });
}); 