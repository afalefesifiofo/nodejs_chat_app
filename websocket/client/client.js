// Create a client socket and connect to port 3636
const socketio = require('socket.io-client');
const socket = socketio.connect("http://localhost:3636");

// Read user's input
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// Variable to keep user's nickname
let nickname = '';
let isConnected = false;

// Process user's input
rl.on('line', function(line) {
    if (!isConnected) {
        console.log("You have been disconnected. Please close the program and reconnect");
        return;
    }
    if (line.match(/^b;.+$/)) {
        socket.emit('send', { sender: nickname, msg: getUserInputMessage(line), action: 'broadcast' });
    } else if (line.match(/^ls;$/)) {
        socket.emit('send', { sender: nickname, action: 'list' });
    } else if (line.match(/^q;/)) {
        isConnected = false;
        socket.emit('send', { sender: nickname, action: 'quit' })
    }
    rl.prompt(true);
});

// Ecoutè le ctrl C
rl.on('SIGINT', () => {
    socket.emit('send', { code: error_code ,msg: error_msg, action:'client-error' });
});


function getUserInputMessage(line) {
    return line.substring(2, line.length);
}

// Handle events from server
socket.on('message', function(data) {
    switch (data.event) {
        case 'user.connected':
            handleConnectedEvent(data);
            break;
        case 'user.connectionFailed':
            handleConnectionFailedEvent(data);
            break;
        case 'user.new':
            handleNewUserEvent(data);
            break;
        case 'user.list':
            handleListEvent(data);
            break;
        case 'user.quit':
            handleQuitEvent(data);
            break;
        case 'user.broadcast':
            handleBroadcastEvent(data);
            break;
        default:
            handleUnknownEvent(data);
            break;
    }
    rl.prompt(true);
});

function handleUnknownEvent(data) {
    console.log(data.msg);
}

function handleConnectedEvent(data) {
    isConnected = true;
    console.log(data.msg);
}

function handleConnectionFailedEvent(data) {
    isConnected = false;
    console.log(data.msg);
}

function handleNewUserEvent(data) {
    console.log(`${data.user} is connected.`)
}

function handleListEvent(data) {
    for (let user of data.users) {
        console.log(`${user}`)
    }
}

function handleQuitEvent(data) {
    console.log(`${data.user} left the chat.`)
}

function handleBroadcastEvent(data) {
    console.log(`${data.sender}>${data.msg}`);
}

function main() {
    if (process.argv.length == 4 && process.argv[2] == '--name') {
        nickname = process.argv[3];
        socket.emit('send', { sender: nickname, action: 'connection' });
    } else {
        // Set the username
        rl.question('Please enter a nickname: ', function(nameInput) {
            nickname = nameInput;
            socket.emit('send', { sender: nickname, action: 'connection' });
            rl.prompt(true);
        });
    }
}

main();