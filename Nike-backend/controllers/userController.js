const asyncHandler = require("express-async-handler");

const User = require("../models/userModels");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


//Registrera användare 
// POST /api/users/register
//denna ska vara public för alla ska kunna registrera sig kompis

//registrera användare
const registerUser = asyncHandler(async(req,res) => {
    
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Kan du vara snäll och fylla i alla fält kompis.");
    }

    //kolla om email redan finns i databasen
    const userAvailable = await User.findOne({email});

    if(userAvailable){
        res.status(400);
        throw new Error("Email finns redan...");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password", hashedPassword);

    //skapa en användare
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    console.log("User created my friend", user);
    
    //skicka tillbaka user data om skapandat lyckadses
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        });
    } else{    
    // Något gick fel med datan
    res.status(400);
    throw new Error("User data is not valid.");
}
    //response /nya user 

});
