import {
  pad,
  recupererDureeTotale,
  reinitialiserDureeTotale,
  secondToPercent,
} from "../core/heure.js";

const affichage = document.getElementById("affichage");
const tempsEnMemoire = document.getElementById("tempsEnMemoire");
const btnDemarrer = document.getElementById("demarrer");
const btnArreter = document.getElementById("arreter");
const btnReset = document.getElementById("btnReset");
const pourcentage = document.getElementById("pourcentage");
const innerProgressBar = document.getElementById("innerProgressBar");
const hourInCircle = document.getElementById("hourInCircle");
const lowerProgressZone = document.getElementById("lowerProgressZone");

btnDemarrer?.addEventListener("click", () => {
  console.log("le bouton démarrer a été cliqué  ");
  chrome.runtime.sendMessage({ command: "start" });
});

if (btnArreter && affichage) {
  btnArreter.addEventListener("click", () => {
    console.log("le bouton arreter a été cliqué  ");
    chrome.runtime.sendMessage({ command: "stop" }, (response) => {
      if (response?.stopped) {
        // affichage.innerText = "00:00:00";
        console.log("arret");
      }
    });
  });
}

if (affichage) {
  chrome.runtime.onMessage.addListener((message) => {
    console.log("On est dans l'update ");
    if (message.command === "update" && message.time) {
      const time = message.time;
      affichage.innerText = `${pad(time.hours)}:${pad(time.minutes)}:${pad(
        time.seconds
      )}`;
    }
  });
}

if (tempsEnMemoire) {
  recupererDureeTotale()
    .then((dureeTime) => {
      console.log("Durée récupérée :", dureeTime);

      let p = Math.round(secondToPercent(dureeTime));
      if (pourcentage) {
        pourcentage.innerHTML = String(p);
      }

      if (innerProgressBar) {
        const largeur = (p * 238) / 100;
        innerProgressBar.style.width = `${largeur}px`;
        //innerProgressBar.style.width = "190px";

        // gestion de l'étoile
        /* if (
          lowerProgressZone &&
          lowerProgressZone.parentNode &&
          largeur === 298
        ) {
          const img = document.createElement("img");
          img.id = "star";
          img.src = "../assets/star.png";
          img.alt = "une étoile";

          lowerProgressZone.parentNode.replaceChild(img, lowerProgressZone);
        }*/
      }

      if (hourInCircle) {
        hourInCircle.innerText = pad(dureeTime.hours);
      }
      tempsEnMemoire.textContent = `${dureeTime.hours
        .toString()
        .padStart(2, "0")}:${dureeTime.minutes
        .toString()
        .padStart(2, "0")}:${dureeTime.seconds.toString().padStart(2, "0")}`;
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération :", error);
    });
}

if (btnReset) {
  btnReset.addEventListener("click", () => {
    reinitialiserDureeTotale()
      .then(() => {
        alert("vos heures ont été réinitialisée.");
      })
      .catch((err) => {
        console.error("Erreur lors de la réinitialisation :", err);
      });
  });
}
