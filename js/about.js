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
}); 