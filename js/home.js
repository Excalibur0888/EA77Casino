// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    initSlider();
    
    // Game tabs functionality
    initGameTabs();
    
    // Ensure animations for game cards
    initGameCardAnimations();
});

// Slider initialization
function initSlider() {
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const nextArrow = document.querySelector('.next-arrow');
    const prevArrow = document.querySelector('.prev-arrow');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Set up automatic sliding
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Next slide function
    function nextSlide() {
        goToSlide((currentSlide + 1) % slideCount);
    }
    
    // Previous slide function
    function prevSlide() {
        goToSlide((currentSlide - 1 + slideCount) % slideCount);
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = slideIndex;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Reset interval to prevent quick transitions
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Add click events to arrows
    if (nextArrow) {
        nextArrow.addEventListener('click', nextSlide);
    }
    
    if (prevArrow) {
        prevArrow.addEventListener('click', prevSlide);
    }
}

// Game tabs initialization
function initGameTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content sections
            const contents = document.querySelectorAll('.game-category-content');
            contents.forEach(content => content.classList.remove('active'));
            
            // Show content for selected tab
            const category = this.getAttribute('data-category');
            const activeContent = document.getElementById(`${category}-content`);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
}

// Initialize game card animations
function initGameCardAnimations() {
    const gameCards = document.querySelectorAll('.game-card');
    
    // Force animation to restart by removing and adding animation class
    gameCards.forEach(card => {
        // Set random delay for each card to create staggered effect
        const delay = Math.random() * 2;
        card.style.animationDelay = `${delay}s`;
        
        // Force browser to recalculate animations by toggling display
        card.addEventListener('mouseover', function() {
            this.style.animationPlayState = 'running';
        });
        
        card.addEventListener('mouseout', function() {
            this.style.animationPlayState = 'running';
        });
    });
} 