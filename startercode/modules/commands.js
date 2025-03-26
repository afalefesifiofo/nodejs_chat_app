const kleur = require('kleur');
const debug = require('debug')('client');
const messageFactory = require('./messageFactory');

// Funzione per gestire le entrate utente
function handleInput(input, client, name, rl) {
    const parts = input.split(';');
    const command = parts[0];

    switch (command) {
        case 's':
            if (parts.length === 3) {
                const receiver = parts[1];
                const message = parts[2];
                const privateMessage = messageFactory.privateMessage(name, receiver, message);
                client.write(privateMessage);
                debug(kleur.green(`Sent: ${privateMessage}`));
            } else {
                debug(kleur.red('Invalid send command. Use the format: s;receiver;message'));
            }
            break;

        case 'b':
            if (parts.length === 2) {
                const message = parts[1];
                const broadcastMessage = messageFactory.broadcastMessage(name, message);
                client.write(broadcastMessage);
                debug(kleur.blue(`Sent: ${broadcastMessage}`));
            } else {
                debug(kleur.red('Invalid broadcast command. Use the format: b;message'));
            }
            break;

        case 'ls':
            const listMessage = messageFactory.listClientsMessage(name);
            client.write(listMessage);
            debug(kleur.yellow('Sent: client-list-clients'));
            break;

        case 'q':
            const quitMessage = messageFactory.quitMessage(name);
            client.write(quitMessage);
            client.end();
            debug(kleur.magenta('Sent: client-quit'));
            rl.close();
            break;

        case 'hello':
            const helloMessage = messageFactory.helloMessage(name);
            client.write(helloMessage);
            debug(kleur.cyan('Sent: client-hello'));
            break;

        case 'cg':
            if (parts.length === 2) {
                const groupName = parts[1];
                const groupMessage = messageFactory.groupMessage(name, groupName);
                client.write(groupMessage);
                debug(kleur.magenta(`Sent: ${groupMessage}`));
            } else {
                debug(kleur.red('Invalid create group command. Use the format: cg;group_name'));
            }
            break;

        case 'j':
            if (parts.length === 2) {
                const groupName = parts[1];
                const joinGroupMessage = messageFactory.joinGroupMessage(name, groupName);
                client.write(joinGroupMessage);
                debug(kleur.cyan(`Sent: ${joinGroupMessage}`));
            } else {
                debug(kleur.red('Invalid join group command. Use the format: j;group_name'));
            }
            break;

        case 'bg':
            if (parts.length === 3) {
                const groupName = parts[1];
                const messageContent = parts[2];
                const broadcastGroupMessage = messageFactory.broadcastGroupMessage(name, groupName, messageContent);
                client.write(broadcastGroupMessage);
                debug(kleur.blue(`Sent: ${broadcastGroupMessage}`));
            } else {
                debug(kleur.red('Invalid broadcast group command. Use the format: bg;group_name;message_content'));
            }
            break;

        case 'members':
            if (parts.length === 2) {
                const groupName = parts[1];
                const membersListMessage = messageFactory.membersListMessage(name, groupName);
                client.write(membersListMessage);
                debug(kleur.green(`Sent: ${membersListMessage}`));
            } else {
                debug(kleur.red('Invalid members command. Use the format: members;group_name'));
            }
            break;

        case 'messages':
            if (parts.length === 2) {
                const groupName = parts[1];
                const messagesListMessage = messageFactory.messagesListMessage(name, groupName);
                client.write(messagesListMessage);
                debug(kleur.green(`Sent: ${messagesListMessage}`));
            } else {
                debug(kleur.red('Invalid messages command. Use the format: messages;group_name'));
            }
            break;

        case 'groups':
            const groupsListMessage = messageFactory.groupsListMessage(name);
            client.write(groupsListMessage);
            debug(kleur.green('Sent: group-list'));
            break;

        case 'leave':
            if (parts.length === 2) {
                const groupName = parts[1];
                const leaveGroupMessage = messageFactory.leaveGroupMessage(name, groupName);
                client.write(leaveGroupMessage);
                debug(kleur.magenta(`Sent: ${leaveGroupMessage}`));
            } else {
                debug(kleur.red('Invalid leave group command. Use the format: leave;group_name'));
            }
            break;

        case 'invite':
            if (parts.length === 3) {
                const groupName = parts[1];
                const receiverName = parts[2];
                const inviteMessage = messageFactory.inviteMessage(name, groupName, receiverName);
                client.write(inviteMessage);
                debug(kleur.green(`Sent: ${inviteMessage}`));
            } else {
                debug(kleur.red('Invalid invite command. Use the format: invite;group_name;dest'));
            }
            break;

        case 'kick':
            if (parts.length === 4) {
                const groupName = parts[1];
                const receiverName = parts[2];
                const reason = parts[3];
                const kickMessage = messageFactory.kickMessage(name, groupName, receiverName, reason);
                client.write(kickMessage);
                debug(kleur.red(`Sent: ${kickMessage}`));
            } else {
                debug(kleur.red('Invalid kick command. Use the format: kick;group_name;dest;reason'));
            }
            break;

        case 'ban':
            if (parts.length === 4) {
                const groupName = parts[1];
                const receiverName = parts[2];
                const reason = parts[3];
                const banMessage = messageFactory.banMessage(name, groupName, receiverName, reason);
                client.write(banMessage);
                debug(kleur.red(`Sent: ${banMessage}`));
            } else {
                debug(kleur.red('Invalid ban command. Use the format: ban;group_name;dest;reason'));
            }
            break;

        case 'unban':
            if (parts.length === 3) {
                const groupName = parts[1];
                const receiverName = parts[2];
                const unbanMessage = messageFactory.unbanMessage(name, groupName, receiverName);
                client.write(unbanMessage);
                debug(kleur.green(`Sent: ${unbanMessage}`));
            } else {
                debug(kleur.red('Invalid unban command. Use the format: unban;group_name;dest'));
            }
            break;

        case 'states':
            if (parts.length === 2) {
                const groupName = parts[1];
                const statesMessage = messageFactory.statesMessage(name, groupName);
                client.write(statesMessage);
                debug(kleur.green(`Sent: ${statesMessage}`));
            } else {
                debug(kleur.red('Invalid states command. Use the format: states;group_name'));
            }
            break;

        default:
            debug(kleur.red(`Unknown command: ${input}`));
            break;
    }
}

module.exports = {
    handleInput
};
