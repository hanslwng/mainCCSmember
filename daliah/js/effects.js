// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Intersection Observer for fade-in animations
const createScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
};

// Particle background effect
const createParticleBackground = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(192, 132, 252, 0.2)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const init = () => {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    init();
    animate();
};

// Skill section enhancements
const enhanceSkills = () => {
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach(skill => {
        // Add mouse movement effect
        skill.addEventListener('mousemove', (e) => {
            const rect = skill.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            skill.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        // Reset transform on mouse leave
        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
};

// Add typing effect to tagline
const createTypingEffect = () => {
    const tagline = document.querySelector('.tagline');
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    
    const type = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    };
    
    type();
};

// Add scroll-triggered animations
const createScrollEffects = () => {
    const elements = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => observer.observe(element));
};


function initializeImageSlider() {
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider-image');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        
        // Create dots container
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        // Create dots for each image
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });
        
        slider.appendChild(dotsContainer);
        const dots = dotsContainer.querySelectorAll('.dot');
        
        let currentIndex = 0;
        let isTransitioning = false;
        
        function showImage(index) {
            if (isTransitioning) return;
            isTransitioning = true;
            
            // Remove active class from all images and dots
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current image and dot
            images[index].classList.add('active');
            dots[index].classList.add('active');
            
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
        
        // Show first image immediately
        showImage(0);
        
        // Event listeners for navigation buttons
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
            });
        });
        
        // Auto advance slides
        let autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 5000);
        
        // Pause auto-advance on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            }, 5000);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            }
        });
    });
}

function verifyImageLoading() {
    const images = document.querySelectorAll('.slider-image');
    images.forEach(img => {
        img.addEventListener('error', () => {
            console.error(`Failed to load image: ${img.src}`);
        });
        img.addEventListener('load', () => {
            console.log(`Successfully loaded image: ${img.src}`);
        });
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    createScrollProgress();
    createScrollAnimations();
    createParticleBackground();
    enhanceSkills();
    createTypingEffect();
    createScrollEffects();
    initializeImageSlider();
    verifyImageLoading();
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Create backdrop element
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        backdrop.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', toggleMenu);

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
}); 