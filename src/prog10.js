// prog10.js

// Importer la librairie readline
const readline = require('readline');

// Créer une interface readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Afficher un message d'invite
console.log("Entrez du texte (Ctrl+C pour quitter) :");

// Fonction pour poser une question et lire la réponse
const askQuestion = () => {
    rl.question('> ', (input) => {
        // Compter le nombre de caractères (en excluant le saut de ligne)
        const characterCount = input.length; // Inclut tous les caractères

        // Afficher le nombre de caractères
        console.log(characterCount);

        // Reposer la question
        askQuestion();
    });
};

// Démarrer la première question
askQuestion();

// Gérer la fermeture de l'interface readline lors de l'interruption
rl.on('SIGINT', () => {
    console.log('\nProcessus interrompu. À bientôt !');
    rl.close();
});
