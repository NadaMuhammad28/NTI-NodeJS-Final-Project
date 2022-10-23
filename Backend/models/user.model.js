const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 20,
    },

    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      //match:
    },

    email: {
      type: String,
      trim: true,
      validate: function (value) {
        if (!validator.isEmail(value)) throw new Error("invalid Email format");
      },
    },

    status: {
      type: Boolean,
      default: false,
    },

    phoneNumber: {
      type: Number,
      trim: true,
      validate: (value) => {
        if (!validator.isMobilePhone(value, "ar-EG"))
          throw new Error("invalid phone Number");
      },
    },
    
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["male", "female"],
    },

    profileImage: {
      type: String,
      trim: true,
      default: "download.png",
    },

    addresses: [
      {
        addrTye: {
          type: String,
          trim: true,
        },
        addrDetails: {
          type: String,
          trim: true,
        },
      },
    ],

    userType: {
      type: String,
      // required: true,
      trim: true,
      lowercase: true,
      default: "user",
      enum: ["admin", "user"],
    },

    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("adminPosts", {
  ref: "Article",
  localField: "_id",
  foreignField: "adminId",
});

userSchema.virtual("userComments", {
  ref: "Article",
  localField: "_id",
  foreignField: "comments.userId",
});

userSchema.virtual("userLikes", {
  ref: "Article",
  localField: "_id",
  foreignField: "likes.userId",
});

userSchema.methods.toJSON = function () {
  const userData = this.toObject();
  delete userData.__v;
  delete userData.tokens;
  delete userData.password;
  return userData;
};

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

userSchema.statics.login = async (username, password) => {
  const userData = await User.findOne({ username });
  if (!userData) throw new Error("invalid username");
  const isvalid = await bcrypt.compare(password, userData.password);
  if (!isvalid) throw new Error("invalid password");
  if(userData.tokens.length > 5) throw new Error ("too many logins")
  return userData;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWTKEY);
  user.tokens.push({ token });
  await user.save();
  return token;
};


// remove user or admin
const articleModel = require("./article.model");
userSchema.pre("remove", async function (next) {
  await articleModel.deleteMany({ adminId: this._id });
  // remove user comments
  
  //remove user likes
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
