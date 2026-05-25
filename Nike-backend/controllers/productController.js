const asyncHandler = require("express-async-handler");
//(Product) = modellen från models/Product.js
//används för att prata med products-tabellen i databasen
const Product = require("../models/productModels");


//Hämta alla produkter
//Get 
// /api/products
const getAllProducts = asyncHandler(async(req, res) => {
    //denna hämtar alla produkter från databasen
    const products = await Product.find();

    res.status(200).json(products);
});


//hämta en produkt via id i databasen
//GET
// /api/products/:id
const getProductById = asyncHandler(async(req, res) => {
    //hämtar produkten med det id som skickas till den url
    const product = await Product.findById(req.params.id);

    // en check om produkten finns ens. om produkten inte finns
    if(!product){
        res.status(400);

        throw new Error("Produkten hittades inte tyvärr kompis....");
    }

    res.status(200).json(product);

});


module.exports = {getAllProducts, getProductById};