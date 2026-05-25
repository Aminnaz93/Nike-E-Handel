const express = require("express");
const router = express.Router();

//detta importerar controllers från productController.js
const {getAllProducts, getProductById} = require("../controllers/productController");


//Get api//products - hämta alla produkter (Public)
router.get("/", getAllProducts);


//GET /api/products/:id - hämta en produkt efter id(Public)
router.get(":id", getProductById);


module.exports = router;