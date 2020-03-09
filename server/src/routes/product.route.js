var express = require('express');
var router = express.Router();
var controller = require('../controller/product.controller');

router.get('/getproduct', controller.getProduct);
router.post('/postproduct', controller.postProduct);

module.exports = router;