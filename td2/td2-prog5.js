// Importation du module 'child_process'
const { spawn } = require('child_process');

// Détermination de la commande à utiliser selon le système d'exploitation
const command = process.platform === 'win32' ? 'cmd' : 'find';
const args = process.platform === 'win32' 
    ? ['/c', 'dir /b | find /c /v ""']  // Windows : dir /b et comptage avec find
    : ['.', '-type', 'f'];  // Unix-like : find pour lister uniquement les fichiers

// Création du processus pour exécuter la commande
const countFiles = spawn(command, args, { shell: true });

// Gestion de la sortie standard du processus
countFiles.stdout.on('data', (data) => {
    console.log(`Nombre de fichiers dans le répertoire courant : ${data}`);
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
