// Particle effect
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 3}px;
            height: ${Math.random() * 3}px;
            background-color: rgba(0, 255, 242, ${Math.random() * 0.5});
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            pointer-events: none;
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
};

// Initialize particles
createParticles();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = 'var(--glass-shadow)';
    }
    
    lastScroll = currentScroll;
});

// Skill cards hover effect
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserverOptions = {
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, sectionObserverOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Add intersection observer for fade-in animations
const fadeObserverOptions = {
    threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, fadeObserverOptions);

// Observe all sections for fade-in
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    fadeObserver.observe(section);
});

// Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
});

// Language card skill levels
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill levels from data attributes
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        const span = skill.querySelector('span');
        
        if (span) {
            // Set the width through CSS variable for the animation
            span.style.setProperty('--fill-width', level);
        }
    });
    
    // Add intersection observer to trigger animations when cards are visible
    const cards = document.querySelectorAll('.language-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Project Gallery Modal
document.addEventListener('DOMContentLoaded', function() {
    // Project gallery image data
    const projectGalleries = {
        'partey': [
            { src: 'hans/proj/parteydash.jpg', caption: 'Parteyz Catering Service - Home' }
        ],
        'halou': [
            { src: 'hans/proj/halouadmin.png', caption: 'Admin Dashboard' },
            { src: 'hans/proj/haloudash.png', caption: 'dashboard' }
        ],
        'task': [
            { src: 'hans/proj/dashtask.png', caption: 'TaskMatrix - Home' },
            { src: 'hans/proj/taskmobile.png', caption: 'Mobile View' },
            { src: 'hans/proj/app1.png', caption: 'Mobile View' },
            { src: 'hans/proj/app2.png', caption: 'Mobile View' },
            { src: 'hans/proj/app3.png', caption: 'Mobile View' }
        ]
    };

    // Gallery modal elements
    const modal = document.querySelector('.gallery-modal');
    const modalContent = document.querySelector('.gallery-modal-content');
    const slidesContainer = document.querySelector('.gallery-slides');
    const closeBtn = document.querySelector('.gallery-close');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const galleryBtns = document.querySelectorAll('.project-gallery-btn');

    let currentProject = '';
    let currentSlideIndex = 0;

    // Open gallery modal
    galleryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get project ID from data attribute
            currentProject = this.getAttribute('data-project');
            const projectImages = projectGalleries[currentProject] || [];
            
            // Clear previous slides
            slidesContainer.innerHTML = '';
            
            // Create slides for current project
            projectImages.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = `gallery-slide ${index === 0 ? 'active' : ''}`;
                
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.caption || `${currentProject} image ${index + 1}`;
                
                const caption = document.createElement('div');
                caption.className = 'slide-caption';
                caption.textContent = image.caption || '';
                
                slide.appendChild(img);
                slide.appendChild(caption);
                slidesContainer.appendChild(slide);
            });
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Reset current slide index
            currentSlideIndex = 0;
        });
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close when clicking outside modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Next and Previous buttons
    function showSlide(index) {
        const slides = document.querySelectorAll('.gallery-slide');
        
        if (!slides.length) return;
        
        // Handle wrap around
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[currentSlideIndex].classList.add('active');
    }

    nextBtn.addEventListener('click', function() {
        showSlide(currentSlideIndex + 1);
    });

    prevBtn.addEventListener('click', function() {
        showSlide(currentSlideIndex - 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                showSlide(currentSlideIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showSlide(currentSlideIndex + 1);
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Certificate Modal
document.addEventListener('DOMContentLoaded', function() {
    // Certificate data
    const certificateData = {
        'nc3': {
            title: 'National Certificate III',
            image: 'hans/proj/nc3.jpg', // Updated image path
            date: 'Issued: July 6, 2023',
            description: 'National Certificate III in Event Management Services. This certification confirms skills in organizing events, managing logistics, handling clients, and supporting technical aspects of event operations.'
        },
        'drrmo': {
            title: 'DRRMO Training Certificate',
            image: 'hans/proj/drrmo.jpg', // Updated image path
            date: 'Issued: August 30, 2022',
            description: 'Disaster Risk Reduction Management Office certification for emergency response and preparedness. This training covered disaster prevention, mitigation, response, and recovery procedures.'
        },
        'resume': {
            title: 'Professional Resume',
            image: 'hans/js/resume.pdf',
            date: 'Last Updated: April 2025',
            description: 'My professional resume detailing work experience, skills, and educational background.'
        }
    };

    // Certificate modal elements
    const modal = document.querySelector('.certificate-modal');
    const closeBtn = document.querySelector('.certificate-close');
    const certificateImage = document.getElementById('certificate-image');
    const certificateTitle = document.getElementById('certificate-title');
    const certificateDate = document.getElementById('certificate-date');
    const certificateDescription = document.getElementById('certificate-description');
    const certificateBtns = document.querySelectorAll('.certificate-btn');

    // Open certificate modal
    certificateBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get certificate ID from data attribute
            const certificateId = this.getAttribute('data-certificate');
            
            // Special handling for resume
            if (certificateId === 'resume') {
                window.open('hans/js/resume.pdf', '_blank');
                return;
            }
            
            const certificate = certificateData[certificateId];
            
            if (certificate) {
                // Update modal content
                certificateImage.src = certificate.image;
                certificateImage.alt = certificate.title;
                certificateTitle.textContent = certificate.title;
                certificateDate.textContent = certificate.date;
                certificateDescription.textContent = certificate.description;
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                
                // Add loaded class for animation
                setTimeout(() => {
                    certificateImage.classList.add('loaded');
                }, 100);
            }
        });
    });

    // Add image load event
    certificateImage.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    // Close when clicking outside modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Helper function to close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        certificateImage.classList.remove('loaded');
    }
});

// Remove school gallery related JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Remove gallery related code that's no longer needed
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.style.display = 'none';
        });
    }
});
