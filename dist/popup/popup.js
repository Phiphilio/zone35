import { pad } from "../core/heure";
const affichage = document.getElementById("affichage");
const btnDemarrer = document.getElementById("demarrer");
const btnArreter = document.getElementById("arreter");
btnDemarrer === null || btnDemarrer === void 0 ? void 0 : btnDemarrer.addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "start" });
});
if (btnArreter && affichage) {
    btnArreter.addEventListener("click", () => {
        chrome.runtime.sendMessage({ command: "stop" }, (response) => {
            if (response === null || response === void 0 ? void 0 : response.stopped) {
                affichage.innerText = "00:00:00";
            }
        });
    });
}
if (affichage) {
    chrome.runtime.onMessage.addListener((message) => {
        if (message.command === "update" && message.time) {
            const time = message.time;
            affichage.innerText = `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
        }
    });
}
