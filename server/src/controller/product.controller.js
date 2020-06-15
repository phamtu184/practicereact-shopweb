let Product = require("../models/product.model");
let Catalog = require("../models/catalog.model");

module.exports.getProducts = function (req, res) {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => console.log(err));
};

module.exports.getProduct = function (req, res) {
  const productId = req.params.productId;
  Product.findByIdAndUpdate(productId, { $inc: { viewCounts: 1 } })
    .exec()
    .then((products) => res.json(products))
    .catch((err) => res.json("GET_PRODUCT_ERROR"));
};

module.exports.postProduct = function (req, res) {
  const { name, description, price, size, breed, gender, images } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
    size,
    breed,
    gender,
    images,
  });
  newProduct
    .save()
    .then(() => res.json("ADDED_PRODUCT"))
    .catch((err) => console.log(err));
};

module.exports.deleteProduct = function (req, res) {
  const { _id } = req.body;
  Product.findByIdAndDelete(_id)
    .then(() => res.json("DELETE_PRODUCT"))
    .catch((err) => console.log(err));
};

module.exports.putReviewProduct = function (req, res) {
  const { star, content, productId, username } = req.body;
  Product.findOne({ _id: productId })
    .then((product) => {
      var today = new Date();
      const rs =
        product.comment.items.reduce((total, next) => total + next.star, star) /
        (product.comment.total + 1);
      product.comment.items.push({
        content: content,
        name: username,
        date: today,
        star: star,
      });
      if (rs === 0 || isNaN(rs)) {
        product.rates = star;
      }
      if (!isNaN(rs)) {
        product.rates = rs;
      }
      product.comment.total++;
      product.save();
      res.json("REVIEW_SUCCESS");
    })
    .catch((e) => console.log(e));
};

module.exports.getCatalog = function (req, res) {
  Catalog.find()
    .then((cata) => res.json(cata))
    .catch((err) => console.log(err));
};
module.exports.postCatalog = async function (req, res) {
  const { catalog } = req.body;
  const newCatalog = new Catalog({ name: catalog });
  newCatalog
    .save()
    .then(() => res.status(200).json("ADDED_PRODUCT"))
    .catch((err) => res.status(400).json("fail"));
};
module.exports.filterProduct = async function (req, res) {
  const { size, breed, valuePrice } = req.query;
  const query = [];
  if (size) {
    query.push({ size: { $regex: size, $options: "i" } });
  }
  if (breed) {
    query.push({ breed: { $regex: breed, $options: "i" } });
  }
  if (valuePrice) {
    query.push({ price: { $gt: valuePrice[0], $lt: valuePrice[1] } });
  }
  const rs = await Product.find({ $and: query }).lean();
  res.json(rs);
};
