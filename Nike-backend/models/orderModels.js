const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
          required: [true, "Please add a name"],
        },
        price: {
          type: Number,
          required: [true, "Please add a price"],
        },
        quantity: {
          type: Number,
          required: [true, "Please add a quantity"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Please add a total price"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Please add a payment method"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);