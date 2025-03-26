const net = require('net');
const debug = require('debug')('server');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

// Mappa per tenere traccia dei client connessi (nome -> socket)
let clients = {};
// Mappa per tenere traccia dei gruppi (nome gruppo -> membri)
let groups = {};
// Mappa per tenere traccia dei messaggi per ogni gruppo (nome gruppo -> array di messaggi)
let groupMessages = {};

const server = net.createServer((socket) => {
    debug('CONNECTED from ' + socket.remoteAddress + ':' + socket.remotePort);

    // Gestione della ricezione di dati dal client
    socket.on('data', function(data) {
        try {
            const msg = JSON.parse(data);
            debug('DATA received from ' + socket.remoteAddress + ':' + data);

            switch (msg.action) {
                case 'client-hello':
                    // Memorizza il client connesso (nome -> socket)
                    clients[msg.from] = socket;
                    socket.write(JSON.stringify({
                        "sender-ip": socket.remoteAddress + ':' + socket.remotePort,
                        "action": "server-hello",
                        "msg": `Hello ${msg.from}`
                    }));
                    broadcast(`${msg.from} has joined the chat.`, msg.from);
                    break;

                case 'client-send': // Gestione dei messaggi privati
                    if (msg.to in clients) {
                        const recipientSocket = clients[msg.to];
                        const privateMessage = {
                            from: msg.from,
                            to: msg.to,
                            msg: msg.msg,
                            action: 'server-send'
                        };
                        recipientSocket.write(JSON.stringify(privateMessage));
                        debug(`Sent private message from ${msg.from} to ${msg.to}`);
                    } else {
                        socket.write(JSON.stringify({
                            action: 'error',
                            msg: `User ${msg.to} is not connected`
                        }));
                        debug(`User ${msg.to} is not connected`);
                    }
                    break;

                case 'client-broadcast': // Gestione del comando broadcast
                    broadcast(msg.msg, msg.from);
                    break;

                case 'client-list-clients': // Gestione del comando list
                    const clientNames = Object.keys(clients);
                    socket.write(JSON.stringify({
                        action: 'server-list-clients',
                        clients: clientNames
                    }));
                    break;

                case 'client-quit': // Gestione del comando quit
                    handleClientDisconnection(msg.from, socket);
                    break;

                case 'client-error': // Gestione della disconnessione improvvisa (Ctrl+C)
                    debug(`Client ${socket.remoteAddress}:${socket.remotePort} quit unexpectedly`);
                    handleClientDisconnection(msg.from, socket);
                    break;

                case 'cgroupe': // Creazione di un gruppo
                    createGroup(msg.sender, msg.group);
                    break;

                case 'join': // Unirsi a un gruppo
                    joinGroup(msg.sender, msg.group);
                    break;

                case 'gbroadcast': // Inviare un messaggio a un gruppo
                    groupBroadcast(msg.sender, msg.group, msg.msg);
                    break;

                case 'members': // Elencare i membri di un gruppo
                    listGroupMembers(msg.sender, msg.group);
                    break;

                case 'msgs': // Elencare i messaggi di un gruppo
                    listGroupMessages(msg.sender, msg.group);
                    break;

                case 'groups': // Elencare tutti i gruppi esistenti
                    listGroups(msg.sender);
                    break;

                case 'leave': // Uscire da un gruppo
                    leaveGroup(msg.sender, msg.group);
                    break;
                    case 'invite': // Invita un utente in un gruppo
                    inviteUser(msg.sender, msg.group, msg.dest);
                    break;
    
                case 'kick': // Espelli un utente da un gruppo
                    kickUser(msg.sender, msg.group, msg.dest, msg.reason);
                    break;
    
                case 'ban': // Banna un utente da un gruppo
                    banUser(msg.sender, msg.group, msg.dest, msg.reason);
                    break;
    
                case 'unban': // Rimuovi il ban da un utente
                    unbanUser(msg.sender, msg.group, msg.dest);
                    break;
    
                case 'states': // Elenca gli eventi in un gruppo
                    listGroupStates(msg.sender, msg.group);
                    break;
    
                default:
                    debug('Unknown action: ' + msg.action);
            }
        } catch (error) {
            debug('Invalid JSON data received:', error);
        }
    });

    // Gestire la disconnessione del client
    socket.on('end', () => {
        debug('Client disconnected: ' + socket.remoteAddress + ':' + socket.remotePort);
        handleClientDisconnectionBySocket(socket);
    });

    // Gestire eventuali errori
    socket.on('error', (err) => {
        debug('Socket error:', err);
    });
}).listen(port, host);

debug(`Server is running on ${host}:${port}`);

// Funzione per inviare un messaggio a tutti i client connessi (broadcast)
function broadcast(message, sender) {
    const broadcastMessage = JSON.stringify({
        from: sender,
        msg: message,
        action: 'server-broadcast'
    });

    for (let clientName in clients) {
        if (clients[clientName] !== clients[sender]) { // Evitare di inviare il messaggio al mittente
            clients[clientName].write(broadcastMessage);
        }
    }
    debug(`Broadcast message from ${sender}: ${message}`);
}

// Funzione per creare un gruppo
function createGroup(sender, groupName) {
    if (!groups[groupName]) {
        groups[groupName] = []; // Crea un nuovo gruppo
        groupMessages[groupName] = []; // Inizializza l'array dei messaggi
    }
    if (!groups[groupName].includes(sender)) {
        groups[groupName].push(sender); // Aggiungi il mittente come membro del gruppo
    }
    debug(`${sender} created group: ${groupName}`);
    broadcast(`${sender} created group: ${groupName}`, sender);
}

// Funzione per unirsi a un gruppo
function joinGroup(sender, groupName) {
    if (groups[groupName]) {
        if (!groups[groupName].includes(sender)) {
            groups[groupName].push(sender); // Aggiungi il mittente come membro del gruppo
            debug(`${sender} joined group: ${groupName}`);
            broadcast(`${sender} joined group: ${groupName}`, sender);
        } else {
            debug(`${sender} is already in group: ${groupName}`);
        }
    } else {
        debug(`Group ${groupName} does not exist`);
    }
}

// Funzione per inviare un messaggio a un gruppo
function groupBroadcast(sender, groupName, message) {
    if (groups[groupName]) {
        const groupMessage = JSON.stringify({
            from: sender,
            msg: message,
            action: 'server-gbroadcast'
        });
        groups[groupName].forEach(member => {
            if (member in clients) {
                clients[member].write(groupMessage); // Invia il messaggio a tutti i membri del gruppo
            }
        });
        groupMessages[groupName].push({ from: sender, msg: message }); // Memorizza il messaggio nel gruppo
        debug(`Group message from ${sender} to ${groupName}: ${message}`);
    } else {
        debug(`Group ${groupName} does not exist`);
    }
}

// Funzione per elencare i membri di un gruppo
function listGroupMembers(sender, groupName) {
    if (groups[groupName]) {
        const members = groups[groupName];
        clients[sender].write(JSON.stringify({
            action: 'server-members',
            group: groupName,
            members: members
        }));
        debug(`Members of group ${groupName}: ${members}`);
    } else {
        clients[sender].write(JSON.stringify({
            action: 'error',
            msg: `Group ${groupName} does not exist`
        }));
    }
}

// Funzione per elencare i messaggi di un gruppo
function listGroupMessages(sender, groupName) {
    if (groupMessages[groupName]) {
        const messages = groupMessages[groupName];
        clients[sender].write(JSON.stringify({
            action: 'server-msgs',
            group: groupName,
            messages: messages
        }));
        debug(`Messages of group ${groupName}: ${JSON.stringify(messages)}`);
    } else {
        clients[sender].write(JSON.stringify({
            action: 'error',
            msg: `Group ${groupName} does not exist`
        }));
    }
}

// Funzione per elencare tutti i gruppi esistenti
function listGroups(sender) {
    const groupNames = Object.keys(groups);
    if (clients[sender]) {
        clients[sender].write(JSON.stringify({
            action: 'server-groups',
            groups: groupNames
        }));
        debug(`Existing groups: ${groupNames}`);
    } else {
        debug(`Client ${sender} not found.`);
    }
    
    
}

// Funzione per lasciare un gruppo
function leaveGroup(sender, groupName) {
    if (groups[groupName]) {
        groups[groupName] = groups[groupName].filter(member => member !== sender); // Rimuovi il membro
        debug(`${sender} left group: ${groupName}`);
        broadcast(`${sender} left group: ${groupName}`, sender);
    } else {
        clients[sender].write(JSON.stringify({
            action: 'error',
            msg: `Group ${groupName} does not exist`
        }));
    }
}

// Funzione per gestire la disconnessione di un client
function handleClientDisconnection(clientName, socket) {
    if (clientName in clients) {
        delete clients[clientName];
        broadcast(`${clientName} has left the chat.`, clientName);
        for (let groupName in groups) {
            groups[groupName] = groups[groupName].filter(member => member !== clientName); // Rimuovi il client dai gruppi
        }
        socket.end();
    }
}

// Funzione per gestire la disconnessione tramite socket
function handleClientDisconnectionBySocket(socket) {
    const disconnectedClient = Object.keys(clients).find(clientName => clients[clientName] === socket);
    if (disconnectedClient) {
        handleClientDisconnection(disconnectedClient, socket);
    }
}

// Funzione per invitare un utente in un gruppo
function inviteUser(sender, groupName, dest) {
    if (groups[groupName]) {
        if (!groups[groupName].includes(dest)) {
            groups[groupName].push(dest); // Aggiungi il destinatario al gruppo
            debug(`${sender} invited ${dest} to group: ${groupName}`);
            clients[dest].write(JSON.stringify({
                action: 'server-invite',
                group: groupName,
                sender: sender,
                msg: `${sender} has invited you to join the group ${groupName}.`
            }));
        } else {
            debug(`${dest} is already a member of ${groupName}`);
        }
    } else {
        debug(`Group ${groupName} does not exist`);
    }
}

// Funzione per espellere un utente da un gruppo
function kickUser(sender, groupName, dest, reason) {
    if (groups[groupName] && groups[groupName].includes(dest)) {
        groups[groupName] = groups[groupName].filter(member => member !== dest);
        debug(`${sender} kicked ${dest} from group: ${groupName} for reason: ${reason}`);
        clients[dest].write(JSON.stringify({
            action: 'server-kicked',
            group: groupName,
            msg: `${sender} has kicked you from the group ${groupName}. Reason: ${reason}`
        }));
    } else {
        debug(`${dest} is not in group ${groupName}`);
    }
}

// Funzione per bannare un utente
function banUser(sender, groupName, dest, reason) {
    if (groups[groupName] && groups[groupName].includes(dest)) {
        groups[groupName] = groups[groupName].filter(member => member !== dest);
        debug(`${sender} banned ${dest} from group: ${groupName} for reason: ${reason}`);
        clients[dest].write(JSON.stringify({
            action: 'server-banned',
            group: groupName,
            msg: `${sender} has banned you from the group ${groupName}. Reason: ${reason}`
        }));
    } else {
        debug(`${dest} is not in group ${groupName}`);
    }
}

// Funzione per rimuovere il ban di un utente
function unbanUser(sender, groupName, dest) {
    // Potresti voler gestire un elenco separato di bannati
    // Per esempio: bannedUsers[groupName] = []
    debug(`${sender} unbanned ${dest} from group: ${groupName}`);
    // Gestisci la logica per rimuovere il ban, se necessario
}

// Funzione per elencare gli eventi in un gruppo
function listGroupStates(sender, groupName) {
    // Potresti avere una struttura dati per memorizzare gli eventi nel gruppo
    // Ad esempio, un array `groupStates[groupName]` con eventi specifici
    const events = []; // Sostituisci con la tua logica
    clients[sender].write(JSON.stringify({
        action: 'server-states',
        group: groupName,
        events: events
    }));
}