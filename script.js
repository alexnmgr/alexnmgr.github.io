// CLOCK **********************************
/*
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
info: {
    color: "green"
},
warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
},
alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
}
};

const TIME_LIMIT = 60*20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("timer1").innerHTML = `
<div class="base-timer">
<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
    <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
        M 50, 50
        m -45, 0
        a 45,45 0 1,0 90,0
        a 45,45 0 1,0 -90,0
        "
    ></path>
    </g>
</svg>
<span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
)}</span>
</div>
`;

startTimer();

function onTimesUp() {
clearInterval(timerInterval);
}

function startTimer() {
timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
    timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
    onTimesUp();
    }
}, 1000);
}

function formatTime(time) {
const minutes = Math.floor(time / 60);
let seconds = time % 60;

if (seconds < 10) {
    seconds = `0${seconds}`;
}

return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
const { alert, warning, info } = COLOR_CODES;
if (timeLeft <= alert.threshold) {
    document
    .getElementById("base-timer-path-remaining")
    .classList.remove(warning.color);
    document
    .getElementById("base-timer-path-remaining")
    .classList.add(alert.color);
} else if (timeLeft <= warning.threshold) {
    document
    .getElementById("base-timer-path-remaining")
    .classList.remove(info.color);
    document
    .getElementById("base-timer-path-remaining")
    .classList.add(warning.color);
}
}

function calculateTimeFraction() {
const rawTimeFraction = timeLeft / TIME_LIMIT;
return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
).toFixed(0)} 283`;
document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
*/
// MQTT ******************************************************

const client = mqtt.connect('wss://test.mosquitto.org:8081'); // connect to MQTT brocker via WebSocket

// Send message function
function playAudio(computerId) {
    const message = `play_audio_${computerId}`; // Message for playing audio 
    client.publish('hsf/audio/control', message); // Sending message to specified topic
}

// Play all audio function
function playAllAudio() {
    playAudio(1);
    playAudio(2);
    playAudio(3);
}

// Assign events to buttons
document.getElementById('raum1btn').addEventListener('click', () => playAudio(1));
document.getElementById('raum2btn').addEventListener('click', () => playAudio(2));
document.getElementById('raum3btn').addEventListener('click', () => playAudio(3));

// Assign events to other buttons
document.getElementById('alleRaumbtn').addEventListener('click', () => playAllAudio());

