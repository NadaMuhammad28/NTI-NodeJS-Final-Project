const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema({
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
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("price must be +ve");
    },
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
  },

  category: {
    type: String,
    required: true,
  },

  //extra
  likes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],

  //reviews
  //color
  //size
});
const Product = mongoose.model("product", productSchema);

module.exports = Product;
