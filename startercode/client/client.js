// client.js
const net = require('net');
const readline = require('readline');
const debug = require('debug')('client');
const yargs = require('yargs');
const commands = require('../modules/commands.js');
const messageFactory = require('../modules/messageFactory.js');

// Configuration de yargs pour gérer les arguments de la ligne de commande
const argv = yargs
    .option('name', {
        alias: 'n',
        description: 'Nom de l\'utilisateur',
        type: 'string',
        demandOption: false
    })
    .help() 
    .argv;

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new net.Socket();

client.connect(port, host, function() {
    debug('Connected');
    const helloMessage = messageFactory.helloMessage(argv.name);
    client.write(helloMessage);
    debug(`Sent: ${helloMessage}`);
});

// Recevoir des données du serveur
client.on('data', function(data) {
    console.log('Received: ' + data);
    rl.prompt();
});

// Gérer les entrées utilisateur
rl.on('line', (text) => {
    commands.handleInput(text, client, argv.name,rl);
    rl.prompt();
});

// Gestion de la fermeture avec Ctrl+C
rl.on('close', () => {
    debug('Closing connection');
    client.end();
});

// Gestion de SIGINT (Ctrl+C)
if (process.platform === "win32") {
    rl.on("SIGINT", function () {
        process.emit("SIGINT");
        rl.close();
    });
    
    process.on('SIGINT', () => {
        const errorMessage = messageFactory.errorMessage(1, 'Client quit unexpectedly');
        client.write(errorMessage, () => {
            debug('Sent: client-error (Ctrl+C)');
        });
        client.end();
    });
}
