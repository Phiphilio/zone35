import { Time } from "../type";

export function calculerDureeSession(callback: (time: Time) => void) {
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

export function resteAvantObjectif(
  sessions,
  { hours, minutes, seconds }: Time
) {}
