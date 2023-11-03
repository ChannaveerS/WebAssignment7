$(document).ready(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@northeastern\.edu$/;
    const specialCharRegex = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    const usernameRegex = /^[a-zA-Z]+$/;

    const validateField = (selector, message, condition) => {
        const field = $(selector);
        const errorMessage = field.next('.error-message');
        if (condition) {
            errorMessage.text(message).css('color', 'red');
            return false;
        } else {
            errorMessage.text('');
            return true;
        }
    };

    const validateForm = () => {
        let isValid = true;
        const email = $('#email').val();
        const username = $('#username').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();

        isValid = isValid && validateField('#email', 'Email is required', !email);
        isValid = isValid && validateField('#email', 'Invalid northeastern email address', !emailRegex.test(email));
        isValid = isValid && validateField('#username', 'User Name is required', !username);
        isValid = isValid && validateField('#username', 'User Name should not contain special characters or numbers', !usernameRegex.test(username));
        // isValid = isValid && validateField('#username', 'User Name should be between 3 and 16 characters', username.length < 3 || username.length > 16);
        isValid = isValid && validateField('#password', 'Password is required', !password);
        isValid = isValid && validateField('#password', 'Password should be between 8 and 16 characters', password.length < 8 || password.length > 16);
        isValid = isValid && validateField('#confirmPassword', 'Confirm Password is required', !confirmPassword);
        isValid = isValid && validateField('#confirmPassword', 'Passwords do not match', password !== confirmPassword);

        $('#loginBtn').prop('disabled', !isValid);
    };

    $('input').on('input', validateForm);
    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
        const username = $('#username').val();
        window.location.href = `calculator.html?username=${username}`;
    });
});
