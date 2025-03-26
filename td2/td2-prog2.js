// Fonction qui retourne une fonction de log pour un flag spécifique
function logger(flag) {
    // Vérifie si le flag est dans la variable d'environnement DEBUG
    const debugFlags = process.env.DEBUG ? process.env.DEBUG.split(',') : [];
    
    // Retourne une fonction de log
    return function(...args) {
        if (debugFlags.includes(flag)) {
            console.log(`[${flag}]`, ...args);
        }
    };
}

// Définir les loggers pour 'io' et 'timeout'
const logio = logger('io');
const logtime = logger('timeout');

// Exemples d'utilisation
logio('Information sur les IO'); // Devrait s'afficher si DEBUG contient 'io'
logtime('Information sur le temps'); // Devrait s'afficher si DEBUG contient 'timeout'

// Exemple de programme
console.log('Programme en cours d\'exécution...');
