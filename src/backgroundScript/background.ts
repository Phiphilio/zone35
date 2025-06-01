import { calculerDureeSession } from "../core/heure";
import { TimerSession } from "../type/index";

let timerSession: TimerSession | null = null;
let time = { hours: 0, minutes: 0, seconds: 0 };

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "start") {
    if (!timerSession) {
      time = { hours: 0, minutes: 0, seconds: 0 };
      timerSession = calculerDureeSession((time) => {
        chrome.runtime.sendMessage({ command: "update", time });
      });
    }
  } else if (message.command === "stop") {
    if (timerSession) {
      timerSession.end();
      timerSession = null;
      sendResponse({ stopped: true });
    }
  }
});
