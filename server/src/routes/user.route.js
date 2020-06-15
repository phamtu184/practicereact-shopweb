var express = require("express");
var router = express.Router();
var controller = require("../controller/user.controller");
const auth = require("../middleware/authMiddleware");

/* GET home page. */

router.post("/userslist", auth, controller.userlist);

router.put("/cart", controller.postToCart);

router.post("/cart", controller.getCart);

module.exports = router;
