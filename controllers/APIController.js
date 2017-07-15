var express = require('express');
var router = express.Router();

router.use('/cities', require('./CitiesController'));
router.use('/countries', require('./CountriesController'));
router.use('/items', require('./ItemsController'));
router.use('/locations', require('./LocationController'));

router.use('/', function(req, res, next) {
    res.send('API Controller Working');
});

module.exports = router;