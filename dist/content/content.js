"use strict";
console.log("✅ Content script injecté");
//const btnDemarrer = document.querySelector(".card-filter");
//console.log("🔍 Bouton trouvé directement ?", btn1);
//const btnArreter = document.getElementById("daysoff_details");
//console.log("🔍 Bouton trouvé directement ?", btn2);
const btnDemarrer = document.getElementById("student_enter");
console.log("btnDemarrer :", btnDemarrer);
const btnArreter = document.getElementById("student_exit");
console.log("btnArreter :", btnArreter);
/*btn2?.addEventListener("click", () => {
  console.log("tu as cliqué");
  chrome.runtime.sendMessage({ command: "start" });
});*/
// const btnDemarrer = document.querySelector("#start_btn");
// const btnArreter = document.querySelector("#stop_btn");
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
