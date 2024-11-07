const currentTime = document.querySelector('h1');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const alarmHoursInput = document.getElementById('alarmHours');
const alarmMinutesInput = document.getElementById('alarmMinutes');
let alarmTime = null, isAlarmSet = false;
const ringtone = new Audio("ringtone.mp3"); // Ensure this file is in the correct path

// Enable ringtone looping
ringtone.loop = true;

// Update the current time every second
setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h === 0 ? 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    // Check if the current time matches the alarm time
    if (alarmTime && new Date().getTime() >= alarmTime) {
        ringtone.play(); // Start ringtone when alarm is triggered
    }
}, 1000);

// Set and clear the alarm
function setAlarm() {
    const hours = parseInt(alarmHoursInput.value) || 0;
    const minutes = parseInt(alarmMinutesInput.value) || 0;

    if (hours < 0 || minutes < 0) {
        return alert("Please enter a valid number of hours and minutes.");
    }

    if (isAlarmSet) {
        clearAlarm(); // Clears the alarm manually and stops ringtone
        return;
    }

    // Set the alarm time in the future
    const totalMilliseconds = (hours * 60 + minutes) * 60000; // Convert hours and minutes to milliseconds
    alarmTime = new Date().getTime() + totalMilliseconds;
    isAlarmSet = true;
    setAlarmBtn.innerText = "Clear Alarm";
}

function clearAlarm() {
    alarmTime = null;
    ringtone.pause(); // Pause the ringtone manually
    ringtone.currentTime = 0; // Reset the audio file
    isAlarmSet = false;
    setAlarmBtn.innerText = "Set Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);

