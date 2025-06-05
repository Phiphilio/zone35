import { pad, recupererDureeTotale, reinitialiserDureeTotale, } from "../core/heure.js";
const affichage = document.getElementById("affichage");
const tempsEnMemoire = document.getElementById("tempsEnMemoire");
const btnDemarrer = document.getElementById("demarrer");
const btnArreter = document.getElementById("arreter");
const btnReset = document.getElementById("btnReset");
btnDemarrer === null || btnDemarrer === void 0 ? void 0 : btnDemarrer.addEventListener("click", () => {
    console.log("le bouton démarrer a été cliqué  ");
    chrome.runtime.sendMessage({ command: "start" });
});
if (btnArreter && affichage) {
    btnArreter.addEventListener("click", () => {
        console.log("le bouton arreter a été cliqué  ");
        chrome.runtime.sendMessage({ command: "stop" }, (response) => {
            if (response === null || response === void 0 ? void 0 : response.stopped) {
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
            affichage.innerText = `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
        }
    });
}
if (tempsEnMemoire) {
    recupererDureeTotale()
        .then((dureeTime) => {
        console.log("Durée récupérée :", dureeTime);
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
