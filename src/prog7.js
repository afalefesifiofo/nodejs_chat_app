// Définir une fonction pour afficher le message de bienvenue
function afficherMessageBienvenue() {
    console.log("Bienvenue !");
    
    // Utiliser setTimeout pour rappeler la fonction après 10 millisecondes
    setTimeout(afficherMessageBienvenue, 5000);
}

// Démarrer l'affichage du message de bienvenue
afficherMessageBienvenue();


process.on('SIGINT', () => {
    console.log('Processus interrompu. À bientôt !');
    process.exit(0); // Quitter le processus
});