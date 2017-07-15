var express = require('express');
var router = express.Router();

var fs = require('fs-extra');
var path = require('path');

var authController = rootRequire('middleware/AuthMiddleWare');
var Locations = rootRequire('models/Locations');

router.get('/', function (req, res, next) {
    var response = new ServerResponse();

    Locations.findAll((err, items) => {
        if (err) {
            response.Error = true;
            response.ErrorNumber = -1;
            response.Result = err;
        }
        else {
            response.Result = items;
        }
        res.send(response.toJSON());
    });
});

router.post('/', authController, function (req, res, next) {
    var response = new ServerResponse();

    var location = {
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
        DeviceName: req.body.DeviceName,
        TimeStamp: Date.now()
    }

    console.log("Locations ", location);

    Locations.addOne(location, function (err, data) {
        if (err) {
            response.Error = true;
            response.ErrorNumber = -1;
            response.Result = err;

            socketIO.emit('message', {
                command: "locationError",
                params: err
            });
        }
        else {
            response.Result = data;

            socketIO.emit('message', {
                command: "locationUpdate",
                params: data
            });
        }

        res.send(response.toJSON());
    });
});

module.exports = router;