const { resBuilder } = require("../helper/app.helper")
const articleModel = require("../models/article.model")
class Article{
    // add article
    static addArticle = async(req, res) =>{
        try{
            const article = new articleModel({...req.body, adminId:req.user._id})
            await article.save()
            resBuilder(res, true, article, "article added")
    } 
    catch(e){
        resBuilder(res, false, e, e.message)
    }
    }

    // show all articles
    
}
module.exports=Article