const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs-extra');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

//Import Server Configuration
var config = require('./config');

//Create the Multer TMP upload directory before using it in the setup
fs.mkdirsSync(path.join(__dirname, config.multer.dest));
//Config the Multer UPLOAD module
var multerUpload = multer({
    dest: config.multer.dest
});

//Global Variables
global.rootRequire = function (reqPath) {
    return require(path.join(__dirname, reqPath));
}
global.rootPath = __dirname;
global.ServerResponse = require('./models/ServerResponse');

//Custom Imports
var apiController = require('./controllers/APIController');
var socketController = require('./controllers/SocketController');

var app = express();

//setup middle ware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multerUpload.any());

//setup routes / controllers
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiController);

//Create HTTP server and attach Socket.IO
/*var server = null;
if (config.useHttps === true) {
    server = https.createServer({
        key: fs.readFileSync(path.join(__dirname, config.https.key)),
        cert: fs.readFileSync(path.join(__dirname, config.https.cert)),
        passphrase: config.https.passphrase
    }, app);
}
else {
    server = http.createServer(app);
}*/
var server = http.createServer(app);

server.listen(config.port, function () {
    console.log(`Server running on port ${config.port}`);

    global.socketIO = new socketController(server);
    socketIO.on('connection', function (socket) {
        console.log('Socket Connected ', socket.id);
    });
});