const mongoose = require("mongoose");
const validator = require("validator");

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1, required: true },
        //price: { type: Number, required: true }
      },
    ],

    totalPrice: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
