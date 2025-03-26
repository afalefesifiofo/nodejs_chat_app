// Create a server socket and listen on port 3636
const socketio = require('socket.io');
const io = socketio.listen(3636);

let users = {};

// Handle event 'send' from client
io.on('connection', function(socket) {
    socket.on('send', function(data) {
        if (!data.sender || (users[data.sender] === undefined && data.action !== 'connection')) {
            handleDisconnectedUser(socket, data);
            return;
        }
        switch (data.action) {
            case 'connection':
                handleConnectionAction(socket, data);
                break;
            case 'broadcast':
                handleBroadcastAction(socket, data);
                break;
            case 'list':
                handleListAction(socket);
                break;
            case 'quit':
                handleQuitAction(socket, data);
                break;
            default:
                handleNotSupportedAction(socket, data)
                break;
        }
    });

    // Handle event disconnect by program
    socket.on('disconnect', function() {
        disconnectUser(socket);
    });
});

function handleDisconnectedUser(socket, data) {
    socket.emit('message', { sender: 'server', msg: `Sender ${data.sender} is not existed or disconnected`, event: 'error.user.notConnected' });
    socket.disconnect();
}

function handleNotSupportedAction(socket, data) {
    socket.emit('message', { sender: 'server', msg: `Action ${data.action} is not supported`, event: 'error.action.notSupported' });
}

function handleConnectionAction(socket, data) {
    let username = data.sender;
    if (users[username] !== undefined) {
        socket.emit('message', { sender: 'server', msg: `Connection failed, nickname has already been taken `, event: 'user.connectionFailed' });
        socket.disconnect();
    } else {
        users[data.sender] = socket.id;
        socket.emit('message', { sender: 'server', msg: `Hello ${data.sender}`, event: 'user.connected' });
        sendBroadcastMessage(socket, {
            sender: 'server',
            user: data.sender,
            event: 'user.new'
        });
    }
}

function handleBroadcastAction(socket, data) {
    sendBroadcastMessage(socket, { sender: data.sender, msg: data.msg, event: 'user.broadcast' })
}

function handleListAction(socket) {
    socket.emit('message', { sender: 'server', users: Object.keys(users), event: 'user.list' });
}

function handleQuitAction(socket) {
    socket.disconnect();
}

function disconnectUser(socket) {
    let disconnectedUser = null;
    for (let user in users) {
        let socketId = users[user];
        if (socketId === socket.id) {
            disconnectedUser = user;
            break;
        }
    }
    if (disconnectedUser) {
        delete users[disconnectedUser];
        sendBroadcastMessage(socket, { sender: 'server', user: disconnectedUser, event: 'user.quit' });
    }
}

function sendBroadcastMessage(socket, data) {
    socket.broadcast.emit('message', data);
}