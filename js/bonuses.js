// Bonuses Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.bonus-tab');
    const bonusSections = document.querySelectorAll('.bonus-section');
    
    // Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the bonus type
            const bonusType = this.getAttribute('data-bonus');
            
            // Hide all bonus sections
            bonusSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the selected bonus section
            document.getElementById(bonusType).classList.add('active');
            
            // Trigger animation when switching tabs
            const activeSection = document.getElementById(bonusType);
            animateBonusSection(activeSection);
        });
    });
    
    // Set up intersection observer for scroll animations
    setupScrollAnimations();
    
    // Terms & Conditions Modal
    const termsLinks = document.querySelectorAll('.terms-link');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Open modal on terms link click
    termsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            modalOverlay.classList.add('active');
            
            // Show the specific modal
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId + 'Modal').classList.add('active');
        });
    });
    
    // Close modal on close button click
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modalOverlay.classList.remove('active');
            document.querySelectorAll('.modal-window').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Close modal on outside click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.querySelectorAll('.modal-window').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
});

// Set up intersection observer for scroll animations
function setupScrollAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const options = {
            root: null, // Use the viewport
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };
        
        // Create observer for bonus sections
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateBonusSection(entry.target);
                    // Unobserve after animation
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe all bonus sections
        const bonusSections = document.querySelectorAll('.bonus-section');
        bonusSections.forEach(section => {
            // Initially set the animation state
            section.classList.add('animate-ready');
            sectionObserver.observe(section);
        });
        
        // Create observer for bonus features
        const featureObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay for each feature based on its index
                    const features = Array.from(entry.target.querySelectorAll('.bonus-features li'));
                    features.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.classList.add('feature-animate');
                        }, index * 150);
                    });
                    
                    // Unobserve after animation
                    featureObserver.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe all feature lists
        const featureLists = document.querySelectorAll('.bonus-features');
        featureLists.forEach(list => {
            featureObserver.observe(list);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.bonus-section').forEach(section => {
            section.classList.add('animate-complete');
        });
        
        document.querySelectorAll('.bonus-features li').forEach(feature => {
            feature.classList.add('feature-animate');
        });
    }
}

// Animate a bonus section when it becomes visible
function animateBonusSection(section) {
    // Add animation class
    section.classList.add('animate-complete');
    
    // Animate bonus card
    const bonusCard = section.querySelector('.bonus-card');
    if (bonusCard) {
        bonusCard.classList.add('bonus-card-animate');
    }
    
    // Animate heading and value with slight delay
    const heading = section.querySelector('h2');
    const value = section.querySelector('.bonus-value');
    
    if (heading) {
        setTimeout(() => {
            heading.classList.add('text-animate');
        }, 300);
    }
    
    if (value) {
        setTimeout(() => {
            value.classList.add('value-animate');
        }, 500);
    }
} 