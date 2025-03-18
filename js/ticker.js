// Ticker JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sequential ticker animation for winners
    function initWinnersTicker() {
        const tickerWinners = document.querySelectorAll('.ticker-winner');
        if (!tickerWinners.length) return;
        
        let currentIndex = 0;
        let animating = false;
        
        // Function to animate a single winner
        function animateWinner() {
            if (animating) return;
            
            // Set animating flag to true
            animating = true;
            
            // Get current winner element
            const winner = tickerWinners[currentIndex];
            
            // Add animation class
            winner.classList.add('animate-ticker');
            
            // Listen for animation end
            winner.addEventListener('animationend', function onAnimEnd() {
                // Remove the listener to prevent memory leaks
                winner.removeEventListener('animationend', onAnimEnd);
                
                // Remove animation class
                winner.classList.remove('animate-ticker');
                
                // Update index for next animation
                currentIndex = (currentIndex + 1) % tickerWinners.length;
                
                // Set animating flag to false
                animating = false;
                
                // Wait between animations
                setTimeout(animateWinner, 200);
            }, { once: true });
        }
        
        // Start the first animation
        animateWinner();
    }
    
    // Initialize the ticker
    initWinnersTicker();
}); 