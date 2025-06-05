import { calculerDureeSession, sauvegarderDureeSession, reconstituerTempsDepuis, } from "../core/heure.js";
let timerSession = null;
let time = { hours: 0, minutes: 0, seconds: 0 };
let derniereDureeSession = { hours: 0, minutes: 0, seconds: 0 };
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
    }
    else if (message.command === "stop") {
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
    console.log("redemarrage de l'extension");
    chrome.storage.local.get("sessionStart", ({ sessionStart }) => {
        console.log("sessionStart :", sessionStart);
        if (sessionStart) {
            const reconstitue = reconstituerTempsDepuis(sessionStart);
            console.log("reconstitue :", reconstitue);
            timerSession = calculerDureeSession((time) => {
                derniereDureeSession = time;
                chrome.runtime.sendMessage({ command: "update", time });
            }, reconstitue);
        }
    });
});
chrome.alarms.create("veilleCheck", {
    periodInMinutes: 1,
});
let derniereAlarm = Date.now();
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "veilleCheck") {
        const maintenant = Date.now();
        const ecart = maintenant - derniereAlarm;
        derniereAlarm = maintenant;
        // Si l'écart est trop grand, on suppose un réveil
        if (ecart > 2 * 60 * 1000) {
            // plus de 2 minutes = probable réveil
            console.log("Probable sortie de veille détectée");
            chrome.storage.local.get("sessionStart", ({ sessionStart }) => {
                if (sessionStart) {
                    const reconstitue = reconstituerTempsDepuis(sessionStart);
                    console.log("Recalcul après réveil :", reconstitue);
                    if (timerSession) {
                        timerSession.end();
                    }
                    timerSession = calculerDureeSession((time) => {
                        derniereDureeSession = time;
                        chrome.runtime.sendMessage({ command: "update", time });
                    }, reconstitue);
                }
            });
        }
    }
});
