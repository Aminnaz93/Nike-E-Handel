const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModels");

//Skapa en order 
//POST /api/orders
//Private - måste vara inloggad
const createOrder = asyncHandler(async(req,res) => {
    
    //Hämta data från body
    const { items,totalPrice, paymentMethod } = req.body;


    //validera input
    if(!items || !totalPrice || !paymentMethod){
        res.status(400);
        throw new Error("Snälla fyll i alla fält!");
    }

    //skapa order i databasen
    const order = await Order.create({
        user: req.user.id,
        items,
        totalPrice,
        paymentMethod,
    });



    //skicka tillbaka ordern om den skapades
    if(order){
        res.status(201).json(order);
    } else{
        res.status(400);
        throw new Error("Något gick fel med ordern!");
    }

});



//ovanför create Order
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//nedaför hämta alla orders för inloggade användare


// Hämta alla orders för inloggad användare
// GET /api/orders
// Private - måste vara inloggad
const getOrder = asyncHandler(async(req,res) => {

    //hämta bara order som tillhör den som är inloggad.
    const orders = await Order.find({user: req.user.id});

    res.status(200).json(orders);

});



module.exports = {createOrder, getOrder};