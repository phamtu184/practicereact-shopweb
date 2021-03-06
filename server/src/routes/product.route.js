var express = require("express");
var router = express.Router();
var controller = require("../controller/product.controller");

router.get("/products", controller.getProducts);
router.get("/product/:productId", controller.getProduct);
router.post("/product", controller.postProduct);
router.delete("/product", controller.deleteProduct);
router.put("/product", controller.putReviewProduct);
router.get("/catalog", controller.getCatalog);
router.post("/catalog", controller.postCatalog);
router.get("/filterproduct", controller.filterProduct);
module.exports = router;
