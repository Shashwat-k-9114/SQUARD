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

// Helper function to sanitize text for email body
function sanitizeForEmail(text) {
    if (!text) return '';
    // Replace backticks with regular quotes
    return text.replace(/`/g, "'")
               .replace(/\\/g, '')
               .replace(/\r\n/g, '\n')
               .replace(/\r/g, '\n');
}

// Helper to format multi-line messages
function formatMessageForEmail(message) {
    if (!message) return '';
    const sanitized = sanitizeForEmail(message);
    return sanitized.split('\n').map(line => `│  ${line}`).join('\n');
}

// Contact Form Submission with mailto: formatting
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = sanitizeForEmail(formData.get('name'));
        const email = sanitizeForEmail(formData.get('email'));
        const phone = sanitizeForEmail(formData.get('phone'));
        const organization = sanitizeForEmail(formData.get('organization'));
        const service = sanitizeForEmail(formData.get('service'));
        const message = sanitizeForEmail(formData.get('message'));
        
        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Email...';
        }
        
        // Create formatted email content
        const emailSubject = `New Contact Form Submission: ${name} - Squard Talent`;
        
        // Professional formatted email body
        const beautifulBody = `
=============================================================
                   SQUARD TALENT
              Contact Form Submission
=============================================================

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
                     CONTACT DETAILS
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  ● Name:        ${name}
  ● Email:       ${email}
  ● Phone:       ${phone || 'Not provided'}
  ● Organization: ${organization || 'Not provided'}

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
                    SERVICE INTEREST
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  ● Service:     ${service || 'Not specified'}

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
                         MESSAGE
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
${message.split('\n').map(line => `  ${line}`).join('\n')}

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
                    SUBMISSION DETAILS
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  ● Date: ${new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}
  ● Time: ${new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}
  ● Source: Squard Talent Website Contact Form

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
Thank you for contacting Squard Talent.
Our team will respond to your inquiry within 24 hours.

Best regards,
The Squard Talent Team
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SQUARD TALENT | Healthcare Workforce & Telehealth Solutions
Website: https://squardtalent.com | Email: info@squardtalent.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

        // Alternative: Clean and simple version
        const cleanBody = `
╔═══════════════════════════════════════════════════════════════╗
║                SQUARD TALENT - CONTACT FORM                  ║
╚═══════════════════════════════════════════════════════════════╝

◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ CONTACT INFORMATION ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
• Name:        ${name}
• Email:       ${email}
• Phone:       ${phone || 'Not provided'}
• Organization: ${organization || 'Not provided'}

◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ SERVICE INTEREST ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
• Service:     ${service || 'Not specified'}

◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ MESSAGE ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
${message.split('\n').map(line => `  ${line}`).join('\n')}

◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼ SUBMISSION DETAILS ◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼
• Submitted: ${new Date().toLocaleString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}
• Via: Squard Talent Website Contact Form

════════════════════════════════════════════════════════════════
Thank you for contacting Squard Talent.
Our team will respond within 24 hours.

Best regards,
The Squard Talent Team
════════════════════════════════════════════════════════════════
Healthcare Workforce & Telehealth Solutions
info@squardtalent.com
════════════════════════════════════════════════════════════════
`;

        // Even cleaner version for maximum compatibility
        const compatibleBody = `
================================================================
                     SQUARD TALENT
                CONTACT FORM SUBMISSION
================================================================

CONTACT INFORMATION
----------------------------------------------------------------
Name:           ${name}
Email:          ${email}
Phone:          ${phone || 'Not provided'}
Organization:   ${organization || 'Not provided'}

SERVICE INTEREST
----------------------------------------------------------------
Service:        ${service || 'Not specified'}

MESSAGE
----------------------------------------------------------------
${message}

SUBMISSION DETAILS
----------------------------------------------------------------
Date & Time:    ${new Date().toLocaleString('en-US', { 
                   weekday: 'long', 
                   year: 'numeric', 
                   month: 'long', 
                   day: 'numeric',
                   hour: '2-digit',
                   minute: '2-digit'
                 })}
Submitted via:  Squard Talent Website Contact Form

================================================================
Thank you for contacting Squard Talent.
Our team will respond to your inquiry within 24 hours.

Best regards,
The Squard Talent Team
================================================================
SQUARD TALENT | Healthcare Workforce & Telehealth Solutions
================================================================
`;

        // Create mailto link with formatted content
        const mailtoLink = `mailto:kashyapshashwat77@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(compatibleBody)}`;
        
        // Open email client
        setTimeout(() => {
            window.location.href = mailtoLink;
            
            // Reset button after a delay
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                }
                
                // Show custom styled alert/modal
                showCustomAlert(`Thank you ${name}!`, 'Your message has been prepared. Please check your email client to review and send it.');
                
                // Reset form
                contactForm.reset();
            }, 2000);
        }, 500);
    });
}

// Custom alert function for better UX
function showCustomAlert(title, message) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 90%;
        text-align: center;
        border-top: 5px solid var(--primary-color, #1a6bb3);
        animation: slideUp 0.3s ease;
    `;
    
    // Add title
    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    titleEl.style.cssText = `
        color: var(--primary-color, #1a6bb3);
        margin-bottom: 15px;
        font-family: 'Montserrat', sans-serif;
    `;
    
    // Add message
    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        margin-bottom: 25px;
        line-height: 1.6;
        color: #333;
    `;
    
    // Add success icon
    const icon = document.createElement('div');
    icon.innerHTML = '<i class="fas fa-check-circle" style="font-size: 48px; color: #2ecc71; margin-bottom: 20px;"></i>';
    
    // Add OK button
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.style.cssText = `
        background-color: var(--primary-color, #1a6bb3);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 8px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
    `;
    
    okButton.onmouseover = () => {
        okButton.style.backgroundColor = 'var(--primary-dark, #0d4a80)';
        okButton.style.transform = 'translateY(-2px)';
    };
    
    okButton.onmouseout = () => {
        okButton.style.backgroundColor = 'var(--primary-color, #1a6bb3)';
        okButton.style.transform = 'translateY(0)';
    };
    
    okButton.onclick = () => {
        modal.remove();
    };
    
    // Assemble modal
    modalContent.appendChild(icon);
    modalContent.appendChild(titleEl);
    modalContent.appendChild(messageEl);
    modalContent.appendChild(okButton);
    modal.appendChild(modalContent);
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(20px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Auto-close after 8 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
        }
    }, 8000);
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