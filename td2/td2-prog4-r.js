// Importation des modules nécessaires
const fs = require('fs');
const path = require('path');

// Fonction pour lister les fichiers de manière récursive
function listFiles(dir) {
    let filesList = [];
    // Lecture du contenu du répertoire
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        // Vérification si c'est un répertoire
        if (fs.statSync(filePath).isDirectory()) {
            // Appel récursif si c'est un répertoire
            filesList = filesList.concat(listFiles(filePath));
        } else {
            // Ajout du fichier à la liste
            filesList.push(filePath);
        }
    });

    return filesList;
}

// Récupération du répertoire courant
const currentDir = process.cwd();
const filesList = listFiles(currentDir);

// Affichage de la liste des fichiers
console.log('Liste des fichiers dans le répertoire courant et ses sous-répertoires :');
filesList.forEach(file => {
    console.log(file);
});
