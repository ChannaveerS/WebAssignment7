document.addEventListener('DOMContentLoaded', () => {
    let intervalId; // Will be used with setInterval and clearInterval
    let seconds = 0;
    let isRunning = false;

    const timeDisplay = document.getElementById('time');
    const datePicker = document.getElementById('datePicker');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Set the date picker to today's date
    datePicker.valueAsDate = new Date();

    // Function that creates a Promise that resolves after a timeout
    function delay(ms) {
        // Here we are using a Promise
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to format and update the time display
    const updateTimeDisplay = () => {
        seconds++;
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secondsLeft = (seconds % 60).toString().padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${secondsLeft}`;
    };

    // Async function that will run the timer
    async function runTimer() {
        while (isRunning) {
            await delay(1000); // Await is used here with the Promise returned by delay
            updateTimeDisplay(); // Update the display after each delay
        }
    }

    // Start the timer using setInterval
    const startTimer = () => {
        if (!isRunning) {
            isRunning = true;
            startBtn.disabled = true;
            stopBtn.disabled = false;
            resetBtn.disabled = true;
            intervalId = setInterval(updateTimeDisplay, 1000); // setInterval is used here
            // Alternatively, you could start the async runTimer function here
            // runTimer();
        }
    };

    // Stop the timer using clearInterval
    const stopTimer = () => {
        if (isRunning) {
            clearInterval(intervalId); // clearInterval is used here
            isRunning = false;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            resetBtn.disabled = false;
        }
    };

    // Reset the timer
    const resetTimer = () => {
        if (!isRunning) {
            clearInterval(intervalId); // Ensuring the interval is cleared during reset
            seconds = 0;
            timeDisplay.textContent = '00:00:00';
            startBtn.disabled = false;
            stopBtn.disabled = true;
            resetBtn.disabled = true;
        }
    };

    // Event listeners for the buttons
    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
});
