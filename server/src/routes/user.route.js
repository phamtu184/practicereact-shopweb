var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller');
const auth = require('../middleware/authMiddleware');

/* GET home page. */

router.get('/userslist', auth, controller.userlist);

module.exports = router;
