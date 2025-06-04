import { Time } from "type/index";

export let tempsAffiche: Time = { hours: 0, minutes: 0, seconds: 0 };

export function calculerDureeSession(callback: (time: Time) => void) {
  let time: Time = { hours: 0, minutes: 0, seconds: 0 };

  const intervalId = setInterval(() => {
    time.seconds++;
    if (time.seconds === 60) {
      time.seconds = 0;
      time.minutes++;
    }
    if (time.minutes === 60) {
      time.minutes = 0;
      time.hours++;
    }
    callback(time);
  }, 1000);

  return {
    id: intervalId,
    end: () => clearInterval(intervalId),
  };
}

export function arreterSession(arreter: () => void) {
  arreter();
  // console.log("ce que contient callback :", callback);
  console.log("fin de session/ dans arreter session");
}

// mettre au format 00
export function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
// Convertir un objet Time en secondes totales
export function timeToSeconds(time: Time): number {
  return time.hours * 3600 + time.minutes * 60 + time.seconds;
}

// Convertir un nombre de secondes en objet Time
export function secondsToTime(totalSeconds: number): Time {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

export function sauvegarderDureeSession(nouvelleDuree: Time): Promise<void> {
  console.log("la valeur de la duée:", nouvelleDuree);

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
      console.log("la durée est sauvegardée et vos :", sommeDuree);

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

export function recupererDureeTotale(): Promise<Time> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["dureeTotale"], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }

      const dureeSec: number = result.dureeTotale ?? 0;
      const dureeTime = secondsToTime(dureeSec);
      console.log("la durée est récupérée et vos :", dureeTime);
      resolve(dureeTime);
    });
  });
}
