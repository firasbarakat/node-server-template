var express = require('express');
var router = express.Router();

var authController = rootRequire('middleware/AuthMiddleWare');

router.get('/', authController, function(req, res, next) {
    res.send("Cities Controller Working");
});
router.get('/list', function(req, res, next) {
    res.send("Cities Controller Working");
});

module.exports = router;