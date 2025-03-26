// prog8.js

// Rediriger le flux d'entrée (stdin) vers le flux de sortie (stdout)
process.stdin.pipe(process.stdout);

// Afficher un message indiquant que la redirection est en cours
console.log("Entrez du texte (Ctrl+C pour quitter) :");
