const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    parentId: {
      type: String,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
categorySchema.virtual("category", {
  ref: "Product",
  localField: "name",
  foreignField: "category",
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
