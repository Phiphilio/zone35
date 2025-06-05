import {
  calculerDureeSession,
  sauvegarderDureeSession,
  reconstituerTempsDepuis,
  relancerMinuteur,
} from "../core/heure.js";
import { TimerSession, Time } from "../type/index.js";

let timerSession: TimerSession | null = null;
let time: Time = { hours: 0, minutes: 0, seconds: 0 };
let derniereDureeSession: Time = { hours: 0, minutes: 0, seconds: 0 };
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "start") {
    console.log("background dans start ");
    if (!timerSession) {
      // ✅ Sauvegarde du timestamp de début dans le storage
      chrome.storage.local.set({ sessionStart: Date.now() });

      time = { hours: 0, minutes: 0, seconds: 0 };
      timerSession = calculerDureeSession((time) => {
        derniereDureeSession = time;
        chrome.runtime.sendMessage({ command: "update", time });
      });
    }
  } else if (message.command === "stop") {
    console.log("background dans stop ");
    sauvegarderDureeSession(derniereDureeSession);

    // ✅ Supprime le timestamp enregistré
    chrome.storage.local.remove("sessionStart");

    if (timerSession) {
      timerSession.end();
      timerSession = null;
      sendResponse({ stopped: true });
    }
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("sessionStart", ({ sessionStart }) => {
    if (sessionStart) {
      const reconstitue = reconstituerTempsDepuis(sessionStart);
      timerSession = calculerDureeSession((time) => {
        derniereDureeSession = time;
        chrome.runtime.sendMessage({ command: "update", time });
      }, reconstitue);
    }
  });
});
