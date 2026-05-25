const express = require("express");
const router = express.Router();
//importerar controllers från orderController..js
const {createOrder, getOrder} = require("../controllers/orderController");

//importera validateToken middleware
const validateToken = require("../middleware/validateTokenHandler");


// POST /api/orders - skapa en order (private)
router.post("/", validateToken,createOrder);

// GET /api/orders - hämta mina orders (private)
router.get("/", validateToken,getOrder);

module.exports = router;


