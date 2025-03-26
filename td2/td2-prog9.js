// Importation des modules nécessaires
const { spawn } = require('child_process');

// Vérification des arguments
const isJsonOutput = process.argv.includes('json');

// Détermination de la commande à utiliser
const command = 'cmd.exe';
const args = ['/c', 'dir /b']; // Liste des fichiers en mode brut

// Création du processus pour exécuter la commande
const listFiles = spawn(command, args);

// Tableau pour stocker les noms de fichiers
let filesList = [];

// Gestion de la sortie standard du processus
listFiles.stdout.on('data', (data) => {
    // Conversion des données en chaîne de caractères et séparation des fichiers
    const files = data.toString().split('\r\n').filter(file => file.trim() !== '');
    filesList.push(...files); // Ajouter les fichiers à la liste
});

// Gestion des erreurs potentielles
listFiles.stderr.on('data', (data) => {
    console.error(`Erreur : ${data.toString()}`);
});

// Gestion de la fermeture du processus
listFiles.on('close', (code) => {
    if (code !== 0) {
        console.error(`Le processus s'est terminé avec le code : ${code}`);
    } else {
        // Si l'argument json est spécifié, formater la sortie en JSON
        if (isJsonOutput) {
            console.log(JSON.stringify(filesList, null, 2));
        } else {
            // Sinon, afficher la liste des fichiers
            console.log('Liste des fichiers dans le répertoire courant :');
            filesList.forEach(file => {
                console.log(file);
            });
        }
    }
});
