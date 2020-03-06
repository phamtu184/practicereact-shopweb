let Product = require('../models/product.model');

module.exports.getProduct = (res, req) =>{
  
}

module.exports.postProduct = (res, req) =>{
  const { name, description, price, size, type, gender, images} = req.body;
  const newProduct = new Product({name, description, price, size, type, gender, images});
  newProduct.save()
  .then((product) => res.json('added product'));
}