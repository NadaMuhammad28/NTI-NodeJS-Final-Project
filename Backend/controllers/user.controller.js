const { resBuilder } = require("../helper/app.helper");
const userModel = require("../models/user.model");

class User {
  // register
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

  //login
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
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
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
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  // get profile
  static profile = async (req, res) => {
    resBuilder(res, true, req.user, "data fetched");
  };

  //activate and deactivate account
  static changeStatus = async (req, res) => {
    try {
      if (req.header("status") == "activate") {
        if (req.user.status) throw new Error("already activate");
        req.user.status = true;
        await req.user.save();
      } else if (req.header("status") == "deactivate") {
        if (!req.user.status) throw new Error("already deactivate");
        req.user.status = false;
        await req.user.save();
      } else throw new Error("invalid status");
      resBuilder(res, true, req.user, "changed");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  // edit profile
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

  //add profile image
  static addImgProfile = async (req, res) => {
    try {
      req.user.profileImage = req.file.path.replace("public\\", "");
      await req.user.save();
      resBuilder(res, true, req.user, "Updatedprofile image done");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
}
module.exports = User;
