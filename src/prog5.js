// prog5.js

// Fonction qui attend x millisecondes et indique combien de temps s'est écoulé
function waitAndDisplayTime(x) {
    // Enregistrer le temps de départ en nanosecondes
    const startTime = process.hrtime.bigint();

    // Utiliser setTimeout pour attendre x millisecondes
    setTimeout(() => {
        // Calculer le temps écoulé
        const endTime = process.hrtime.bigint();
        const elapsedTime = endTime - startTime; // en nanosecondes

        // Convertir en millisecondes
        const elapsedTimeInMilliseconds = Number(elapsedTime) / 1e6;

        // Afficher le temps écoulé
        console.log(`Temps écoulé: ${elapsedTimeInMilliseconds.toFixed(2)} ms`);
    }, x);
}

// Exemple d'utilisation
const x = 2000; // Attendre 2000 millisecondes (2 secondes)
console.log(`Attente de ${x} millisecondes...`);
waitAndDisplayTime(x);
