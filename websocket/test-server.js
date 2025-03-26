/******************************************
 * Receive 5 messages
 *
 * Received by u1 (from client1.emit, io.on u1->u1)
 * Message1
 * Received by u1 (from client1.emit, io.sockets.on to u1)
 * Message1
 * Received by u1 (from client1.emit, io.sockets.on to u1)
 * Message2
 * Received by u2 (from client2.emit, io.on u2->u2)
 * Message2
 * Received by u2 (from client2.emit, io.sockets.on to u2)
 * Message2
 *
 * @type {lookup}
 */


var socketio = require('socket.io-client');

var socketURL = "http://localhost:3636";

var u1 = {'nick':'User1', 'msg':'Message1'};
var u2 = {'nick':'User2', 'msg':'Message2'};

describe("Chat Server",function(){
    it('Should broadcast new user to all users', function(done){
        var client1 = socketio.connect(socketURL)

        client1.on('connect', function(data){

            client1.emit('send', {type: 'notice', message: u1.msg, nick: u1.nick });

            //Since first client is connected, we connect the second client.
            var client2 = socketio.connect(socketURL)

            client2.on('connect', function(data){
                client2.emit('send', {type: 'notice', message: u2.msg, nick: u2.nick });
            });

            client2.on('message', function(data){
                console.log("Received by u2")
                if (data.type == "notice") {
                    console.log(data.message)
                }
                // client2.disconnect();
            });
        });

        client1.on('message', function(data){
            console.log("Received by u1")
            if (data.type == "notice") {
                console.log(data.message)
            }
            // client1.disconnect();
        });

        done();
    });

});

