let timer;
let [hours, minutes, seconds] = [0, 0, 0];
let isRunning = false;
let countdownMode = false;
const display = document.getElementById("display");
const alertBox = document.getElementById("alert");
const alertButton = document.getElementById("alertButton");
const alertText = document.getElementById("alertText");

// Add this at the top of your script to initialize the audio
const alarmSound = new Audio('alarm.mp3');

function updateDisplay() {
  display.textContent = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  display.style.transform = "scale(1.1)";
  setTimeout(() => {
    display.style.transform = "scale(1)";
  }, 300);
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    if (countdownMode) {
      timer = setInterval(() => {
        if (seconds === 0 && minutes === 0 && hours === 0) {
          clearInterval(timer);
          isRunning = false;
    // Play sound when timer ends
          alertText.textContent = "¡Time's Up!";
          alertBox.style.display = "flex"; // Use flex to ensure centering
          return;
        }
        // Play sound when timer reaches 2 seconds
        if (seconds === 5 && minutes === 0 && hours === 0) {
          alarmSound.play();
        }
        if (seconds === 0) {
          seconds = 59;
          if (minutes === 0) {
            minutes = 59;
            if (hours > 0) {
              hours--;
            }
          } else {
            minutes--;
          }
        } else {
          seconds--;
        }
        updateDisplay();
      }, 1000);
    } else {
      timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
        updateDisplay();
      }, 1000);
    }
  }
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  [hours, minutes, seconds] = [0, 0, 0];
  isRunning = false;
  countdownMode = false; // Reset countdown mode
  alertText.textContent = "Start Test"; // Reset alert message
  alertBox.style.display = "none"; // Hide alert
  updateDisplay();
}

function setCountdown() {
  hours = parseInt(document.getElementById("hours").value) || 0;
  minutes = parseInt(document.getElementById("minutes").value) || 0;
  seconds = parseInt(document.getElementById("seconds").value) || 0;
  countdownMode = true;
  updateDisplay();
}

document.getElementById("start").addEventListener("click", () => {
  if (countdownMode && (hours > 0 || minutes > 0 || seconds > 0)) {
    startTimer();
  } else if (!countdownMode) {
    startTimer();
  }
});

document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("countdown").addEventListener("click", () => {
  setCountdown();
  startTimer();
});

alertButton.addEventListener("click", () => {
  alertBox.style.display = "none";
  resetTimer(); // Reset the timer when alert is dismissed
});

document.getElementById("resume").addEventListener("click", () => {
    if (!isRunning) {
        startTimer();
    }
});

// Initialize the display
updateDisplay();

// Add event listener for Enter key press
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { // Check if the Enter key was pressed
    if (countdownMode && (hours > 0 || minutes > 0 || seconds > 0)) {
      startTimer(); // Ensure this function is correctly defined and accessible
    }
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------



