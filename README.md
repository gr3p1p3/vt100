# VT100.js

Player for VT100-Animations.
Play & enjoy old school animations on your terminal.

## Intro

VT100-Animations are files containing special [escaped character sequences](https://en.wikipedia.org/wiki/ANSI_escape_code), that old [VT100-Terminals](https://en.wikipedia.org/wiki/VT100) recognize and render.

Every modern Terminal can emulate this behaviours, but unfortunately they are too fast for this goal.
 
[VT100.js](https://www.npmjs.com/package/vt100) comes to the rescue!

## Quickstart

### Install

```bash
nmp -g install vt100
```


### Enjoy
```bash
curl https://raw.githubusercontent.com/gr3p1p3/vt100/master/animations/blinkeyes.vt | vt100
```

or 

```bash
vt100 --src=absolute/path/to/file.vt
```

### Enjoy more

You will find more animations hosted on official [vt100 GitHub](https://github.com/gr3p1p3/vt100/tree/master/animations) repository.


## JS-API

You can use [VT100.js](https://www.npmjs.com/package/vt100) not only as [CLI](https://en.wikipedia.org/wiki/Command-line_interface), but for implement your own software too.

### Example

This implement a simple [TCP-Server](https://nodejs.org/api/net.html#net_class_net_server) that listens on a certain port and send Animation to each connected client.


```javascript
const net = require('net');
const Player = require('vt100');

const server = net.createServer(function onConnectedSocket(client) {
    return Player('./path/to/absolute/file.vt',
        {clearBefore: false}) //need to deactivate default vt100's behaviour
        .on('data', function (data) {
            client.write(data); //send animation-data
        })
        .on('end', function () {
            client.write('\n\n\n\u001b[1000DHosted by @gr3p'); // send bye-message at begin of line
            client.destroy(); //destroy client-connection after animation is done
        })
});

server.listen(23, '0.0.0.0', function () {
    console.log('Server was started!');
});
```

Test:

```bash
telnet localhost
```

## Bugs & Issues

This is actually a beta, fixes & issues are welcome.