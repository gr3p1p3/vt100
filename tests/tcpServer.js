/**
 * This example started a simple tcp-server:
 *  for each connected client a vt100-animation will sent.
 *
 *  to test this on your terminal "telnet localhost"
 */

const net = require('net');
const Player = require('../play');


const server = net.createServer(function onConnectedSocket(client) {
    console.log('Connected client from', client.remoteAddress);
    const p = Player('./animations/blinkeyes.vt',
        {clearBefore: false}) //need to deactivate default vt100's behaviour
        .on('data', function (data) {
            client.write(data); //send animation-data
        })
        .on('end', function () {
            client.write('\n\n\n\u001b[1000D\n\nHosted by @gr3p'); // send bye-message at begin of line
            client.destroy(); //destroy client-connection after animation is done
        });

    //handling error of disconnected clients
    client.on('error', function (error) {
        console.log('Error for', client.remoteAddress, error.message);
        p.destroy(); //destroy vt100-stream
    });
});

server.listen(23, '0.0.0.0', function () {
    console.log('Server was started!');
});