// Tournament page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timers
    initCountdowns();
    
    // Set up scroll animations for tournament items
    setupScrollAnimations();
});

// Initialize countdowns for tournament end times
function initCountdowns() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    // Update countdowns every minute
    updateCountdowns(countdownElements);
    setInterval(() => updateCountdowns(countdownElements), 60000);
}

// Update all countdown elements
function updateCountdowns(elements) {
    elements.forEach(element => {
        // This is just a placeholder - in a real implementation, 
        // we would calculate the actual time remaining
        const currentValue = element.textContent;
        // For demo purposes, we're just displaying the static text
        element.textContent = currentValue;
    });
}

// Set up intersection observer for scroll animations
function setupScrollAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const options = {
            root: null, // Use the viewport
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };
        
        // Create observer for tournament items
        const tournamentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTournamentItem(entry.target);
                    // Unobserve after animation
                    tournamentObserver.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe all tournament items
        const tournamentItems = document.querySelectorAll('.tournament-item');
        tournamentItems.forEach((item, index) => {
            // Add animate-ready class with a slight delay based on index
            item.classList.add('animate-ready');
            item.style.transitionDelay = `${index * 0.1}s`;
            tournamentObserver.observe(item);
        });
        
        // Create observer for tournament category items
        const categoryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-complete');
                    // Unobserve after animation
                    categoryObserver.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe all tournament category items
        const categoryItems = document.querySelectorAll('.tournament-category');
        categoryItems.forEach((item, index) => {
            // Add animate-ready class with a slight delay based on index
            item.classList.add('category-animate-ready');
            item.style.transitionDelay = `${index * 0.1}s`;
            categoryObserver.observe(item);
        });
        
        // Set up animation for steps
        const stepsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered animation for step items
                    const steps = entry.target.querySelectorAll('.step-item');
                    steps.forEach((step, index) => {
                        setTimeout(() => {
                            step.classList.add('step-animate');
                        }, index * 200);
                    });
                    
                    // Unobserve after animation
                    stepsObserver.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe steps container
        const stepsContainer = document.querySelector('.steps-container');
        if (stepsContainer) {
            stepsObserver.observe(stepsContainer);
        }
        
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.tournament-item').forEach(item => {
            item.classList.add('animate-complete');
        });
        
        document.querySelectorAll('.tournament-category').forEach(item => {
            item.classList.add('category-animate-complete');
        });
        
        document.querySelectorAll('.step-item').forEach(item => {
            item.classList.add('step-animate');
        });
    }
}

// Animate a tournament item when it becomes visible
function animateTournamentItem(item) {
    // Add the animation class
    item.classList.add('animate-complete');
    
    // Animate tournament info items with staggered delay
    const infoItems = item.querySelectorAll('.info-item');
    infoItems.forEach((infoItem, index) => {
        setTimeout(() => {
            infoItem.classList.add('info-animate');
        }, index * 100);
    });
    
    // Animate tournament details with slight delay
    const details = item.querySelector('.tournament-details');
    if (details) {
        setTimeout(() => {
            details.classList.add('details-animate');
        }, 400);
    }
    
    // Animate game badges with staggered delay
    const badges = item.querySelectorAll('.game-badge');
    badges.forEach((badge, index) => {
        setTimeout(() => {
            badge.classList.add('badge-animate');
        }, 600 + (index * 50));
    });
    
    // Animate CTA buttons with delay
    const cta = item.querySelector('.tournament-cta');
    if (cta) {
        setTimeout(() => {
            cta.classList.add('cta-animate');
        }, 800);
    }
} 