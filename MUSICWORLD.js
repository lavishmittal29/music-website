// Music player functionality
document.getElementById("play-music").addEventListener("click", function() {
    let audio = new Audio("background-music.mp3");
    audio.play();
    animateVisualizer();
});

// Track buttons
const trackButtons = document.querySelectorAll('.play-track');
let currentAudio = null;
let visualizerInterval;

trackButtons.forEach(button => {
    button.addEventListener('click', function() {
        const trackSrc = this.getAttribute('data-track');
        
        // Stop any currently playing audio
        if (currentAudio) {
            currentAudio.pause();
            stopVisualizerAnimation();
            
            // Reset button text if it's the same track
            if (currentAudio.src.includes(trackSrc)) {
                this.textContent = '▶️ Play';
                currentAudio = null;
                return;
            }
        }
        
        // Play the new track
        currentAudio = new Audio(trackSrc);
        currentAudio.play();
        animateVisualizer();
        this.textContent = '⏸️ Pause';
        
        // Reset other buttons
        trackButtons.forEach(btn => {
            if (btn !== this) {
                btn.textContent = '▶️ Play';
            }
        });
        
        // When audio ends
        currentAudio.addEventListener('ended', function() {
            button.textContent = '▶️ Play';
            stopVisualizerAnimation();
            currentAudio = null;
        });
    });
});

// Music visualizer animation
function animateVisualizer() {
    const bars = document.querySelectorAll('.bar');
    visualizerInterval = setInterval(() => {
        bars.forEach(bar => {
            const height = Math.floor(Math.random() * 90) + 10;
            bar.style.height = `${height}px`;
        });
    }, 100);
}

function stopVisualizerAnimation() {
    clearInterval(visualizerInterval);
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.height = '10px';
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});