// Importation des modules nécessaires
const { spawn } = require('child_process');
const path = require('path');

// Vérification des arguments
const isJsonOutput = process.argv.includes('json');

// Détermination de la commande à utiliser selon le système d'exploitation
const command = process.platform === 'win32' ? 'cmd' : 'find';
const args = process.platform === 'win32' 
    ? ['/c', 'dir /b']  // Windows : liste tous les fichiers
    : ['.', '-type', 'f'];  // Unix-like : find pour lister tous les fichiers

// Création du processus pour exécuter la commande
const listFiles = spawn(command, args, { shell: true });

// Tableau pour stocker le nombre de fichiers par type
const fileTypesCount = {};

// Gestion de la sortie standard du processus
listFiles.stdout.on('data', (data) => {
    // Conversion des données en chaîne de caractères
    const files = data.toString().split('\n').filter(file => file.trim() !== '');
    
    // Traitement des fichiers pour compter les extensions
    files.forEach(file => {
        const ext = path.extname(file).toLowerCase(); // Obtenir l'extension
        if (ext) {
            fileTypesCount[ext] = (fileTypesCount[ext] || 0) + 1; // Incrémenter le compteur
        }
    });
});

// Gestion des erreurs potentielles
listFiles.stderr.on('data', (data) => {
    console.error(`Erreur : ${data}`);
});

// Gestion de la fermeture du processus
listFiles.on('close', (code) => {
    if (code !== 0) {
        console.error(`Le processus s'est terminé avec le code : ${code}`);
    } else {
        // Affichage ou écriture du résultat
        if (isJsonOutput) {
            // Conversion de l'objet en JSON et écriture
            console.log(JSON.stringify(fileTypesCount, null, 2));
        } else {
            // Affichage du nombre de fichiers par type
            console.log('Nombre de fichiers par type :');
            for (const [ext, count] of Object.entries(fileTypesCount)) {
                console.log(`${ext || 'sans extension'} : ${count}`);
            }
        }
    }
});
