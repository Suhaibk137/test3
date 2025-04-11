// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.getElementById('back-to-top');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contact-form');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Toggle hamburger animation
    const bars = document.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'translateY(8px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close menu when nav item clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Reset hamburger
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Smooth scrolling with Wix-style easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Custom easing function for smoother animation
        const startPosition = window.pageYOffset;
        const distance = offsetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const duration = 1000; // 1 second
            
            // Easing function: easeOutQuart
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    });
});

// Back to Top button visibility with fade effect
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
    
    // Add animation to sections when scrolled into view
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('fade-in', 'active');
        }
    });
});

// Back to Top functionality with smooth scroll
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const startPosition = window.pageYOffset;
    const duration = 1000; // 1 second
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        
        // Easing function: easeOutQuart
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        
        window.scrollTo(0, startPosition * (1 - ease));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
});

// Initialize sections for animations and add Wix-style decorative elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to all sections
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Check if sections are in view on initial load
    setTimeout(() => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.75) {
                section.classList.add('active');
            }
        });
    }, 100);
    
    // Add floating circles for Wix-style decoration
    addFloatingElements();
    
    // Initialize page load animation
    document.body.classList.add('page-loaded');
    
    // Add parallax effect to hero section
    initParallax();
});

// Form submission with validation
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
        
        // Check required fields
        if (!name.value.trim()) {
            isValid = false;
            name.classList.add('error');
            addErrorMessage(name, 'Name is required');
        }
        
        if (!email.value.trim()) {
            isValid = false;
            email.classList.add('error');
            addErrorMessage(email, 'Email is required');
        } else if (!isValidEmail(email.value.trim())) {
            isValid = false;
            email.classList.add('error');
            addErrorMessage(email, 'Please enter a valid email');
        }
        
        if (!message.value.trim()) {
            isValid = false;
            message.classList.add('error');
            addErrorMessage(message, 'Message is required');
        }
        
        if (isValid) {
            // In a real application, you would send the form data to the server
            // For demo, we'll just show a success message with a Wix-style animation
            contactForm.classList.add('fade-out');
            
            setTimeout(() => {
                const formSuccess = document.createElement('div');
                formSuccess.className = 'form-success';
                formSuccess.innerHTML = `
                    <i class="fas fa-check-circle" style="font-size: 2rem; color: #155724; margin-bottom: 1rem;"></i>
                    <h3 style="margin-bottom: 0.5rem;">Message Sent!</h3>
                    <p>Thank you for your message. I will get back to you soon.</p>
                `;
                
                contactForm.innerHTML = '';
                contactForm.appendChild(formSuccess);
                contactForm.classList.remove('fade-out');
                contactForm.classList.add('fade-in');
            }, 300);
        }
    });
}

// Helper function to add error message
function addErrorMessage(element, message) {
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    element.parentNode.appendChild(errorMessage);
}

// Helper function to validate email
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Add Wix-style floating decorative elements
function addFloatingElements() {
    // Create and append floating circles to various sections
    const sections = ['about', 'skills', 'certifications'];
    
    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
            // Create floating element
            const floatingEl = document.createElement('div');
            floatingEl.className = 'floating-element';
            floatingEl.style.position = 'absolute';
            floatingEl.style.width = (30 + Math.random() * 50) + 'px';
            floatingEl.style.height = floatingEl.style.width;
            floatingEl.style.backgroundColor = '#f0c05a';
            floatingEl.style.borderRadius = '50%';
            floatingEl.style.opacity = '0.15';
            floatingEl.style.zIndex = '0';
            
            // Randomize position
            floatingEl.style.top = (Math.random() * 70) + '%';
            floatingEl.style.left = (Math.random() * 80) + '%';
            
            // Add animation with random duration
            const animDuration = 5 + Math.random() * 10;
            floatingEl.style.animation = `float ${animDuration}s ease-in-out infinite`;
            floatingEl.style.animationDelay = (Math.random() * 5) + 's';
            
            section.appendChild(floatingEl);
        }
    });
}

// Initialize parallax effect for section backgrounds
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        // Apply parallax effect to hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPositionY = (scrollPosition * 0.4) + 'px';
        }
        
        // Apply subtle parallax to other sections
        const sections = document.querySelectorAll('.about, .experience, .education');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const distance = scrollPosition - sectionTop;
            
            if (Math.abs(distance) < window.innerHeight) {
                section.style.transform = `translateY(${distance * 0.05}px)`;
            }
        });
    });
}

// Skill categories hover effect
const skillCategories = document.querySelectorAll('.skills-category');
skillCategories.forEach(category => {
    category.addEventListener('mouseenter', () => {
        // Add subtle scale effect
        category.style.transform = 'translateY(-5px) scale(1.02)';
        
        // Change heading color
        const heading = category.querySelector('h3');
        if (heading) {
            heading.style.color = '#e0b347';
        }
    });
    
    category.addEventListener('mouseleave', () => {
        // Reset styles
        category.style.transform = '';
        
        const heading = category.querySelector('h3');
        if (heading) {
            heading.style.color = '';
        }
    });
});