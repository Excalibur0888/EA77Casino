// Ticker JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Ticker Animation for Winners
    const tickerWinners = document.querySelectorAll('.ticker-winner');
    if (!tickerWinners.length) return;

    let currentIndex = 0;
    const totalWinners = tickerWinners.length;
    
    // Позиционируем элементы вне видимой области, чтобы они были готовы для анимации
    tickerWinners.forEach(winner => {
        winner.style.left = '0';
        winner.style.opacity = '0';
    });
    
    // Add animation class to first winner to start
    if (tickerWinners[0]) {
        tickerWinners[0].classList.add('animate-ticker');
    }
    
    // Sequential animation logic
    function animateNextWinner() {
        // Remove animation class from all winners
        tickerWinners.forEach(winner => {
            winner.classList.remove('animate-ticker');
        });
        
        // Increment index and reset if needed
        currentIndex = (currentIndex + 1) % totalWinners;
        
        // Add animation class to current winner
        tickerWinners[currentIndex].classList.add('animate-ticker');
        
        // Wait for animation to complete before animating next winner
        setTimeout(animateNextWinner, 10000); // 10 seconds matches animation duration
    }
    
    // Start the sequence
    setTimeout(animateNextWinner, 10000); // Wait for first animation to complete
}); 