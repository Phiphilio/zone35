import { Time } from "type/index";

export let tempsAffiche: Time = { hours: 0, minutes: 0, seconds: 0 };

export function calculerDureeSession(callback: (time: Time) => void) {
  let time: Time = { hours: 0, minutes: 0, seconds: 0 };

  const interval = setInterval(() => {
    time.seconds++;

    // synchronisation avec les valeurs qui seront affichées
    tempsAffiche.seconds = time.seconds;
    tempsAffiche.minutes = time.minutes;
    tempsAffiche.hours = time.hours;

    if (time.seconds === 60) {
      time.seconds = 0;
      time.minutes++;
    }

    if (time.minutes === 60) {
      time.minutes = 0;
      time.hours++;
    }

    callback(time); // renvoie le temps mis à jour à chaque seconde
  }, 1000);

  const end = () => clearInterval(interval); // fonction pour stopper le minuteur

  return end;
}

export function arreterSession(arreter: () => void) {
  arreter();
  // console.log("ce que contient callback :", callback);
  console.log("fin de session/ dans arreter session");
}

// Convertir un objet Time en secondes totales
function timeToSeconds(time: Time): number {
  return time.hours * 3600 + time.minutes * 60 + time.seconds;
}

// Convertir un nombre de secondes en objet Time
function secondsToTime(totalSeconds: number): Time {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

function sauvegarderDureeSession(nouvelleDuree: Time): Promise<void> {
  return new Promise((resolve, reject) => {
    // On récupère la durée stockée (en secondes)
    chrome.storage.local.get(["dureeTotale"], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }

      const dureeStockeeSec: number = result.dureeTotale ?? 0;
      const nouvelleDureeSec = timeToSeconds(nouvelleDuree);
      const sommeDuree = dureeStockeeSec + nouvelleDureeSec;

      // On stocke la somme mise à jour
      chrome.storage.local.set({ dureeTotale: sommeDuree }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        resolve();
      });
    });
  });
}
