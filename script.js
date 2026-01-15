// script.js

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Set current year in footer
const currentYear = document.getElementById('currentYear');
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Contact Form Submission with mailto: formatting
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const organization = formData.get('organization');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Email...';
        }
        
        // Create formatted email content
        const emailSubject = `New Contact Form Submission from ${name}`;
        
        // Plain text version (for mailto body)
        const plainTextBody = `
New Contact Form Submission - Squard Talent Website
===================================================

CONTACT DETAILS:
----------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Organization: ${organization || 'Not provided'}

SERVICE INTEREST:
-----------------
Service Interested In: ${service || 'Not specified'}

MESSAGE:
--------
${message}

---
Submitted via Squard Talent Website
Date: ${new Date().toLocaleString()}
`;

        // Create mailto link with formatted content
        const mailtoLink = `mailto:kashyapshashwat77@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(plainTextBody)}`;
        
        // Open email client
        setTimeout(() => {
            window.location.href = mailtoLink;
            
            // Reset button after a delay
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                }
                
                // Show success message
                alert(`Thank you ${name}! Your message has been prepared. Please check your email client to review and send it.`);
                
                // Reset form
                contactForm.reset();
            }, 2000);
        }, 500);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current section in navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Service cards expand/collapse functionality
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    const serviceDetails = card.querySelector('.service-details');
    if (serviceDetails) {
        // Initially hide details on mobile
        if (window.innerWidth <= 768) {
            serviceDetails.style.display = 'none';
            
            // Add a toggle button
            const toggleButton = document.createElement('button');
            toggleButton.className = 'btn-toggle';
            toggleButton.innerHTML = 'View Details <i class="fas fa-chevron-down"></i>';
            toggleButton.style.cssText = `
                background: none;
                border: none;
                color: var(--primary-color);
                font-weight: 600;
                font-size: 0.9rem;
                cursor: pointer;
                margin-top: 15px;
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 0;
            `;
            
            card.querySelector('.service-desc').parentNode.insertBefore(toggleButton, serviceDetails);
            
            toggleButton.addEventListener('click', () => {
                if (serviceDetails.style.display === 'none') {
                    serviceDetails.style.display = 'block';
                    toggleButton.innerHTML = 'Hide Details <i class="fas fa-chevron-up"></i>';
                } else {
                    serviceDetails.style.display = 'none';
                    toggleButton.innerHTML = 'View Details <i class="fas fa-chevron-down"></i>';
                }
            });
        }
    }
});

// Update service cards on window resize
window.addEventListener('resize', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const serviceDetails = card.querySelector('.service-details');
        const toggleButton = card.querySelector('.btn-toggle');
        
        if (serviceDetails) {
            if (window.innerWidth <= 768) {
                if (!toggleButton) {
                    serviceDetails.style.display = 'none';
                    
                    // Add toggle button if it doesn't exist
                    const newToggleButton = document.createElement('button');
                    newToggleButton.className = 'btn-toggle';
                    newToggleButton.innerHTML = 'View Details <i class="fas fa-chevron-down"></i>';
                    newToggleButton.style.cssText = `
                        background: none;
                        border: none;
                        color: var(--primary-color);
                        font-weight: 600;
                        font-size: 0.9rem;
                        cursor: pointer;
                        margin-top: 15px;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        padding: 0;
                    `;
                    
                    card.querySelector('.service-desc').parentNode.insertBefore(newToggleButton, serviceDetails);
                    
                    newToggleButton.addEventListener('click', () => {
                        if (serviceDetails.style.display === 'none') {
                            serviceDetails.style.display = 'block';
                            newToggleButton.innerHTML = 'Hide Details <i class="fas fa-chevron-up"></i>';
                        } else {
                            serviceDetails.style.display = 'none';
                            newToggleButton.innerHTML = 'View Details <i class="fas fa-chevron-down"></i>';
                        }
                    });
                }
            } else {
                // On larger screens, show details and remove toggle button
                serviceDetails.style.display = 'block';
                if (toggleButton) {
                    toggleButton.remove();
                }
            }
        }
    });
});

// Contact Form Status Messages (for fallback)
function showFormMessage(type, message) {
    const formMessages = document.getElementById('formMessages');
    if (!formMessages) return;
    
    formMessages.innerHTML = `
        <div class="form-message ${type}">
            ${message}
        </div>
    `;
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        formMessages.innerHTML = '';
    }, 5000);
}

// Check for URL parameters and show messages
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'success') {
        showFormMessage('success', 'Thank you! Your message has been sent successfully. We will contact you soon.');
    } else if (status === 'error') {
        showFormMessage('error', 'Sorry, there was an error sending your message. Please try again or contact us directly.');
    }
});