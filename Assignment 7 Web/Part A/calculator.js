$(document).ready(() => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    $('#username').text(username);

    const validateField = (selector, message, condition) => {
        const field = $(selector);
        const errorMessage = field.next('.error-message');
        if (condition) {
            errorMessage.text(message);
            return false;
        } else {
            errorMessage.text('');
            return true;
        }
    };

    const validateNumber = (num) => !isNaN(num) && isFinite(num);

    const calculate = (operation) => {
        const num1 = $('#num1').val();
        const num2 = $('#num2').val();

        let isValid = true;
        isValid = isValid && validateField('#num1', 'This field is required', !num1);
        isValid = isValid && validateField('#num1', 'Invalid number', !validateNumber(num1));
        isValid = isValid && validateField('#num2', 'This field is required', !num2);
        isValid = isValid && validateField('#num2', 'Invalid number', !validateNumber(num2));

        if (!isValid) return;

        let result;
        switch (operation) {
            case 'add':
                result = parseFloat(num1) + parseFloat(num2);
                break;
            case 'subtract':
                result = parseFloat(num1) - parseFloat(num2);
                break;
            case 'multiply':
                result = parseFloat(num1) * parseFloat(num2);
                break;
            case 'divide':
                if (parseFloat(num2) === 0) {
                    $('#result').val('Cannot divide by zero');
                    return;
                }
                result = parseFloat(num1) / parseFloat(num2);
                break;
            default:
                $('#result').val('Invalid operation');
                return;
        }

        $('#result').val(result.toFixed(2));
    };

    $('#addBtn').click(() => calculate('add'));
    $('#subtractBtn').click(() => calculate('subtract'));
    $('#multiplyBtn').click(() => calculate('multiply'));
    $('#divideBtn').click(() => calculate('divide'));
});
