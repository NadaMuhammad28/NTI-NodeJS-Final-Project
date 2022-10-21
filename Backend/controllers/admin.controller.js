const userModel = require("../models/user.model");
const { resBuilder } = require("../helper/app.helper");
const { objectId } = require("mongoose");

class Admin {
  //this is for the first admin
  static register = async (req, res) => {
    try {
      const userData = new userModel(req.body);
      userData.userType = "admin";
      await userData.save();
      resBuilder(res, true, userData, "added");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static addAdmin = async (req, res) => {
    this.register(req, res);
  };

  static showAllUsers = async (req, res) => {
    try {
      const allUSers = await userModel.find();
      resBuilder(res, true, allUSers, "all users returned");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static showAllAdmins = async (req, res) => {
    try {
      const allAdmins = await (
        await userModel.find()
      ).filter((u) => u.userType != "user");
      resBuilder(res, true, allAdmins, "all users returned");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  static deleteUSer = async (req, res) => {
    try {
      const deletedUSer = await userModel.findByIdAndDelete(req.params.userId);
      resBuilder(res, true, null, "user is removed successfully");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };
}

module.exports = Admin;
