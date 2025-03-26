// prog12.js

// Importer le module fs
const fs = require('fs');

// Définir les noms des fichiers source et destination
const sourceFile = 'output.txt'; // Change ceci avec le chemin du fichier à copier
const destinationFile = 'destination.txt'; // Change ceci avec le chemin où sauvegarder le fichier copié

// Créer un flux de lecture pour le fichier source
const readStream = fs.createReadStream(sourceFile);

// Créer un flux d'écriture pour le fichier de destination
const writeStream = fs.createWriteStream(destinationFile);

// Utiliser pipe pour copier le contenu du fichier source vers le fichier de destination
readStream.pipe(writeStream);

// Écouter les événements 'finish' et 'error'
writeStream.on('finish', () => {
    console.log(`Le fichier a été copié avec succès de ${sourceFile} à ${destinationFile}.`);
});

writeStream.on('error', (err) => {
    console.error('Une erreur est survenue lors de la copie du fichier:', err);
});
