const MESSAGE_TYPES = require('./messageTypes');

function helloMessage(name) {
    return JSON.stringify({
        from: name,
        action: MESSAGE_TYPES.CLIENT_HELLO
    });
}

function privateMessage(from, to, msg) {
    return JSON.stringify({
        from: from,
        to: to,
        msg: msg,
        action: MESSAGE_TYPES.CLIENT_SEND
    });
}

function broadcastMessage(from, msg) {
    return JSON.stringify({
        from: from,
        msg: msg,
        action: MESSAGE_TYPES.CLIENT_BROADCAST
    });
}

function listClientsMessage(name) {
    return JSON.stringify({
        from: name,
        action: MESSAGE_TYPES.CLIENT_LIST_CLIENTS
    });
}

function quitMessage(name) {
    return JSON.stringify({
        from: name,
        action: MESSAGE_TYPES.CLIENT_QUIT
    });
}

function errorMessage(code, msg) {
    return JSON.stringify({
        code: code,
        msg: msg,
        action: MESSAGE_TYPES.CLIENT_ERROR
    });
}

function groupMessage(sender, group) {
    return JSON.stringify({ sender: sender, group: group, action: 'cgroupe' });
}

function joinGroupMessage(sender, group) {
    return JSON.stringify({ sender: sender, group: group, action: 'join' });
}

function broadcastGroupMessage(sender, group, msg) {
    return JSON.stringify({ sender: sender, group: group, msg: msg, action: 'gbroadcast' });
}

// Nuovi metodi per le funzionalità aggiuntive
function membersListMessage(sender, group) {
    return JSON.stringify({
        sender: sender,
        group: group,
        action: 'members'
    });
}

function messagesListMessage(sender, group) {
    return JSON.stringify({
        sender: sender,
        group: group,
        action: 'msgs'
    });
}

function groupsListMessage(sender) {
    return JSON.stringify({
        sender: sender,
        action: 'groups'
    });
}

function leaveGroupMessage(sender, group) {
    return JSON.stringify({
        sender: sender,
        group: group,
        action: 'leave'
    });
}



function inviteMessage(sender, group, dest) {
    return JSON.stringify({
        sender: sender,
        group: group,
        dest: dest,
        action: 'invite'
    });
}

function kickMessage(sender, group, dest, reason) {
    return JSON.stringify({
        sender: sender,
        group: group,
        dest: dest,
        reason: reason,
        action: 'kick'
    });
}

function banMessage(sender, group, dest, reason) {
    return JSON.stringify({
        sender: sender,
        group: group,
        dest: dest,
        reason: reason,
        action: 'ban'
    });
}

function unbanMessage(sender, group, dest) {
    return JSON.stringify({
        sender: sender,
        group: group,
        dest: dest,
        action: 'unban'
    });
}

function statesMessage(sender, group) {
    return JSON.stringify({
        sender: sender,
        group: group,
        action: 'states'
    });
}





module.exports = {
    privateMessage,
    broadcastMessage,
    listClientsMessage,
    quitMessage,
    helloMessage,
    groupMessage,
    joinGroupMessage,
    broadcastGroupMessage,
    membersListMessage,  // Aggiunto
    messagesListMessage, // Aggiunto
    groupsListMessage,   // Aggiunto
    leaveGroupMessage,
    inviteMessage,
    kickMessage,
    banMessage,
    unbanMessage,
    statesMessage   // Aggiunto
};
