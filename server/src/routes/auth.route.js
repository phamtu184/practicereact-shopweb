var express = require('express');
var router = express.Router();
var controller = require('../controller/auth.controller');

router.post('/login', controller.postLogin);

router.post('/register', controller.register);

router.get('/islogin', controller.islogin);
router.post('/islogin', controller.islogout);

router.post('/confirmemail', controller.sendMail);

router.post('/activeemail', controller.confirmEmail);

module.exports = router;