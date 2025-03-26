// prog9.js

// Afficher un message d'invite
console.log("Entrez du texte (Ctrl+C pour quitter) :");

// Écouter l'événement 'data' sur stdin
process.stdin.on('data', (input) => {
    // Convertir l'input en chaîne de caractères
    const text = input.toString();

    // Compter le nombre de caractères (en excluant le saut de ligne)
    const characterCount = text.trim().length;

    // Afficher le nombre de caractères
    console.log(characterCount);
});
