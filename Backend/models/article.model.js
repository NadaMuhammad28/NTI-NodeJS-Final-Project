const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    body: {
      type: String,
      required: true,
      trim: true,
    },
    //date of the article
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
    image: {
      type: String,
      trim: true,
    },

    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],

    comments: [
      {
        comment: {
          commentBody: {
            type: String,
            required: true,
            trim: true,
          },
          userId: {
            type: mongoose.Schema.Types.ObjectId,
          },
          createdAt: {
            type: Date,
            default: () => Date.now(),
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
