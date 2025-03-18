// Games page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for category items
    initCategoryAnimations();
    
    // Initialize animations for game cards
    initGameCardAnimations();
    
    // Initialize category filtering
    initCategoryFiltering();
});

// Initialize animations for category items
function initCategoryAnimations() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    // Add staggered animation delay to each category item for a cascade effect
    categoryItems.forEach((item, index) => {
        // Set a delay based on the index (0.1s, 0.2s, etc.)
        const delay = 0.1 + (index * 0.1);
        item.style.transitionDelay = `${delay}s`;
        
        // Add a class that triggers the animation
        setTimeout(() => {
            item.classList.add('animated');
        }, 100);
        
        // Reset the delay after the initial animation
        setTimeout(() => {
            item.style.transitionDelay = '0s';
        }, 1000 + (index * 100));
    });
}

// Initialize animations for game cards
function initGameCardAnimations() {
    const gameCards = document.querySelectorAll('.game-card');
    
    // Add entrance animation with staggered delay
    gameCards.forEach((card, index) => {
        // Calculate delay based on grid position for a wave-like effect
        const row = Math.floor(index / 4);
        const col = index % 4;
        const delay = (row * 0.1) + (col * 0.05);
        
        // Set the animation delay
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s`;
        
        // Start the animation after a small delay
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
        
        // Reset the transition after animation completes
        setTimeout(() => {
            card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }, (delay + 0.6) * 1000);
        
        // Add 3D tilt effect on hover
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate rotation based on mouse position relative to card center
            const rotateY = (mouseX - cardCenterX) / 10;
            const rotateX = (cardCenterY - mouseY) / 10;
            
            // Apply the 3D rotation
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
        });
        
        // Reset card position on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
        
        // Add hover event to trigger play-now button animation
        card.addEventListener('mouseover', function() {
            const playButton = this.querySelector('.play-now');
            if (playButton) {
                playButton.classList.add('pulse');
            }
        });
        
        card.addEventListener('mouseout', function() {
            const playButton = this.querySelector('.play-now');
            if (playButton) {
                playButton.classList.remove('pulse');
            }
        });
    });
    
    // Add special effect for lottery games
    const lotteryGames = document.querySelectorAll('.lottery-game');
    lotteryGames.forEach(game => {
        // Highlight lottery games with additional effects
        game.classList.add('highlight');
    });
    
    // Add random sparkling effect to some cards
    setInterval(() => {
        const randomCard = gameCards[Math.floor(Math.random() * gameCards.length)];
        if (randomCard) {
            randomCard.classList.add('sparkle');
            setTimeout(() => {
                randomCard.classList.remove('sparkle');
            }, 1500);
        }
    }, 3000);
}

// Initialize category filtering
function initCategoryFiltering() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    // Add click event to each category item
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the category from the data attribute
            const category = this.getAttribute('data-category');
            
            // Remove active class from all category items
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to the clicked category item
            this.classList.add('active');
            
            // Filter the games
            filterGames(category);
        });
    });
    
    // Set up intersection observer for game card animations
    setupGameCardObserver();
}

// Set up Intersection Observer to animate ratings when cards become visible
function setupGameCardObserver() {
    if ('IntersectionObserver' in window) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the rating when card comes into view
                    animateRating(entry.target);
                    // Unobserve the target after animation
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe all game cards
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            observer.observe(card);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            animateRating(card);
        });
    }
}

// Animate the rating value with a counting effect
function animateRating(card) {
    const ratingElement = card.querySelector('.game-rating');
    if (!ratingElement) return;
    
    // Get the final rating value
    const ratingText = ratingElement.textContent;
    const finalRating = parseFloat(ratingText.replace('★ ', ''));
    
    // Save the original text for later restoration
    ratingElement.setAttribute('data-original', ratingText);
    
    // Start animation from a lower value
    let currentRating = Math.max(1, finalRating - 2);
    ratingElement.textContent = '★ ' + currentRating.toFixed(1);
    
    // Incrementally increase the rating
    const interval = setInterval(() => {
        currentRating += 0.1;
        ratingElement.textContent = '★ ' + currentRating.toFixed(1);
        
        // When we reach or exceed the final rating, stop and set the exact value
        if (currentRating >= finalRating) {
            clearInterval(interval);
            ratingElement.textContent = ratingElement.getAttribute('data-original');
            
            // Add highlighting effect after reaching the final value
            ratingElement.classList.add('rating-highlight');
            setTimeout(() => {
                ratingElement.classList.remove('rating-highlight');
            }, 1000);
        }
    }, 100);
}

// Add filtering functionality
function filterGames(category) {
    const allGames = document.querySelectorAll('.game-card');
    const featuredGrid = document.querySelector('.featured-grid');
    
    // If showing all games
    if (category === 'all') {
        allGames.forEach(game => {
            game.style.display = 'block';
            game.classList.add('fade-in');
        });
        featuredGrid.style.opacity = '1';
        return;
    }
    
    // Fade out the grid first
    featuredGrid.style.opacity = '0.5';
    
    // Small delay for visual effect
    setTimeout(() => {
        // Hide all games first
        allGames.forEach(game => {
            game.style.display = 'none';
            game.classList.remove('fade-in');
        });
        
        // Show games matching the category
        const filteredGames = document.querySelectorAll(`.game-card[data-category="${category}"]`);
        filteredGames.forEach(game => {
            game.style.display = 'block';
            // Add a small delay before fading in
            setTimeout(() => {
                game.classList.add('fade-in');
            }, 50);
        });
        
        // Fade in the grid after all games are set
        featuredGrid.style.opacity = '1';
    }, 200);
} 