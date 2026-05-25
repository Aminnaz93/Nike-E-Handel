const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add a firstname"],
    },
    lastName: {
        type: String,
        required: [true, "Please add a lastname"],
    }, 
    email: {
        type: String,
        required: [true, "Please add a "],
        unique: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);