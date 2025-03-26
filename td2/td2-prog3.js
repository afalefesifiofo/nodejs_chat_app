const debug = require('debug');

// Définir vos loggers
const logio = debug('app:io');
const logtimeout = debug('app:timeout');

// Exemple de fonction qui simule une opération IO
function performIO() {
    logio('Démarrage des opérations d\'entrée/sortie');
    setTimeout(() => {
        logio('Opération IO terminée');
    }, 1000);
}

// Exemple de fonction qui simule un timeout
function performTimeout() {
    logtimeout('Démarrage d\'un timeout');
    setTimeout(() => {
        logtimeout('Timeout terminé');
    }, 2000);
}   

// Démarrer les opérations
performIO();
performTimeout();
