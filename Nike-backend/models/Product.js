const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
    },
    category: {
        type: String,
        required: [true, "Please add a category"],
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
},

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);