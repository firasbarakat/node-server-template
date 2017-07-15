var express = require('express');
var router = express.Router();

var fs = require('fs-extra');
var path = require('path');

var authController = rootRequire('middleware/AuthMiddleWare');
var Items = rootRequire('models/Items');

router.get('/', function (req, res, next) {
    var response = new ServerResponse();

    Items.findAll((err, items) => {
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

    socketIO.emit('message', {
        command: "controller",
        params: {
            name: "ItemsController"
        }
    });
});

router.get('/:id', function (req, res, next) {
    var response = new ServerResponse();

    Items.findOne({
        ID: req.params.id
    }, (err, item) => {
        if (err) {
            response.Error = true;
            response.ErrorNumber = -1;
            response.Result = err;
        }
        else {
            response.Result = item;
        }
        res.send(response.toJSON());
    });
});

router.post('/', authController, function (req, res, next) {
    var params = Object.assign({}, JSON.parse(req.body.data));

    var response = new ServerResponse();

    var item = {
        ID: 0,
        Name: params.Name
    }

    Items.findAll(function (err, data) {
        if (err) {
            response.Error = true;
            response.ErrorNumber = -1;
            response.Result = err;

            res.send(response.toJSON());
        }
        else {
            var maxID = 0;
            data.map(function (item) {
                if (item.ID > maxID) {
                    maxID = item.ID;
                }
            });
            item.ID = maxID + 1;

            Items.addOne(item, function (err, data) {
                if (err) {
                    response.Error = true;
                    response.ErrorNumber = -1;
                    response.Result = err;
                }
                else {
                    response.Result = data;
                }

                res.send(response.toJSON());
            });
        }
    });
});

router.delete('/:id', authController, function (req, res, next) {
    var response = new ServerResponse();

    Items.deleteOne({
        ID: req.params.id
    }, function (err, item) {
        if (err) {
            response.Error = true;
            response.ErrorNumber = -1;
            response.Result = err;
        }
        else {
            response.Result = item;
        }

        res.send(response.toJSON());
    });
});

module.exports = router;