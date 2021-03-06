let User = require("../models/user.model");
let Product = require("../models/product.model");

module.exports.userlist = function (req, res) {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
};

module.exports.postToCart = function (req, res) {
  const { userId, cart } = req.body;
  User.findByIdAndUpdate(userId, { cart: cart }).then();
};

module.exports.getCart = async function (req, res) {
  const { userId } = req.body;
  console.log(userId);
  const productId = await User.findOne({ _id: userId }, "cart");
  if (productId.cart) {
    const records = await Product.find().where("_id").in(productId.cart).exec();
    res.json(records);
  }
};
