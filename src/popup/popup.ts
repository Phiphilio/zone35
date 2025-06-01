import { calculerDureeSession, arreterSession, pad } from "../core/heure";

let intervalId: null = null;
let time = { hours: 0, minutes: 0, seconds: 0 };

let stop: () => void;

function afficherTemps() {
  const affichage = document.getElementById("affichage");
  if (affichage) {
    affichage.innerText = `${pad(time.hours)}:${pad(time.minutes)}:${pad(
      time.seconds
    )}`;
  }
}

//on récupère puis vérifie
const btnDemarrer = document.getElementById("demarrer");
if (btnDemarrer) {
  btnDemarrer.addEventListener("click", () => {
    if (!intervalId) {
      time = { hours: 0, minutes: 0, seconds: 0 }; // reset
      stop = calculerDureeSession(afficherTemps);
    }
  });
}

const btnArreter = document.getElementById("arreter");
if (btnArreter) {
  btnArreter.addEventListener("click", () => {
    arreterSession(stop);
    intervalId = null;
  });
}
