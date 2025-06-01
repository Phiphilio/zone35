import { pad } from "../core/heure";

const affichage = document.getElementById("affichage");
const btnDemarrer = document.getElementById("demarrer");
const btnArreter = document.getElementById("arreter");

btnDemarrer?.addEventListener("click", () => {
  console.log("le bouton démarrer a été cliqué  ");
  chrome.runtime.sendMessage({ command: "start" });
});

if (btnArreter && affichage) {
  btnArreter.addEventListener("click", () => {
    console.log("le bouton arreter a été cliqué  ");
    chrome.runtime.sendMessage({ command: "stop" }, (response) => {
      if (response?.stopped) {
        affichage.innerText = "00:00:00";
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
