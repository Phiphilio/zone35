import { calculerDureeSession, arreterSession } from "../core/heure";

// fichier pour tester mes fonctions

const stop = calculerDureeSession((time) => {
  const { hours, minutes, seconds } = time;
  console.log(
    `${hours.toString().padStart(2, "0")}:` +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}`
  );
});

// Pour arrêter le minuteur après 10 secondes
/*setTimeout(() => {
  arreterSession(stop);
  // stop();
  console.log("Minuteur arrêté !");
}, 10000);
*/
