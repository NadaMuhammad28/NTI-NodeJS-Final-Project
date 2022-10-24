const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    status: {
      type: String,
      default: "processing",
      lowercase: true,
      enum: ["cancelled", "delivered", "shipped", "processing"],
    },

    phoneNumber: {
      type: String,
      trim: true,
      required: true,
      validate: (value) => {
        if (!validator.isMobilePhone(value, "ar-EG"))
          throw new Error("invalid phone Number");
      },
    },

    orderItems: [],
    /* orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1, required: true },
        //price: { type: Number, required: true }
      },
    ], */

    addresses: [
      {
        addrTye: {
          type: String,
          trim: true,
          required: true,
        },
        addrDetails: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
