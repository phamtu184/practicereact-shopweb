var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller');
const auth = require('../middleware/authMiddleware');

/* GET home page. */
router.post('/login', controller.postLogin);

router.post('/register', controller.register);

router.get('/userslist', auth, controller.userlist);

router.get('/confirmation/:token', controller.confirmEmail);

module.exports = router;
