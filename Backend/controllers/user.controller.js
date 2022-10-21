const { resBuilder } = require("../helper/app.helper");
const userModel = require("../models/user.model");

class User {
  static register = async (req, res) => {
    try {
      const userData = new userModel(req.body);
      userData.userType = "user";
      await userData.save();
      resBuilder(res, true, userData, "added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static login = async (req, res) => {
    try {
      const userData = await userModel.login(
        req.body.username,
        req.body.password
      );
      const token = await userData.generateToken();
      resBuilder(res, true, { userData, token }, "logged in");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  //logout
  static logout = async (req, res) => {
    try {
      req.user.tokens.filter((t) => t.token != req.token);
      resBuilder(res, true, null, "logged out");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
  //logoutall

  static logoutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      resBuilder(res, true, null, "logged out from all devices");
    } catch (e) {}
  };
  static profile = async (req, res) => {};

  static editProfile = async (req, res) => {
    try {
      //custom allowed edits
      const allowedEdits = ["name", "email", "username", "profileImage"];
      const keys = Object.keys(req.body);
      //check if the body contains forbiddedn keys
      const isValid = keys.every((el) => allowedEdits.includes(el));
      if (!isValid) throw new Error("invaild edit keys");
      //save updates
      keys.forEach((k) => (req.user[k] = req.body[k]));
      await req.user.save();
      resBuilder(res, true, req.user, "Updated");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
}
module.exports = User;
