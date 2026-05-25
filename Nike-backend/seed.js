const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Product = require("./models/productModels");
const connectDB = require("./config/dbConnection");


const products = [
  {
    name: "Nike Vomero Plus",
    price: 1799,
    category: "skor",
    image: "/src/assets/nike-products/NIKE+VOMERO+PLUS+CM.avif",
    description: "Nike Vomero Plus löparsko för hårt underlag",
  },
  {
    name: "Nike Air Max Moto 2K",
    price: 1599,
    category: "skor",
    image: "/src/assets/nike-products/NIKE+AIR+MAX+MOTO+2K.avif",
    description: "Nike Air Max Moto 2K",
  },
  {
    name: "FC Barcelona 2025/26 Match Dri-FIT",
    price: 1299,
    category: "kläder",
    image: "/src/assets/nike-products/FCB+M+NK+DFADV+JSY+SS+MATCH+SE.avif",
    description: "FC Barcelona matchtröja 2025/26",
  },
  {
    name: "Nike Club Fleecetroja",
    price: 699,
    category: "kläder",
    image: "/src/assets/nike-products/M+NK+CLUB+BB+CREW.avif",
    description: "Nike Club fleecetroja med rund hals",
  },
  {
    name: "NikeCourt Victory Shorts 18cm",
    price: 499,
    category: "shorts",
    image: "/src/assets/nike-products/M+NKCT+DF+VCTRY+SHORT+7IN.avif",
    description: "NikeCourt Victory Dri-FIT tennisshorts",
  },
  {
    name: "NikeCourt Advantage Shorts 15cm",
    price: 449,
    category: "shorts",
    image: "/src/assets/nike-products/M+NKCT+DF+ADVTG+6IN+SHORT.avif",
    description: "NikeCourt Advantage Dri-FIT tennisshorts",
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    console.log("Gamla produkter borttagna ✓");
    await Product.insertMany(products);
    console.log("Produkter inlagda i databasen! ✓");
    process.exit();
  } catch (error) {
    console.log("Något gick fel:", error);
    process.exit(1);
  }
};


seedDB();