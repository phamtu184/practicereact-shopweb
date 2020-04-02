var express = require('express');
var router = express.Router();
var controller = require('../controller/product.controller');

router.get('/product', controller.getProduct);
router.post('/product', controller.postProduct);
router.delete('/product', controller.deleteProduct);

module.exports = router;