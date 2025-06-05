"use strict";
console.log("✅ Content script injecté");
const btnDemarrer = document.getElementById("student_enter");
console.log("btnDemarrer :", btnDemarrer);
const btnArreter = document.getElementById("student_exit");
console.log("btnArreter :", btnArreter);
btnDemarrer === null || btnDemarrer === void 0 ? void 0 : btnDemarrer.addEventListener("click", () => {
    console.log("Le bouton démarrer a été cliqué");
    chrome.runtime.sendMessage({ command: "start" });
});
btnArreter === null || btnArreter === void 0 ? void 0 : btnArreter.addEventListener("click", () => {
    console.log("Le bouton arrêter a été cliqué");
    chrome.runtime.sendMessage({ command: "stop" }, (response) => {
        if (response === null || response === void 0 ? void 0 : response.stopped) {
            console.log("Arrêt confirmé");
        }
    });
});
