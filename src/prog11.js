// prog11.js

// Importer les modules nécessaires
const fs = require('fs');
const readline = require('readline');

// Créer un flux d'écriture vers le fichier 'output.txt'
const writeStream = fs.createWriteStream('output.txt');

// Créer une interface readline pour lire l'entrée standard
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Afficher un message d'invite
console.log("Entrez du texte (Ctrl+C pour quitter). Le texte sera enregistré dans 'output.txt':");

// Écouter l'événement 'line' pour chaque ligne saisie
rl.on('line', (input) => {
    // Écrire la ligne dans le fichier
    writeStream.write(input + '\n');
});

// Gérer la fermeture de l'interface readline lors de l'interruption
rl.on('SIGINT', () => {
    console.log('\nProcessus interrompu. À bientôt !');
    rl.close();
    writeStream.end(); // Fermer le flux d'écriture
});
