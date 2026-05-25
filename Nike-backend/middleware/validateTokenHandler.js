const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");


//Hämta Token fråm auth:bearer (token) header


//verifiera token med access_token_secret som vi har i .env

//om giltigt: sätter req.user och kör next ();

// om ogiltigt: skickar 401 och stoppar kedjan 

const validateToken = asyncHandler(async(req, res, next) => {
    let token;

    //hämta token från authorization header
    let authHeader = req.headers.Authorization || req.headers.authorization;

    //kontrollera att header finns och börjar mer bearer
    if(authHeader && authHeader.startsWith("Bearer")){

        token = authHeader.split(" ")[1];

        //verifiera token
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, decoded) => {
            
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }

            //spara user-information i request
            req.user = decoded.user;

            //fortsätt till nästa middleware/controller
            next();

            }
        );
    }

    //om ingen token finns
    if(!token){
        res.status(401);
        throw new Error("No token, User is not authorized");
    }

});


module.exports = validateToken;