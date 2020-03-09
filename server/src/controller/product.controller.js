let Product = require('../models/product.model');

module.exports.getProduct = function(req, res){
  Product.find()
  .then((products)=> res.json(products))
  .catch((err)=>console.log(err))
}

module.exports.postProduct = function(req, res) {
  const { name, desc, price, size, type, gender, images} = req.body;
  const newProduct = new Product({name, desc, price, size, type, gender, images});
  newProduct.save()
  .then((product) => res.json('ADDED_PRODUCT'))
  .catch((err)=>console.log(err))
}