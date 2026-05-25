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

//Ovanför regisstrera användare
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Nedanför Logga in


//logga in användare
//POST /api/users/login
const loginUser = asyncHandler(async(req,res) => {

    //hämta data 
    const {email, password} = req.body;

    // validera input 
    if(!email || !password) {
        res.status(400);
        throw new Error("Snälla fyll i alla fält!");
    }

    //Checka om användaren finns i databasen
    const user = await User.findOne({email});


    //jämföra input med databasen . email och password ska vara correct så man kan logga in 
    if(user && (await bcrypt.compare(password, user.password))){

        //skapa JWT- token
        const accessToken = jwt.sign({
            user: {
                username: user.name,
                email: user.email,
                id: user.id,
            },
        },

            //DETTA ÄR HEMLIGA NYCKELN FRÅN .env
            process.env.ACCESS_TOKEN_SECRET,

            //HUR LÄNGE TOKEN SKA GÄLLA
            {expiresIn: "15"}
        );

        res.status(200).json({accessToken});
    } else{
        res.status(401);
        throw new Error("Email eller lösenord är fel");
    }

});


// Ovanför Logga in user
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Nedanför är hämta current user


//@desc get cirremt user
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});



module.exports = {registerUser, loginUser, currentUser};


