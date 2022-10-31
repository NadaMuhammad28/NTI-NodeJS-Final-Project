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
    phone: {
      type: String,
      trim: true,
      required: true,
      validate: (value) => {
        if (!validator.isMobilePhone(value, "ar-EG"))
          throw new Error("invalid phone Number");
      },
    },
    governate: {
      type: String,
      trim: true,
      required: true,
    },

    flatNumber: {
      type: Number,
      trim: true,
      required: true,
    },
    floorNumber: {
      type: Number,
      trim: true,
      required: true,
    },

    orderItems: [],

    address: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
