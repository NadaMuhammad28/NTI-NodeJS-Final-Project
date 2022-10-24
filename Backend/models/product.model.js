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
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      trim: true,
    },
    /*
    images: [
      {
        image: {
          type: String,
          trim: true,
          default: "download.png",
        },
      },
    ],*/
    /*
    qunatity: {
      type: Number,
      required: true,
      default: 0,
    },
    */

    description: {
      type: String,
      required: true,
      trim: true,
    } /*
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
    },*/,

    //extra
    //reviews
    //color
    //size
  },
  {
    timestamps: true,
  }
);
productSchema.methods.toJSON = function () {
  const product = this.toObject();
  delete product.__v;
  return product;
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
