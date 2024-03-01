//chronomètre
let timerElement = document.getElementById('timer');
let startTime;
let elapsedTime = 0;
let timerInterval;

function formatTime(time) {
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function updateTimer() {
    let currentTime = Math.floor((Date.now() - startTime) / 1000) + elapsedTime;
    timerElement.textContent = formatTime(currentTime);
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000); // Mise à jour du chronomètre toutes les secondes
}

function stopTimer() {
    clearInterval(timerInterval);
    elapsedTime += Math.floor((Date.now() - startTime) / 1000);
    elapsedTime = formatTime(elapsedTime);
}