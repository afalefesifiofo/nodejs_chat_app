// Importation du module 'child_process'
const { spawn } = require('child_process');

// Détection du système d'exploitation et adaptation de la commande
const command = process.platform === 'win32' ? 'cmd' : 'ls';
const args = process.platform === 'win32' ? ['/c', 'dir'] : [];

// Utilisation de 'spawn' pour exécuter la commande appropriée
const ls = spawn(command, args);

// Gestion de la sortie standard du processus enfant
ls.stdout.on('data', (data) => {
    console.log(`Liste des fichiers :\n${data}`);
});

// Gestion des erreurs potentielles du processus enfant
ls.stderr.on('data', (data) => {
    console.error(`Erreur : ${data}`);
});

// Gestion de la fin du processus enfant
ls.on('close', (code) => {
    console.log(`Le processus s'est terminé avec le code : ${code}`);
});
