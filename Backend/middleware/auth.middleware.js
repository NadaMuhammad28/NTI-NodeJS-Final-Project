const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { resBuilder } = require("../helper/app.helper");

class Auth {
  static auth = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("bearer ", ""); // get token from header
      const decoded = jwt.verify(token, process.env.JWTKEY); //decode
      const userData = await userModel.findOne({
        //check token, id
        _id: decoded._id,
        "tokens.token": token,
      });
      if (!userData) throw new Error("Unauthorzed");
      req.token = token;
      req.user = userData;
      next();
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static authAdmin = async (req, res, next) => {
    try {
      if (req.user.userType != "admin") throw new Error("not admin");
      next();
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static authSuperAdmin = async (req, res, next) => {
    try {
      if (req.user.adminRole != "super") throw new Error("not the main admin");
      next();
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static authUser = async (req, res, next) => {
    try {
      if (req.user.userType != "user") throw new Error("not user");
      next();
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
}

module.exports = Auth;
