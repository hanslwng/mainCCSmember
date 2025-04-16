const teamGrid = document.getElementById('teamGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = document.querySelectorAll('.team-card');

let currentIndex = 0;
let isAnimating = false;

function showCard(index, direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    const totalCards = cards.length;
    currentIndex = ((index % totalCards) + totalCards) % totalCards;
    
    cards.forEach((card, i) => {
        let distance = i - currentIndex;
        
        // Adjust distance for shorter path
        if (Math.abs(distance) > totalCards / 2) {
            distance = distance > 0 ? distance - totalCards : distance + totalCards;
        }
        
        // Add smooth transition
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
        card.style.transform = `translateX(${distance * 100}%) scale(${i === currentIndex ? 1 : 0.8})`;
        card.style.opacity = i === currentIndex ? '1' : '0.5';
        card.style.zIndex = i === currentIndex ? '1' : '0';
    });

    // Reset animation flag after transition
    setTimeout(() => {
        isAnimating = false;
        cards.forEach(card => {
            card.style.transition = 'none';
        });
    }, 500);
}

// Event listeners for buttons with debounce
prevBtn.addEventListener('click', () => {
    showCard(currentIndex - 1, 'left');
});

nextBtn.addEventListener('click', () => {
    showCard(currentIndex + 1, 'right');
});

// Keyboard navigation with debounce
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showCard(currentIndex - 1, 'left');
    } else if (e.key === 'ArrowRight') {
        showCard(currentIndex + 1, 'right');
    }
});

// Initialize
showCard(0);
