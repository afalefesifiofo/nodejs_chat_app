// Fonction log qui affiche les informations de débogage si le flag est true
function log(flag, ...args) {
    if (flag) {
        console.log(...args); // Affiche les arguments si le flag est à true
    }
}

// Afficher la valeur exacte de la variable d'environnement DEBUG
console.log("Valeur actuelle de DEBUG:", process.env.DEBUG);

// Vérifier si la variable d'environnement DEBUG est définie à 'true'
const debugMode = process.env.DEBUG === 'true';

// Afficher un message indiquant si le mode débogage est activé ou non
console.log(`Mode debug: ${debugMode ? 'Activé' : 'Désactivé'}`);

// Exemple d'utilisation
log(debugMode, "Démarrage du programme...");
log(debugMode, "Variable test:", 123);
log(debugMode, "Exemple d'objet:", { key: "valeur" });

// Autres instructions du programme
console.log("Programme en cours d'exécution...");

// Afficher la fin du programme en fonction du mode debug
log(debugMode, "Fin du programme.");
