// Importation du module 'child_process'
const { spawn } = require('child_process');

// Vérification des arguments
if (process.argv.length < 3) {
    console.error('Veuillez spécifier un type de fichier (par exemple, *.txt).');
    process.exit(1);
}

// Récupération du type de fichier depuis les arguments
const fileType = process.argv[2];

// Détermination de la commande à utiliser en fonction du système d'exploitation
const command = process.platform === 'win32' ? 'cmd' : 'find';
const args = process.platform === 'win32' 
    ? ['/c', `dir /b ${fileType} | find /c /v ""`]  // Windows : dir et comptage avec findstr
    : ['.', '-type', 'f', '-name', fileType];  // Unix-like : find pour lister les fichiers du type spécifié

// Création du processus pour exécuter la commande
const countFiles = spawn(command, args, { shell: true });

// Gestion de la sortie standard du processus
countFiles.stdout.on('data', (data) => {
    console.log(`Nombre de fichiers de type "${fileType}" dans le répertoire courant : ${data}`);
});

// Gestion des erreurs potentielles
countFiles.stderr.on('data', (data) => {
    console.error(`Erreur : ${data}`);
});

// Gestion de la fermeture du processus
countFiles.on('close', (code) => {
    if (code !== 0) {
        console.error(`Le processus s'est terminé avec le code : ${code}`);
    }
});
