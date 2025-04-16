// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill progress bars when they come into view
            if (entry.target.classList.contains('skills')) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach((progress, index) => {
                    setTimeout(() => {
                        const width = progress.style.width;
                        progress.style.width = '0';
                        requestAnimationFrame(() => {
                            progress.style.width = width;
                        });
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections and skill cards
document.querySelectorAll('section, .skill-card').forEach(element => {
    observer.observe(element);
});

// Enhanced parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const heroContent = document.querySelector('.hero-content');
    const cube = document.querySelector('.cube-wrapper');
    
    heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    if (cube) {
        cube.style.transform = `translate(${-moveX * 2}px, ${-moveY * 2}px)`;
    }
});

// Form submission handling with validation and animation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form data
        if (!validateForm(data)) {
            return;
        }
        
        // Animate submit button
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            // Here you would typically send the data to a server
            await simulateFormSubmission(data);
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            submitButton.disabled = false;
        }
    });
}

// Form validation
function validateForm(data) {
    const { name, email, message } = data;
    
    if (!name || name.length < 2) {
        showNotification('Please enter a valid name', 'error');
        return false;
    }
    
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email', 'error');
        return false;
    }
    
    if (!message || message.length < 10) {
        showNotification('Message must be at least 10 characters long', 'error');
        return false;
    }
    
    return true;
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    });
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Enhanced 3D tilt effect for skill cards
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((centerX - x) / centerX) * 10;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
        
        // Add highlight effect
        const glare = card.querySelector('.glare') || document.createElement('div');
        if (!card.querySelector('.glare')) {
            glare.className = 'glare';
            card.appendChild(glare);
        }
        
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        const glare = card.querySelector('.glare');
        if (glare) {
            glare.remove();
        }
    });
});

// Navigation background change on scroll with smooth transition
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
        nav.style.padding = '1rem 1.5rem';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.9)';
        nav.style.padding = '1.5rem';
    }
});

// Add CSS styles for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        color: white;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.success {
        background: linear-gradient(45deg, #10B981, #059669);
    }
    
    .notification.error {
        background: linear-gradient(45deg, #EF4444, #DC2626);
    }
    
    .glare {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        border-radius: 1rem;
    }
`;
document.head.appendChild(style);