let Product = require('../models/product.model');

module.exports.getProducts = function (req, res) {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => console.log(err))
}

module.exports.getProduct = function (req, res) {
  const productId = req.params.productId
  Product.findById(productId)
    .then((products) => res.json(products))
    .catch((err) => res.json('GET_PRODUCT_ERROR'))
}

module.exports.postProduct = function (req, res) {
  const { name, description, price, size, breed, gender, images } = req.body;
  const newProduct = new Product({ name, description, price, size, breed, gender, images });
  newProduct.save()
    .then((product) => res.json('ADDED_PRODUCT'))
    .catch((err) => console.log(err))
}

module.exports.deleteProduct = function (req, res) {
  const { _id } = req.body;
  Product.findByIdAndDelete(_id)
    .then(() => res.json('DELETE_PRODUCT'))
    .catch((err) => console.log(err))
}
