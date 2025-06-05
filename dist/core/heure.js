export let tempsAffiche = { hours: 0, minutes: 0, seconds: 0 };
export function calculerDureeSession(callback, startTime) {
    let time = startTime
        ? Object.assign({}, startTime) : { hours: 0, minutes: 0, seconds: 0 };
    console.log("time doit contenir :", time);
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
export function arreterSession(arreter) {
    arreter();
    // console.log("ce que contient callback :", callback);
    console.log("fin de session/ dans arreter session");
}
// mettre au format 00
export function pad(n) {
    return n.toString().padStart(2, "0");
}
// Convertir un objet Time en secondes totales
export function timeToSeconds(time) {
    return time.hours * 3600 + time.minutes * 60 + time.seconds;
}
export function secondToPercent(time) {
    let s = timeToSeconds(time);
    return (s * 100) / 126000;
}
// Convertir un nombre de secondes en objet Time
export function secondsToTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
}
export function sauvegarderDureeSession(nouvelleDuree) {
    console.log("la valeur de la duée:", nouvelleDuree);
    return new Promise((resolve, reject) => {
        // On récupère la durée stockée (en secondes)
        chrome.storage.local.get(["dureeTotale"], (result) => {
            var _a;
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                return;
            }
            const dureeStockeeSec = (_a = result.dureeTotale) !== null && _a !== void 0 ? _a : 0;
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
export function reconstituerTempsDepuis(timestamp) {
    const diff = Date.now() - timestamp;
    const totalSeconds = Math.floor(diff / 1000);
    return {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };
}
export function recupererDureeTotale() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["dureeTotale"], (result) => {
            var _a;
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                return;
            }
            const dureeSec = (_a = result.dureeTotale) !== null && _a !== void 0 ? _a : 0;
            const dureeTime = secondsToTime(dureeSec);
            console.log("la durée est récupérée et vos :", dureeTime);
            resolve(dureeTime);
        });
    });
}
export function reinitialiserDureeTotale() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ dureeTotale: 0 }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                return;
            }
            resolve();
        });
    });
}
