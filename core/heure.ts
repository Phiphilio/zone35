import { Time } from "../type";

/*export const calculerDuréeSession(session : boolean){
// reçois une action
let compteur = 0;

let dureeEnHeure = 0

while (session) {
  console.log("Compteur vaut :", compteur);
  compteur++;
}

if (session === false) {
 dureeEnHeure = compteur /3600
}
return dureeEnHeure
}*/

export function startTimer(callback: (time: Time) => void) {
  let time: Time = { hours: 0, minutes: 0, seconds: 0 };

  const interval = setInterval(() => {
    time.seconds++;

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

  return () => clearInterval(interval); // fonction pour stopper le minuteur
}
