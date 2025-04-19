let zIndexCounter = 1;

// Function to bring the card to the front and start the shuffle animation
function bringToFront(cardId) {
  const card = document.getElementById(cardId);

  card.style.zIndex = zIndexCounter++;

  // Remove the class if it already exists
  card.classList.remove('shuffle');

  // Force reflow to restart the animation
  void card.offsetWidth;

  // Add the class to trigger animation
  card.classList.add('shuffle');
}

// Function to open the specific popup for the clicked card
function openPopup(cardId) {
  const popup = document.getElementById(`popup-${cardId}`);
  popup.classList.add('show');
}

// Function to close the popup
function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.classList.remove('show');
}

// Add event listeners to the card attack buttons
document.querySelectorAll('.card-attack').forEach(button => {
  button.addEventListener('click', function() {
    const cardId = this.closest('.card').id; // Get the card ID
    openPopup(cardId);
  });
});

// Add event listener to close the popups
document.querySelectorAll('.close-popup').forEach(button => {
  button.addEventListener('click', function() {
    const popupId = this.closest('.popup').id; // Get the popup ID
    closePopup(popupId);
  });
});



document.querySelector(".tcgstart").addEventListener("click", function () {
  const targetContainer = document.querySelector(".game-container");

  // Add retro animation class
  targetContainer.classList.add("retro-effect");

  // Scroll into view smoothly
  targetContainer.scrollIntoView({ behavior: "smooth" });

  // Remove the animation class after it's done (e.g., 1.2s later)
  setTimeout(() => {
      targetContainer.classList.remove("retro-effect");
  }, 1200);
});


