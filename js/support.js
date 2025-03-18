// Support Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
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
    
    // Chat Widget functionality
    const chatTriggers = document.querySelectorAll('.open-chat, .chat-widget-trigger');
    
    chatTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            // This would typically open your chat widget
            // For demonstration, we'll just show an alert
            alert('Live chat support would open here. In a real implementation, this would connect to your support chat system.');
            
            // In a real implementation, you might do something like:
            // openChatWidget();
        });
    });
    
    // Contact Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // For demonstration purposes, we'll just show a success message
            alert('Thank you for your message! Our support team will contact you soon.');
            
            // In a real implementation, you would send the form data to your server
            // via AJAX or a similar method
            // submitFormToServer(formData);
            
            // Reset the form after successful submission
            contactForm.reset();
        });
    }
}); 