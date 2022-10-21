const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    name: {
      type: String,
      trim: true,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: [
      {
        image: {
          type: String,
          trim: true,
          default: "download.png",
        },
      },
    ],

    qunatity: {
      type: Number,
      required: true,
      default: 0,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
    },

    //extra
    //reviews
    //color
    //size
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("product", productSchema);

module.exports = Product;
