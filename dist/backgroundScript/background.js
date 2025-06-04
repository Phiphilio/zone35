import { calculerDureeSession, sauvegarderDureeSession, } from "../core/heure.js";
let timerSession = null;
let time = { hours: 0, minutes: 0, seconds: 0 };
let derniereDureeSession = { hours: 0, minutes: 0, seconds: 0 };
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "start") {
        console.log("background dans start ");
        if (!timerSession) {
            time = { hours: 0, minutes: 0, seconds: 0 };
            timerSession = calculerDureeSession((time) => {
                derniereDureeSession = time;
                chrome.runtime.sendMessage({ command: "update", time });
            });
        }
    }
    else if (message.command === "stop") {
        sauvegarderDureeSession(derniereDureeSession);
        console.log("background dans start ");
        if (timerSession) {
            timerSession.end();
            timerSession = null;
            sendResponse({ stopped: true });
        }
    }
});
