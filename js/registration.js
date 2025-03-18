// Registration Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Password strength checker
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const passwordStrengthText = passwordStrength.querySelector('span');
    const passwordMeterBar = document.getElementById('passwordMeterBar');
    const submitButton = document.querySelector('button[type="submit"]');
    
    // Function to check password strength
    function checkPasswordStrength(password) {
        // Initialize score
        let score = 0;
        
        // Empty password
        if (!password) {
            return {
                score: 0,
                feedback: 'Weak'
            };
        }
        
        // Award points for length
        if (password.length >= 8) score += 1;
        if (password.length >= 10) score += 1;
        if (password.length >= 12) score += 1;
        
        // Award points for complexity
        if (/[A-Z]/.test(password)) score += 1; // Uppercase letters
        if (/[a-z]/.test(password)) score += 1; // Lowercase letters
        if (/[0-9]/.test(password)) score += 1; // Numbers
        if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special characters
        
        // Determine strength based on score
        let strength, feedback;
        
        if (score < 3) {
            strength = 'weak';
            feedback = 'Weak';
        } else if (score < 5) {
            strength = 'medium';
            feedback = 'Medium';
        } else if (score < 7) {
            strength = 'strong';
            feedback = 'Strong';
        } else {
            strength = 'very-strong';
            feedback = 'Very Strong';
        }
        
        return {
            score: score,
            strength: strength,
            feedback: feedback
        };
    }
    
    // Update UI based on password strength
    function updatePasswordStrengthUI(result) {
        // Remove all classes
        passwordStrength.className = 'password-strength';
        passwordMeterBar.className = 'password-meter-bar';
        
        // Add appropriate class
        passwordStrength.classList.add(result.strength);
        passwordMeterBar.classList.add(result.strength);
        
        // Update text
        passwordStrengthText.textContent = result.feedback;
    }
    
    // Password input event listener
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const result = checkPasswordStrength(password);
            updatePasswordStrengthUI(result);
        });
    }
    
    // Form validation
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            // Check if passwords match
            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Passwords do not match!');
                return;
            }
            
            // Check password strength
            const result = checkPasswordStrength(password);
            if (result.score < 3) {
                e.preventDefault();
                alert('Your password is too weak. Please choose a stronger password.');
                return;
            }
            
            // Form is valid, proceed with submission
            console.log('Form is valid, proceeding with submission');
        });
    }
}); 