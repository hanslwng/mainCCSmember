// Get BMO's elements
const bmo = document.querySelector('.bmo');
const smile = document.querySelector('.smile');
const leftEye = document.querySelector('.eye.left');
const rightEye = document.querySelector('.eye.right');
const chatBubble = document.querySelector('.chat-bubble');
const chatImage = document.querySelector('.chat-image');

// Messages to display when clicking BMO
const messages = [
  "Want to get to know her more?",
  "This is a portfolio made and developed by me :)",
  "Please click the start button to open the portfolio"
];

// Image URLs for each message
const images = [
  "Althea Isla_s Portfolio/images/soteyed.png", // Replace with your image URL
  "Althea Isla_s Portfolio/images/soteyed.png", // You can use different images here if needed
  " "
];

// Track the number of clicks
let clickCount = 0;

// Click event on BMO to show chat bubble with different message each time
bmo.addEventListener('click', () => {
  // Show chat bubble and display message based on click count
  chatBubble.style.display = 'flex'; // Show the chat bubble as flex
  chatBubble.textContent = messages[clickCount]; // Set message text
  
  // Set the corresponding image for the current message
  chatImage.src = images[clickCount];

  // Increment the click count
  clickCount++;

  // If clicked more than 3 times, reset to the first message
  if (clickCount >= messages.length) {
    clickCount = 0;
  }

  // Position the chat bubble
  chatBubble.style.left = 'calc(100% + 20px)'; // Keep the bubble on the left side with a gap
  chatBubble.style.top = '160px'; // Position it slightly above BMO's screen
  chatBubble.style.transform = 'translateY(-50%)'; // Adjust horizontal alignment

  // Show image next to the chat bubble
  chatImage.style.display = 'inline-block'; // Make sure image is visible
});
// Get the start button element
const startButton = document.getElementById('start-button');

// Add an event listener to the start button
startButton.addEventListener('click', () => {
  // Redirect to another HTML page when the start button is clicked
  window.location.href = 'Althea Isla_s Portfolio/main.html';  // Change 'another-page.html' to your desired HTML page
});
