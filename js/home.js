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
    const sliderWrapper = document.querySelector('.slider-wrapper');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let isAnimating = false;
    
    // Set initial positions
    if (slides.length > 0) {
        // Make all slides visible and position them horizontally
        slides.forEach((slide, index) => {
            slide.style.display = 'block';
            slide.style.flex = '0 0 100%';
            // Set initial translation
            slide.style.transform = `translateX(${index * 100}%)`;
            slide.style.position = 'absolute';
            slide.style.top = 0;
            slide.style.left = 0;
            slide.style.width = '100%';
            slide.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Ensure first slide is active
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    // Set up automatic sliding
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Next slide function
    function nextSlide() {
        if (isAnimating) return;
        goToSlide((currentSlide + 1) % slideCount);
    }
    
    // Previous slide function
    function prevSlide() {
        if (isAnimating) return;
        goToSlide((currentSlide - 1 + slideCount) % slideCount);
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (isAnimating || slideIndex === currentSlide) return;
        
        isAnimating = true;
        
        // Update dots
        dots[currentSlide].classList.remove('active');
        dots[slideIndex].classList.add('active');
        
        // Determine direction (1 for next, -1 for prev)
        const direction = slideIndex > currentSlide ? 1 : -1;
        const currentPos = -currentSlide * 100;
        const targetPos = -slideIndex * 100;
        
        // Animate slides
        slides.forEach((slide, index) => {
            // Calculate new position
            const newTransform = `translateX(calc(${index * 100}% + ${targetPos}%))`;
            slide.style.transform = newTransform;
        });
        
        // Mark active slide
        slides[currentSlide].classList.remove('active');
        slides[slideIndex].classList.add('active');
        
        // Update current slide index after transition
        setTimeout(() => {
            currentSlide = slideIndex;
            isAnimating = false;
        }, 800); // Match this with the transition time in CSS
        
        // Reset interval to prevent quick transitions
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!isAnimating && index !== currentSlide) {
                goToSlide(index);
            }
        });
    });
    
    // Add click events to arrows
    if (nextArrow) {
        nextArrow.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
    }
    
    if (prevArrow) {
        prevArrow.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
    }
    
    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    // Handle swipe
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous slide
            prevSlide();
        }
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