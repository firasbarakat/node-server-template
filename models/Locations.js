var fs = require('fs-extra');
var path = require('path');

module.exports = {
    findAll: function (callback) {
        fs.readFile(path.join(rootPath, 'data/locations.json'), 'utf8', function (err, data) {
            if (err) {
                callback(err, null);
            }
            else {
                try {
                    callback(null, JSON.parse(data));
                }
                catch (ex) {
                    callback(ex, null);
                }
            }
        });
    },
    findOne: function (condition, callback) {
        fs.readFile(path.join(rootPath, 'data/locations.json'), 'utf8', function (err, data) {
            if (err) {
                callback(err, null);
            }
            else {
                try {
                    var data = JSON.parse(data);
                    var conditionKey = Object.keys(condition)[0];
                    var foundItem = (data.filter(function (item) {
                        return item[conditionKey] == condition[conditionKey]
                    }) || [])[0];
                    callback(null, foundItem);
                }
                catch (ex) {
                    callback(ex, null);
                }
            }
        });
    },
    addOne: function (item, callback) {
        fs.readFile(path.join(rootPath, 'data/locations.json'), 'utf8', function (err, data) {
            if (err) {
                callback(err, null);
            }
            else {
                try {
                    var data = JSON.parse(data);
                    if(!data.hasOwnProperty(item.DeviceName)) {
                        data[item.DeviceName] = [];
                    }
                    data[item.DeviceName].push({
                        Latitude: item.Latitude,
                        Longitude: item.Longitude
                    });
                    fs.writeFile(path.join(rootPath, 'data/locations.json'), JSON.stringify(data), { encoding: 'utf8' }, function (err) {
                        if (err) {
                            callback(err, null);
                        }
                        else {
                            callback(null, item);
                        }
                    });
                }
                catch (ex) {
                    callback(ex, null);
                }
            }
        });
    },
    deleteOne: function(condition, callback) {
        fs.readFile(path.join(rootPath, 'data/locations.json'), 'utf8', function (err, data) {
            if (err) {
                callback(err, null);
            }
            else {
                try {
                    var data = JSON.parse(data);
                    var conditionKey = Object.keys(condition)[0];
                    var foundItem = (data.filter(function (item) {
                        return item[conditionKey] == condition[conditionKey]
                    }) || [])[0];
                    data.splice(data.indexOf(foundItem), 1);
                    fs.writeFile(path.join(rootPath, 'data/locations.json'), JSON.stringify(data), { encoding: 'utf8' }, function (err) {
                        if (err) {
                            callback(err, null);
                        }
                        else {
                            callback(null, foundItem);
                        }
                    });
                }
                catch (ex) {
                    callback(ex, null);
                }
            }
        });
    }
}