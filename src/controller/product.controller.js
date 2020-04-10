let Product = require('../models/product.model');

module.exports.getProducts = function (req, res) {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => console.log(err))
}

module.exports.getProduct = function (req, res) {
  const productId = req.params.productId
  Product.findByIdAndUpdate(productId, { $inc: { 'viewCounts': 1 } }).exec()
    .then((products) => res.json(products))
    .catch((err) => res.json('GET_PRODUCT_ERROR'))
}

module.exports.postProduct = function (req, res) {
  const { name, description, price, size, breed, gender, images } = req.body;
  const newProduct = new Product({ name, description, price, size, breed, gender, images });
  newProduct.save()
    .then(() => res.json('ADDED_PRODUCT'))
    .catch((err) => console.log(err))
}

module.exports.deleteProduct = function (req, res) {
  const { _id } = req.body;
  Product.findByIdAndDelete(_id)
    .then(() => res.json('DELETE_PRODUCT'))
    .catch((err) => console.log(err))
}

module.exports.putReviewProduct = function (req, res) {
  const { star, content, productId, username } = req.body;
  Product.findOne({ _id: productId })
    .then((product) => {
      var today = new Date();
      product.comment.items.push({
        content: content,
        name: username,
        date: today,
        star: star
      });
      product.comment.total++;
      product.save();
      res.json('REVIEW_SUCCESS')
    })
    .catch(e => console.log(e))

}
