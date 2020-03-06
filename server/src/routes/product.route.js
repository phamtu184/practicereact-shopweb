var express = require('express');
var router = express.Router();
var controller = require('../controller/product.controller');

router.get('/getProduct', controller.getProduct);
router.post('/postProduct', controller.postProduct);

module.exports = router;