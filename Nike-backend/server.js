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

