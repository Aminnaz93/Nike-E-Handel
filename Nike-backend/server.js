//EXpress = webbramverk för att bygga backend server (Routes)
const express = require("express");

//dotenv = läsa vad som står i .env filen
const dotenv = require("dotenv").config();

//Importera routes

//cors är ett paket som låter min frontend prata med backend när dem körs på olika portar. (frontend kan göra anrop från port5173) till backend (port 3000)
const cors = require("cors");

//importerar databasens connection
const connectDB = require("./config/dbConnection");

//koppla upp mot databas (mongodb)
connectDB();

//skapar en express-server
const app = express();


//middleware för att läsa json från body

//tillåt anrop från frontend på port 5173
app.use(cors({
    origin: "http://localhost:5173",
}),
);


//Routes





//starta server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servern är igång på på ${PORT}`);
});