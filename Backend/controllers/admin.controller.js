const adminModel = require("../models/user.model");
const { resBuilder } = require("../helper/app.helper");
const { objectId } = require("mongoose");

class Admin {
  //this is for the first admin
  static register = async (req, res) => {
    try {
      const userData = new adminModel(req.body);
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
  
  /*
  // add admin 
  static addAdmin = async(req,res)=>{
    try{
      const adminData = new adminModel(req.body)
      adminData.userType = "admin"
      await adminData.save()
      resBuilder(res, true, adminData, "admin added");
    }
    catch(e){
      resBuilder(res, false, e, e.message);
    }
  }
*/

// remove admin
static removeAdmin = async(req,res) =>{
  try{
    const adminData = await adminModel.findById(req.params.id)
    if(req.params.id == req.user.id) throw new Error ("you can't remove yourself")
    adminData.remove()
    resBuilder(res, true, null, "admin removed");
  }
  catch(e){
    resBuilder(res, false, e, e.message);
  }
}
 


  //show all admins
  static showAllAdmins = async (req, res) => {
    try {
      // const allAdmins = await (await adminModel.find()).filter((u) => u.userType != "user");
      const allAdmins = await adminModel.find({userType: "admin"})
      resBuilder(res, true, allAdmins, "all admins returned");
    } catch (e) {
      resBuilder(res, false, e, e.message);
    }
  };

  
}

module.exports = Admin;
