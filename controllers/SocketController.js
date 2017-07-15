const io = require('socket.io');

function SocketController(server) {
    var socketIO = null;
    var clients = {}
    var clientMap = {};

    if (server === null) {
        return;
    }

    if (socketIO !== null) {
        socketCallbacks.push(callback);
        return;
    }

    socketIO = io(server);
    socketIO.on('connection', (socket) => {
        //Get Socket Info
        socket.emit('message', {
            command: 'getInfo',
            params: null
        });

        //Handle All Socket Messages
        socket.on('message', (data) => {
            data = Object.assign({}, data);
            data.socketId = socket.id;
            
            switch(data.command) {
                case 'info':
                    console.log("Socket Info: ", data.params);
                    break;
            }
        });

        socket.on('disconnect', () => {
            try {
                delete clientMap[clients[socket.id]];
            }
            catch (ex) { }
            try {
                delete clients[socket.id];
            }
            catch (ex) { }
        });
    });

    this.getClients = function() {
        return clients;
    };
    this.getClientMap = function() {
        return clientMap;
    };

    return socketIO;
}

module.exports = SocketController;