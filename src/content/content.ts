console.log("✅ Content script injecté");

const btnDemarrer = document.getElementById("student_enter");
console.log("btnDemarrer :", btnDemarrer);

const btnArreter = document.getElementById("student_exit");
console.log("btnArreter :", btnArreter);

btnDemarrer?.addEventListener("click", () => {
  console.log("Le bouton démarrer a été cliqué");
  chrome.runtime.sendMessage({ command: "start" });
});

btnArreter?.addEventListener("click", () => {
  console.log("Le bouton arrêter a été cliqué");
  chrome.runtime.sendMessage({ command: "stop" }, (response) => {
    if (response?.stopped) {
      console.log("Arrêt confirmé");
    }
  });
});
