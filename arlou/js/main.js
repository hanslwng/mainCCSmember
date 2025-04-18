// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorFollower.style.transform = 'scale(1.2)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
});

// Hover effect for links and buttons
const hoverElements = document.querySelectorAll('a, button, .card');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Enhanced Navbar scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Show/hide header based on scroll direction and position
    if (currentScroll <= 0) {
        // At the top
        header.classList.remove('show');
        header.classList.add('at-top');
    } else {
        header.classList.remove('at-top');
        
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            // Scrolling down & past threshold
            header.classList.remove('show');
        } else {
            // Scrolling up or near top
            header.classList.add('show');
        }
    }
    
    lastScroll = currentScroll;
});

// Add show class when hovering near top of screen
let mouseTimer;
document.addEventListener('mousemove', (e) => {
    if (e.clientY < 50) {
        clearTimeout(mouseTimer);
        header.classList.add('show');
    } else {
        mouseTimer = setTimeout(() => {
            if (window.pageYOffset <= 0) {
                header.classList.remove('show');
            }
        }, 1000);
    }
});

// Mobile menu
const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.add('show');
});

navClose.addEventListener('click', () => {
    navMenu.classList.remove('show');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Typed.js
const typed = new Typed('.typed-text', {
    strings: [
        "I build things for the web.",
        "I create modern web applications.",
        "I design beautiful user interfaces.",
        "I develop responsive websites."
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00c6ff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00c6ff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Project filters
const filterButtons = document.querySelectorAll('.projects-item-filter');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 200);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 500);
            }
        });
    });
});

// EmailJS Configuration
(function() {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Change button state
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Get form data
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                to_name: "Arlou Anievas",
                to_email: "arlouanievas10@gmail.com",
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            console.log('Attempting to send email with EmailJS...');
            console.log('Service ID:', 'service_oy3m3tp');
            console.log('Template ID:', 'template_byf242m');
            console.log('Template Parameters:', templateParams);

            // Send email using EmailJS
            emailjs.send('service_oy3m3tp', 'template_byf242m', templateParams)
                .then(function(response) {
                    console.log('EmailJS SUCCESS!', response);
                    
                    // Show success state
                    submitBtn.classList.remove('loading');
                    submitBtn.classList.add('success');
                    
                    // Show success message
                    alert('Message sent successfully! Thank you for contacting me.');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button state after delay
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                    }, 3000);
                })
                .catch(function(error) {
                    console.error('EmailJS FAILED:', error);
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    
                    // Show detailed error message
                    alert('Failed to send message. Please try again or contact me directly at arlouanievas10@gmail.com\n\nError: ' + (error.text || error.message));
                });
        });
    }
})(); 