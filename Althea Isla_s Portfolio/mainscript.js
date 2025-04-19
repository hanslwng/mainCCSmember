// hidden effect
function onIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing the element once it's visible
      }
    });
  }
  
  // pop up effect
  const observer = new IntersectionObserver(onIntersection, {
    root: null, // use the viewport
    threshold: 0.1 // trigger when 10% of the element is visible
  });
  
  // popup effect pwera sa pfp
  const sections = document.querySelectorAll('.section');
  
  // Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });
// navbar
const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar ul');

hamburger.addEventListener('click', () => {
    navbarMenu.classList.toggle('show');
});
function showCV() {
  document.getElementById('cv-popup').style.display = 'flex';
}

function hideCV() {
  document.getElementById('cv-popup').style.display = 'none';
}
// Show/Hide CV modal
const cvBtn = document.getElementById('cvBtn');
const cvModal = document.getElementById('cvModal');

cvBtn.addEventListener('click', () => {
  cvModal.style.display = 'flex';
});

// Close the modal when clicking outside the image
cvModal.addEventListener('click', (e) => {
  if (e.target === cvModal) {
    cvModal.style.display = 'none';
  }
});
