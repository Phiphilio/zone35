console.log("✅ Content script injecté");

const btnDemarrer = document.querySelector(".card-filter");
//console.log("🔍 Bouton trouvé directement ?", btn1);

const btnArreter = document.getElementById("daysoff_details");
//console.log("🔍 Bouton trouvé directement ?", btn2);

/*btn2?.addEventListener("click", () => {
  console.log("tu as cliqué");
  chrome.runtime.sendMessage({ command: "start" });
});*/

// const btnDemarrer = document.querySelector("#start_btn");
// const btnArreter = document.querySelector("#stop_btn");

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
