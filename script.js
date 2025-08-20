

/* =================================
   FOREVER BEGINS - COUNTDOWN SCRIPT
   Romantic Engagement Countdown Timer
   ================================= */

/* =================================
   CONFIGURATION - EASY CUSTOMIZATION
   ================================= */

// 🎯 COUNTDOWN CONFIGURATION
const CONFIG = {
    // Target date and time for countdown (YYYY-MM-DDTHH:MM:SS format)
    targetDate: '2024-12-31T23:59:59',
  //targetDate: new Date(new Date().getTime() + 2000).getTime(),
    
    // Love message to display when surprise is revealed
    loveMessage: `Every star in the sky pales in comparison to the light you bring to my life. Today marks the beginning of our forever journey together. I love you to the moon and back! 💫❤️`,
    
    // Testing mode - set to true for quick testing
    testingMode: {
        enabled: true,  // Set to false for production
        secondsUntilExpiry: 15  // Countdown will expire in this many seconds
    },
    
    // Animation colors
    animations: {
        confettiColors: ['#ff6b9d', '#c44569', '#f8b500', '#ff9ff3', '#54a0ff'],
        heartColor: '#ff6b9d',
        butterflyColors: ['#ff6b9d', '#c44569', '#f8b500']
    }
};

/* =================================
   GLOBAL VARIABLES
   ================================= */

let countdownInterval;
let targetDateTime;
let isCountdownFinished = false;

// DOM Elements
const countdownSection = document.getElementById('countdownSection');
const surpriseSection = document.getElementById('surpriseSection');
const messageSection = document.getElementById('messageSection');
const surpriseButton = document.getElementById('surpriseButton');
const loveMessageElement = document.getElementById('loveMessage');

// Time display elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Animation containers
const confettiContainer = document.getElementById('confettiContainer');
const heartsContainer = document.getElementById('heartsContainer');
const butterfliesContainer = document.getElementById('butterfliesContainer');
const backgroundAnimation = document.getElementById('backgroundAnimation');

/* =================================
   INITIALIZATION
   ================================= */

document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    createBackgroundHearts();
    setupEventListeners();
    
    // Set the love message
    loveMessageElement.textContent = CONFIG.loveMessage;
    
    console.log('💕 Forever Begins - Countdown Initialized!');
    console.log('🔧 Testing Mode:', CONFIG.testingMode.enabled ? 'ENABLED' : 'DISABLED');
});

/* =================================
   COUNTDOWN LOGIC
   ================================= */

function initializeCountdown() {
    // Set target date based on configuration
    if (CONFIG.testingMode.enabled) {
        // For testing: set target to current time + specified seconds
        targetDateTime = new Date();
        targetDateTime.setSeconds(targetDateTime.getSeconds() + CONFIG.testingMode.secondsUntilExpiry);
        console.log('🧪 Testing mode: Countdown set to expire in', CONFIG.testingMode.secondsUntilExpiry, 'seconds');
    } else {
        // Production: use configured target date
        targetDateTime = new Date(CONFIG.targetDate);
        console.log('🎯 Production mode: Target date set to', targetDateTime);
    }
    
    // Start the countdown
    startCountdown();
}

function startCountdown() {
    // Update immediately
    updateCountdown();
    
    // Set interval to update every second
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const target = targetDateTime.getTime();
    const timeLeft = target - now;
    
    if (timeLeft <= 0) {
        // Countdown finished!
        finishCountdown();
        return;
    }
    
    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Update display with smooth animation
    updateTimeDisplay(daysElement, days);
    updateTimeDisplay(hoursElement, hours);
    updateTimeDisplay(minutesElement, minutes);
    updateTimeDisplay(secondsElement, seconds);
}

function updateTimeDisplay(element, value) {
    const formattedValue = String(value).padStart(2, '0');
    
    if (element.textContent !== formattedValue) {
        element.style.transform = 'scale(1.1)';
        element.textContent = formattedValue;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

function finishCountdown() {
    clearInterval(countdownInterval);
    isCountdownFinished = true;
    
    console.log('🎉 Countdown finished! Time for surprises!');
    
    // Hide countdown with fade out animation
    countdownSection.classList.add('fade-out');
    
    setTimeout(() => {
        countdownSection.classList.add('hidden');
        showSurpriseButton();
    }, 500);
}

/* =================================
   SURPRISE REVEAL LOGIC
   ================================= */

function showSurpriseButton() {
    surpriseSection.classList.remove('hidden');
    surpriseSection.classList.add('fade-in');
    
    // Add pulse animation to button
    surpriseButton.style.animation = 'pulse 2s infinite';
    
    console.log('💝 Surprise button revealed!');
}

function revealSurprise() {
    console.log('🎊 Surprise activated! Starting romantic animations...');
    
    // Hide surprise button
    surpriseSection.classList.add('fade-out');
    
    setTimeout(() => {
        surpriseSection.classList.add('hidden');
        showLoveMessage();
        startCelebrationAnimations();
    }, 500);
}

function showLoveMessage() {
    messageSection.classList.remove('hidden');
    messageSection.classList.add('fade-in');
    
    console.log('💌 Love message revealed!');
}

/* =================================
   ANIMATION FUNCTIONS
   ================================= */

function startCelebrationAnimations() {
    createConfetti();
    createFloatingHearts();
    createButterflies();
    
    console.log('✨ All celebration animations started!');
}

function createConfetti() {
    const colors = CONFIG.animations.confettiColors;
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            // Random shapes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            } else {
                confetti.style.transform = 'rotate(45deg)';
            }
            
            confettiContainer.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 100);
    }
}

function createFloatingHearts() {
    const heartSymbols = ['💖', '💕', '💗', '💓', '❤️', '💝'];
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            heart.style.fontSize = (Math.random() * 10 + 20) + 'px';
            
            heartsContainer.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 6000);
        }, i * 200);
    }
}

function createButterflies() {
    const butterflySymbols = ['🦋', '🧚‍♀️', '✨'];
    const butterflyCount = 8;
    
    for (let i = 0; i < butterflyCount; i++) {
        setTimeout(() => {
            const butterfly = document.createElement('div');
            butterfly.className = 'butterfly';
            butterfly.textContent = butterflySymbols[Math.floor(Math.random() * butterflySymbols.length)];
            butterfly.style.left = Math.random() * 80 + 'vw';
            butterfly.style.top = Math.random() * 80 + 'vh';
            butterfly.style.animationDelay = Math.random() * 2 + 's';
            butterfly.style.animationDuration = (Math.random() * 3 + 4) + 's';
            
            butterfliesContainer.appendChild(butterfly);
            
            // Remove after animation
            setTimeout(() => {
                if (butterfly.parentNode) {
                    butterfly.parentNode.removeChild(butterfly);
                }
            }, 8000);
        }, i * 400);
    }
}

function createBackgroundHearts() {
    const heartCount = 15;
    const heartSymbols = ['💕', '💖', '💗'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 8 + 16) + 'px';
        
        backgroundAnimation.appendChild(heart);
    }
}

/* =================================
   EVENT LISTENERS
   ================================= */

function setupEventListeners() {
    // Surprise button click handler
    surpriseButton.addEventListener('click', revealSurprise);
    
    // Add touch feedback for mobile
    surpriseButton.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    surpriseButton.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Keyboard accessibility
    surpriseButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            revealSurprise();
        }
    });
    
    // Window resize handler for responsive animations
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Visibility change handler (pause/resume when tab changes)
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

function handleResize() {
    // Adjust animations for different screen sizes
    console.log('📱 Window resized, adjusting animations...');
}

function handleVisibilityChange() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        console.log('⏸️ Tab hidden, pausing animations...');
    } else {
        // Resume animations when tab is visible
        console.log('▶️ Tab visible, resuming animations...');
    }
}

/* =================================
   UTILITY FUNCTIONS
   ================================= */

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getRandomColor() {
    const colors = CONFIG.animations.confettiColors;
    return colors[Math.floor(Math.random() * colors.length)];
}

/* =================================
   TESTING AND DEBUG FUNCTIONS
   ================================= */

// Function to manually trigger surprise (for testing)
function triggerSurprise() {
    if (isCountdownFinished) {
        revealSurprise();
    } else {
        console.log('⚠️ Countdown not finished yet. Wait for countdown to complete or enable testing mode.');
    }
}

// Function to manually finish countdown (for testing)
function finishCountdownNow() {
    finishCountdown();
}

// Function to reset everything (for testing)
function resetCountdown() {
    clearInterval(countdownInterval);
    
    // Reset states
    isCountdownFinished = false;
    
    // Reset UI
    countdownSection.classList.remove('hidden', 'fade-out');
    surpriseSection.classList.add('hidden');
    messageSection.classList.add('hidden');
    
    // Clear animations
    confettiContainer.innerHTML = '';
    heartsContainer.innerHTML = '';
    butterfliesContainer.innerHTML = '';
    
    // Restart countdown
    initializeCountdown();
    
    console.log('🔄 Countdown reset!');
}

// Expose testing functions to global scope (only in development)
if (CONFIG.testingMode.enabled) {
    window.triggerSurprise = triggerSurprise;
    window.finishCountdownNow = finishCountdownNow;
    window.resetCountdown = resetCountdown;
    
    console.log('🧪 Testing functions available:');
    console.log('   - triggerSurprise()');
    console.log('   - finishCountdownNow()');
    console.log('   - resetCountdown()');
}

/* =================================
   ERROR HANDLING
   ================================= */

window.addEventListener('error', function(e) {
    console.error('❌ JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Unhandled Promise Rejection:', e.reason);
});

/* =================================
   PERFORMANCE OPTIMIZATION
   ================================= */

// Intersection Observer for animation performance
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

// Observe elements for animation
document.querySelectorAll('.countdown-card, .surprise-card, .message-card').forEach(el => {
    animationObserver.observe(el);
});

/* =================================
   FINAL INITIALIZATION MESSAGE
   ================================= */

console.log(`
🌹✨ FOREVER BEGINS - ROMANTIC COUNTDOWN ✨🌹

💝 Configuration:
   Target Date: ${CONFIG.testingMode.enabled ? 'Testing Mode (' + CONFIG.testingMode.secondsUntilExpiry + 's)' : CONFIG.targetDate}
   Love Message: Ready to display
   Animations: Confetti, Hearts, Butterflies loaded

🎯 Instructions:
   1. Wait for countdown to finish
   2. Click the surprise button
   3. Enjoy the romantic animations!

💡 Customization Tips:
   - Edit CONFIG object at the top of this file
   - Change targetDate for your special date
   - Modify loveMessage for your personal message
   - Adjust testingMode for development/production

💕 Made with love for your forever journey!
`);

/* =================================
   DEPLOYMENT INSTRUCTIONS
   ================================= 

   🚀 GitHub Pages Deployment Steps:
   
   1. Create a new repository on GitHub named "forever-begins"
   2. Upload these files: index.html, style.css, app.js
   3. Go to repository Settings > Pages
   4. Select "Deploy from a branch" > "main" branch > "/ (root)"
   5. Save and wait for deployment
   6. Your site will be available at: https://username.github.io/forever-begins
   
   ⚙️ Customization for Production:
   
   1. Set CONFIG.testingMode.enabled = false
   2. Update CONFIG.targetDate to your engagement date
   3. Customize CONFIG.loveMessage with your personal message
   4. Adjust colors in CONFIG.animations if desired
   5. Test thoroughly before the special day!
   
   🌟 Enhancement Ideas:
   
   - Add background music (consider autoplay policies)
   - Include photo slideshow during countdown
   - Add social sharing buttons
   - Create custom cursor effects
   - Add particle trail following cursor
   - Include countdown notifications
   - Add different themes/color schemes
   - Create custom fonts loading
   - Add geolocation-based sunrise/sunset themes
   
   ================================= */
