// Animation handler for EA77 Casino

document.addEventListener('DOMContentLoaded', function() {
    // Initially apply animations to elements in view
    applyAnimations();
    
    // Handle scroll-based animations
    initScrollAnimations();
    
    // Handle staggered animations
    initStaggerAnimations();
});

// Apply animations to elements with specific classes
function applyAnimations() {
    // Apply class-based animations (which automatically run on load)
    // These don't need any additional handling as they're pure CSS animations
}

// Initialize scroll-based animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check if elements are in view immediately on page load
    animatedElements.forEach(checkIfInView);
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        animatedElements.forEach(checkIfInView);
    });
    
    // Also trigger on resize (useful when window size changes affect visibility)
    window.addEventListener('resize', function() {
        animatedElements.forEach(checkIfInView);
    });
}

// Check if an element is in viewport and apply animation
function checkIfInView(element) {
    const elementPosition = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Element is considered "in view" when it's 25% visible
    if (elementPosition.top < windowHeight * 0.75) {
        element.classList.add('visible');
    }
}

// Initialize staggered animations for lists and grids
function initStaggerAnimations() {
    const staggeredElements = document.querySelectorAll('.stagger-animation');
    
    // Check if staggered containers are in view
    staggeredElements.forEach(checkIfStaggerInView);
    
    // Add scroll event listener for staggered animations
    window.addEventListener('scroll', function() {
        staggeredElements.forEach(checkIfStaggerInView);
    });
}

// Check if a staggered animation container is in view
function checkIfStaggerInView(element) {
    const elementPosition = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (elementPosition.top < windowHeight * 0.75) {
        element.classList.add('visible');
    }
} 