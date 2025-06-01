import { calculerDureeSession, arreterSession, pad } from "../core/heure";

let intervalId: null = null;
let time = { hours: 0, minutes: 0, seconds: 0 };

function afficherTemps() {
  const affichage = document.getElementById("affichage");
  if (affichage) {
    affichage.innerText = `${pad(time.hours)}:${pad(time.minutes)}:${pad(
      time.seconds
    )}`;
  }
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
