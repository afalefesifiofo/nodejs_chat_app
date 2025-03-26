// messageTypes.js
const MESSAGE_TYPES = {
    CLIENT_HELLO: 'client-hello',
    CLIENT_SEND: 'client-send',
    CLIENT_BROADCAST: 'client-broadcast',
    CLIENT_LIST_CLIENTS: 'client-list-clients',
    CLIENT_QUIT: 'client-quit',
    CLIENT_ERROR: 'client-error',
    SERVER_HELLO: 'server-hello',
    SERVER_SEND: 'server-send',
    SERVER_BROADCAST: 'server-broadcast',
    SERVER_LIST_CLIENTS: 'server-list-clients',
    ERROR: 'error'
};

module.exports = MESSAGE_TYPES;
