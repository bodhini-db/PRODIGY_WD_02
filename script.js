let timer;
let isRunning = false;
let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;
let lapCounter = 1;

function startStopwatch() {
    if (!isRunning) {
        timer = setInterval(updateStopwatch, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCounter = 1;
    updateDisplay();
    clearLapList();
}

function recordLap() {
    const lapTime = getFormattedTime();
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${lapCounter}: ${lapTime}`;
    document.getElementById('lapList').appendChild(lapItem);
    lapCounter++;
}

function updateStopwatch() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').innerText = getFormattedTime();
}

function getFormattedTime() {
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + ':' + padMilliseconds(milliseconds);
}

function clearLapList() {
    const lapList = document.getElementById('lapList');
    while (lapList.firstChild) {
        lapList.removeChild(lapList.firstChild);
    }
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function padMilliseconds(value) {
    if (value < 10) {
        return '00' + value;
    } else if (value < 100) {
        return '0' + value;
    } else {
        return value;
    }
}
