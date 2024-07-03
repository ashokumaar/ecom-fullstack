const passwordInput = document.getElementById('passworddd');
    const strengthMeter = document.getElementById('password-strength-meter');
    const submitButton = document.querySelector('form button');

    passwordInput.addEventListener('input', (event) => {
        const password = event.target.value;
        const strength = checkPasswordStrength(password);
        updateStrengthMeter(strength);
        // submitButton.disabled = !strength; // Enable submit only if strong
        if(strength>=4){
            submitButton.disabled = false;
        }
    });

    function checkPasswordStrength(password) {
        let score = 0;

        // Minimum length
        if (password.length >= 8) {
            score += 1;
        }

        // Uppercase letter
        if (/[A-Z]/.test(password)) {
            score += 1;
        }

        // Lowercase letter
        if (/[a-z]/.test(password)) {
            score += 1;
        }

        // Number
        if (/\d/.test(password)) {
            score += 1;
        }

        // Special character
        if (/[-_~!@#$%^&*()+={}]/.test(password)) {
            score += 1;
        }

        // Bonus for longer passwords
        if (password.length > 12) {
            score += 1;
        }

        return score;
    }

    function updateStrengthMeter(score) {
        strengthMeter.innerHTML = '';

        switch (score) {
            case 0:
                strengthMeter.textContent = 'Weak';
                strengthMeter.style.backgroundColor = 'red';
                break;
            case 1:
            case 2:
                strengthMeter.textContent = 'Moderate';
                strengthMeter.style.backgroundColor = 'orange';
                break;
            case 3:
            case 4:
                strengthMeter.textContent = 'Strong';
                strengthMeter.style.backgroundColor = 'yellow';
                break;
            default:
                strengthMeter.textContent = 'Very Strong';
                strengthMeter.style.backgroundColor = 'green';
        }
    }