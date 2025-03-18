// Reviews section functionality
document.addEventListener('DOMContentLoaded', function() {
    // Fix section title alignment if needed
    const sectionTitles = document.querySelectorAll('.section-title, .section-description');
    sectionTitles.forEach(title => {
        title.style.textAlign = 'center';
    });
    
    // Rating stars functionality
    const ratingStars = document.querySelectorAll('.rating-star');
    const ratingStarsContainer = document.querySelector('.rating-select');
    const ratingText = document.querySelector('.rating-text');
    let selectedRating = 0;
    
    // Rating descriptions
    const ratingDescriptions = {
        0: 'Choose a rating',
        1: 'Poor',
        2: 'Fair', 
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
    };

    // Add hover effect class to container
    if (ratingStarsContainer) {
        ratingStarsContainer.classList.add('hover-effect');
    }
    
    // Center the rating label
    const ratingLabel = document.querySelector('.form-group:has(.rating-select) label');
    if (ratingLabel) {
        ratingLabel.style.textAlign = 'center';
    }

    // Handle star click
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            selectedRating = value;
            updateStars(value);
            updateRatingText(value);
            
            // Add hidden input with rating value to the form
            let ratingInput = document.getElementById('rating-value');
            if (!ratingInput) {
                ratingInput = document.createElement('input');
                ratingInput.type = 'hidden';
                ratingInput.id = 'rating-value';
                ratingInput.name = 'rating';
                document.querySelector('.review-form').appendChild(ratingInput);
            }
            ratingInput.value = value;
        });
        
        // Handle mouse enter (preview)
        star.addEventListener('mouseenter', function() {
            const value = parseInt(this.getAttribute('data-value'));
            previewRating(value);
        });
        
        // Handle mouse leave (restore selected rating or clear)
        star.addEventListener('mouseleave', function() {
            if (selectedRating > 0) {
                updateStars(selectedRating);
                updateRatingText(selectedRating);
            } else {
                clearStars();
                updateRatingText(0);
            }
        });
    });

    // Update stars based on selected rating
    function updateStars(value) {
        ratingStars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            
            // Remove all classes first
            star.classList.remove('selected', 'active');
            
            // Add selected class to clicked star
            if (starValue === value) {
                star.classList.add('selected');
            }
            
            // Add active class to stars that should be filled
            if (starValue <= value) {
                star.classList.add('active');
            }
        });
    }
    
    // Preview rating (on hover)
    function previewRating(value) {
        ratingStars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            star.classList.remove('active');
            
            if (starValue <= value) {
                star.classList.add('active');
            }
        });
        
        updateRatingText(value);
    }
    
    // Clear all stars
    function clearStars() {
        ratingStars.forEach(star => {
            star.classList.remove('selected', 'active');
        });
    }
    
    // Update rating text
    function updateRatingText(value) {
        if (ratingText) {
            ratingText.textContent = ratingDescriptions[value] || 'Choose a rating';
        }
    }

    // Form submission
    const reviewForm = document.querySelector('.review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const username = document.getElementById('reviewer-name').value;
            const reviewText = document.getElementById('review-text').value;
            
            if (!selectedRating) {
                alert('Please select a rating');
                return;
            }
            
            // Here you would normally send the data to a server
            alert(`Thank you for your ${selectedRating}-star review, ${username}!`);
            
            // Reset form
            this.reset();
            selectedRating = 0;
            clearStars();
            updateRatingText(0);
        });
    }

    // Initialize animations
    initAboutAnimations();
});

// Animation functionality
function initAboutAnimations() {
    // Animate about features
    animateAboutFeatures();
    
    // Animate review cards
    animateReviewCards();
    
    // Setup scroll animations for different sections
    setupScrollAnimations();
    
    // Add hover effects for features and review cards
    enhanceHoverEffects();
}

// Animate about features with staggered delay
function animateAboutFeatures() {
    const features = document.querySelectorAll('.about-feature');
    
    if (features.length === 0) return;
    
    if ('IntersectionObserver' in window) {
        const featuresObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('feature-animated');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Animate the icon separately with a slight delay
                        const icon = entry.target.querySelector('.feature-icon');
                        if (icon) {
                            setTimeout(() => {
                                icon.classList.add('icon-pulse');
                            }, 300);
                        }
                    }, 150 * index);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        features.forEach((feature) => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(30px)';
            feature.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            featuresObserver.observe(feature);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateY(0)';
                
                const icon = feature.querySelector('.feature-icon');
                if (icon) {
                    setTimeout(() => {
                        icon.classList.add('icon-pulse');
                    }, 300);
                }
            }, 150 * index);
        });
    }
}

// Animate review cards
function animateReviewCards() {
    const reviewCards = document.querySelectorAll('.review-card');
    
    if (reviewCards.length === 0) return;
    
    if ('IntersectionObserver' in window) {
        const cardsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('card-animated');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Animate stars
                        const stars = entry.target.querySelectorAll('.star.filled');
                        stars.forEach((star, starIndex) => {
                            setTimeout(() => {
                                star.classList.add('star-animated');
                            }, 100 * starIndex);
                        });
                    }, 200 * index);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        reviewCards.forEach((card) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            cardsObserver.observe(card);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        reviewCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                const stars = card.querySelectorAll('.star.filled');
                stars.forEach((star, starIndex) => {
                    setTimeout(() => {
                        star.classList.add('star-animated');
                    }, 100 * starIndex);
                });
            }, 200 * index);
        });
    }
}

// Setup scroll animations for other sections
function setupScrollAnimations() {
    // Animate the about content elements
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        const aboutTitle = aboutContent.querySelector('h2');
        const aboutDesc = aboutContent.querySelector('p');
        
        if (aboutTitle) {
            aboutTitle.style.opacity = '0';
            aboutTitle.style.transform = 'translateY(-20px)';
            aboutTitle.style.transition = 'all 0.6s ease';
        }
        
        if (aboutDesc) {
            aboutDesc.style.opacity = '0';
            aboutDesc.style.transform = 'translateY(20px)';
            aboutDesc.style.transition = 'all 0.6s ease';
        }
        
        if ('IntersectionObserver' in window) {
            const contentObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (aboutTitle) {
                            setTimeout(() => {
                                aboutTitle.style.opacity = '1';
                                aboutTitle.style.transform = 'translateY(0)';
                            }, 100);
                        }
                        
                        if (aboutDesc) {
                            setTimeout(() => {
                                aboutDesc.style.opacity = '1';
                                aboutDesc.style.transform = 'translateY(0)';
                            }, 300);
                        }
                        
                        contentObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            contentObserver.observe(aboutContent);
        } else {
            // Fallback
            if (aboutTitle) aboutTitle.style.opacity = '1';
            if (aboutDesc) aboutDesc.style.opacity = '1';
            if (aboutTitle) aboutTitle.style.transform = 'translateY(0)';
            if (aboutDesc) aboutDesc.style.transform = 'translateY(0)';
        }
    }
    
    // Animate the reviews section title and description
    const reviewsSection = document.querySelector('.reviews-section');
    if (reviewsSection) {
        const sectionTitle = reviewsSection.querySelector('.section-title');
        const sectionDesc = reviewsSection.querySelector('.section-description');
        
        if (sectionTitle) {
            sectionTitle.style.opacity = '0';
            sectionTitle.style.transform = 'translateY(-20px)';
            sectionTitle.style.transition = 'all 0.6s ease';
        }
        
        if (sectionDesc) {
            sectionDesc.style.opacity = '0';
            sectionDesc.style.transform = 'translateY(20px)';
            sectionDesc.style.transition = 'all 0.6s ease';
        }
        
        if ('IntersectionObserver' in window) {
            const titleObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (sectionTitle) {
                            setTimeout(() => {
                                sectionTitle.style.opacity = '1';
                                sectionTitle.style.transform = 'translateY(0)';
                            }, 100);
                        }
                        
                        if (sectionDesc) {
                            setTimeout(() => {
                                sectionDesc.style.opacity = '1';
                                sectionDesc.style.transform = 'translateY(0)';
                            }, 300);
                        }
                        
                        titleObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            titleObserver.observe(reviewsSection);
        } else {
            // Fallback
            if (sectionTitle) sectionTitle.style.opacity = '1';
            if (sectionDesc) sectionDesc.style.opacity = '1';
            if (sectionTitle) sectionTitle.style.transform = 'translateY(0)';
            if (sectionDesc) sectionDesc.style.transform = 'translateY(0)';
        }
    }
    
    // Animate the CTA section
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        const ctaContent = ctaSection.querySelector('.cta-content');
        
        if (ctaContent) {
            ctaContent.style.opacity = '0';
            ctaContent.style.transform = 'scale(0.95)';
            ctaContent.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            if ('IntersectionObserver' in window) {
                const ctaObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            ctaContent.style.opacity = '1';
                            ctaContent.style.transform = 'scale(1)';
                            
                            ctaObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2 });
                
                ctaObserver.observe(ctaSection);
            } else {
                // Fallback
                ctaContent.style.opacity = '1';
                ctaContent.style.transform = 'scale(1)';
            }
        }
    }
    
    // Animate the leave review form
    const leaveReview = document.querySelector('.leave-review');
    if (leaveReview) {
        leaveReview.style.opacity = '0';
        leaveReview.style.transform = 'translateY(30px)';
        leaveReview.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        if ('IntersectionObserver' in window) {
            const formObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        leaveReview.style.opacity = '1';
                        leaveReview.style.transform = 'translateY(0)';
                        
                        formObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            formObserver.observe(leaveReview);
        } else {
            // Fallback
            leaveReview.style.opacity = '1';
            leaveReview.style.transform = 'translateY(0)';
        }
    }
}

// Enhance hover effects
function enhanceHoverEffects() {
    // Add shine effect to feature icons on hover
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('icon-pulse');
        });
        
        icon.addEventListener('mouseleave', () => {
            setTimeout(() => {
                icon.classList.remove('icon-pulse');
            }, 1000);
        });
    });
    
    // Add pulse effect to CTA button
    const ctaButton = document.querySelector('.cta-section .btn');
    if (ctaButton) {
        setInterval(() => {
            ctaButton.classList.add('pulse-button');
            setTimeout(() => {
                ctaButton.classList.remove('pulse-button');
            }, 1000);
        }, 5000);
    }
} 