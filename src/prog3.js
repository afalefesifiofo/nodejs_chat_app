
// Lister toutes les variables d'environnement disponibles dans le processus
console.log("Variables d'environnement disponibles :");

// L'objet process.env contient toutes les variables d'environnement sous forme de paires clé-valeur
for (let variable in process.env) {
    console.log(`${variable}: ${process.env[variable]}`);
}
