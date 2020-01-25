var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller');

/* GET home page. */
router.post('/login', controller.postLogin);

router.post('/register', controller.register);

router.get('/userlist', controller.userlist);

module.exports = router;
