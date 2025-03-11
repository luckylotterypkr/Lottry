document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initSlotMachine();
    initDollarRain();
    initAppDownloadModal();
    
    // Restart animations on page focus
    window.addEventListener('focus', function() {
        initDollarRain();
    });
});

// Slot Machine Animation
function initSlotMachine() {
    // Get all slot reels
    const slotReels = document.querySelectorAll('.slot-reel');
    
    if (slotReels.length > 0) {
        // Play slot machine sounds
        playSlotSound();
        
        // Animate each slot reel to its target number
        slotReels.forEach((reel, index) => {
            const targetDigit = reel.getAttribute('data-target');
            const digitElement = reel.querySelector('.slot-digit');
            
            // Create a random delay for each reel
            const delay = 500 + (index * 300);
            
            // Start the reel animation
            animateDigit(digitElement, targetDigit, delay);
        });
    }
}

function animateDigit(element, targetDigit, delay) {
    // Generate digits for animation
    const digits = [];
    for (let i = 0; i < 20; i++) {
        digits.push(Math.floor(Math.random() * 10));
    }
    
    // Add the target digit at the end
    digits.push(parseInt(targetDigit));
    
    // Set initial digit
    let currentIndex = 0;
    element.textContent = digits[0];
    
    // Create timeline for smooth animation
    const timeline = gsap.timeline();
    
    // Add animation with delay
    timeline.to({}, { duration: delay / 1000, onComplete: () => {
        // Start the spinning animation
        const interval = setInterval(() => {
            currentIndex++;
            
            // Update the digit
            element.textContent = digits[currentIndex];
            
            // Add blur effect during fast spinning
            if (currentIndex < digits.length - 5) {
                element.style.textShadow = "0 0 10px var(--gold)";
                element.style.filter = "blur(2px)";
            } else {
                // Remove blur as it slows down
                element.style.textShadow = "0 0 5px rgba(255, 215, 0, 0.7)";
                element.style.filter = "blur(0)";
            }
            
            // Slow down animation as it approaches the target
            if (currentIndex === digits.length - 5) {
                clearInterval(interval);
                
                // Complete the animation more slowly
                const slowInterval = setInterval(() => {
                    currentIndex++;
                    element.textContent = digits[currentIndex];
