"use strict";
let intervalId = null;
let time = { hours: 0, minutes: 0, seconds: 0 };
function pad(n) {
    return n.toString().padStart(2, "0");
}
function afficherTemps() {
    const affichage = document.getElementById("affichage");
    affichage.innerText = `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
}
function calculerDureeSession(callback) {
    intervalId = setInterval(() => {
        time.seconds++;
        if (time.seconds === 60) {
            time.seconds = 0;
            time.minutes++;
        }
        if (time.minutes === 60) {
            time.minutes = 0;
            time.hours++;
        }
        callback(time);
    }, 1000);
}
function arreterSession() {
    clearInterval(intervalId);
    console.log("Session arrêtée");
}
document.getElementById("demarrer").addEventListener("click", () => {
    if (!intervalId) {
        time = { hours: 0, minutes: 0, seconds: 0 }; // reset
        calculerDureeSession(afficherTemps);
    }
});
document.getElementById("arreter").addEventListener("click", () => {
    arreterSession();
    intervalId = null;
});
