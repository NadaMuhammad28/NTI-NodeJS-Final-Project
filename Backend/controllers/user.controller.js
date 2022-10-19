const {resBuilder} = require("../helper/app.helper")
const userModel = require("../models/user.model")

class User{

    static register = async(req,res)=>{
        try{
            const userData =new userModel(req.body)
            userData.userType="user"
            await userData.save()
            resBuilder(res,true, userData, "added")
        }
        catch(e){
            resBuilder(res,false, e, e.message)
        }
    }

    static login = async(req,res)=>{
        try{
            const userData = await userModel.login(req.body.userName, req.body.password)
            const token = await userData.generateToken()
            resBuilder(res,true, {userData, token}, "logged in")
        }
        catch(e){
            resBuilder(res,false, e, e.message)
        }
    }

}
module.exports=User