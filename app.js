document.addEventListener('DOMContentLoaded', function() {
    // Countdown timer for next draw
    const nextDrawElement = document.getElementById('next-draw-time');
    const countdownElement = document.getElementById('countdown');
    
    if (nextDrawElement && countdownElement) {
        const nextDrawTime = nextDrawElement.getAttribute('data-time');
        
        // Update countdown every second
        function updateCountdown() {
            const now = new Date().getTime();
            const drawTime = new Date(nextDrawTime).getTime();
            
            // Find the distance between now and the draw time
            const distance = drawTime - now;
            
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            countdownElement.innerHTML = `
                <div class="d-flex justify-content-center">
                    <div class="countdown-item">
                        <div class="countdown-value">${days}</div>
                        <div class="countdown-label">Days</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-value">${hours}</div>
                        <div class="countdown-label">Hours</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-value">${minutes}</div>
                        <div class="countdown-label">Minutes</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-value">${seconds}</div>
                        <div class="countdown-label">Seconds</div>
                    </div>
                </div>
            `;
            
            // If the countdown is over, write some text
            if (distance < 0) {
                clearInterval(countdownTimer);
                countdownElement.innerHTML = "DRAW TIME!";
                
                // Reload the page after a delay to show new results
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }
        }
        
        // Update immediately and then every second
        updateCountdown();
        const countdownTimer = setInterval(updateCountdown, 1000);
    }
    
    // Add current year to footer
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('{{ now.year }}', currentYear);
    }
});
