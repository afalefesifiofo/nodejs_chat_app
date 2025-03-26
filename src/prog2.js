// prog2.js

// Importation des modules nécessaires
const os = require('os'); // Pour obtenir des informations sur l'OS
const process = require('process'); // Pour obtenir des informations sur le processus

// Afficher le PID du processus courant
console.log(`PID du processus courant: ${process.pid}`);

// Afficher le PID du processus père
console.log(`PID du processus père: ${process.ppid}`);

// Afficher le chemin courant
console.log(`Chemin courant: ${process.cwd()}`);

// Afficher le système d'exploitation
console.log(`OS: ${os.type()}`);

// Afficher l'architecture du processeur
console.log(`Architecture du processeur: ${os.arch()}`);

// Afficher le chemin d'exécution de Node.js
console.log(`Chemin d'exécution de Node.js: ${process.execPath}`);

// Afficher la version de Node.js
console.log(`Version de Node.js: ${process.version}`);
