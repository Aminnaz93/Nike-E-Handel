const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");

const {registerUser, loginUser, currentUser} = require("../controllers/userController");

const router = express.Router();

// POST /api/users/register - registrera användare (public)
router.post("/register", registerUser);


//POST /api/users/login - LOGIN (public)
router.post("/login", loginUser);


// GET /api/users/current - hämta inloggad användare (private)
router.get("/current", validateToken, currentUser);

module.exports = router;