// Support Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // File input customization
    const fileInput = document.getElementById('attachment');
    const fileLabel = document.querySelector('.file-label');
    
    if (fileInput && fileLabel) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                const fileName = this.files[0].name;
                // Truncate filename if too long
                const displayName = fileName.length > 20 ? fileName.substring(0, 17) + '...' : fileName;
                fileLabel.innerHTML = `<i class="fas fa-file"></i> ${displayName}`;
            } else {
                fileLabel.innerHTML = `<i class="fas fa-upload"></i> Choose File`;
            }
        });
    }

    // Animate contact methods on page load
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach((method, index) => {
        setTimeout(() => {
            method.style.opacity = '0';
            method.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                method.style.transition = 'all 0.8s ease';
                method.style.opacity = '1';
                method.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });

    // Form container animation on scroll
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        window.addEventListener('scroll', function() {
            const formContainerPosition = formContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (formContainerPosition.top < windowHeight * 0.75) {
                formContainer.classList.add('form-visible');
            }
        });
    }
    
    // Form input animations
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.parentElement.classList.remove('input-focused');
            }
        });
    });
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle current item
            item.classList.toggle('active');
            
            // Close other items (optional, for accordion behavior)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Contact Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Add animated labels
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Check if input has value on load (e.g. if form is pre-filled)
                if (input.value.trim() !== '') {
                    group.classList.add('input-focused');
                }
                
                // Add focus effect when input receives focus
                input.addEventListener('focus', () => {
                    group.classList.add('input-focused');
                });
                
                // Remove focus effect when input loses focus, but only if it's empty
                input.addEventListener('blur', () => {
                    if (input.value.trim() === '') {
                        group.classList.remove('input-focused');
                    }
                });
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state to button
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill out all required fields.', 'error');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                return;
            }
            
            // Simulate form submission with a delay
            setTimeout(() => {
                showNotification('Thank you for your message! Our support team will contact you soon.', 'success');
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
                
                // Reset the form after successful submission
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    
                    // Reset any focused states
                    formGroups.forEach(group => {
                        group.classList.remove('input-focused');
                    });
                }, 2000);
            }, 1500);
        });
    }
    
    // Chat widget functionality
    const chatTrigger = document.querySelector('.chat-widget-trigger');
    const openChatButtons = document.querySelectorAll('.open-chat');
    
    if (chatTrigger) {
        chatTrigger.addEventListener('click', function() {
            openChatWidget();
        });
    }
    
    if (openChatButtons.length > 0) {
        openChatButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openChatWidget();
            });
        });
    }
    
    function openChatWidget() {
        // In a real implementation, this would open your chat widget
        window.open('https://wacucoun.com/ysPW8S7r', '_blank');
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        notification.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Animate out after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            
            // Remove from DOM after animation
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
}); 