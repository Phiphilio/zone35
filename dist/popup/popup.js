import { calculerDureeSession, arreterSession } from "../core/heure";
let intervalId = null;
let time = { hours: 0, minutes: 0, seconds: 0 };
function pad(n) {
    return n.toString().padStart(2, "0");
}
function afficherTemps() {
    const affichage = document.getElementById("affichage");
    affichage.innerText = `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
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
