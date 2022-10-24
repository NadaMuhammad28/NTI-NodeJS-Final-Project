const { resBuilder } = require("../helper/app.helper")
const articleModel = require("../models/article.model")
class Article{

    // add article by admin
    static addArticle = async(req, res) =>{
        try{
            const article = new articleModel(req.body)
            article.image = req.file.path.replace("public\\","")
            article.adminId = req.user._id
            await article.save()
            resBuilder(res, true, article, "article added")
    } 
    catch(e){
        resBuilder(res, false, e, e.message)
    }
    }

    //edit article 
    static editArticle = async(req, res) =>{
        try{
            const article = await articleModel.findById(req.params.id)
            article.title = req.body.title
            article.body = req.body.body
            await article.save()
            resBuilder(res, true, article, "article edited")
        }
        catch(e){
            resBuilder(res, false, e, e.message)
        }
    } 

    //edit image   ....wrong
    static editImage = async(req, res) =>{
        try{
            
            const article = await articleModel.findById(req.params.id)
            article.image = req.file.path.replace("public\\","")
            await article.save()
            resBuilder(res, true, article, "image edited")
        }
        catch(e){
            resBuilder(res, false, e, e.message)
        }
    } 

    // remove article by admin  
    static removeArticle = async(req,res) =>{
        try{
          await articleModel.findByIdAndDelete(req.params.id)  // id article 
          resBuilder(res, true, null, "article removed");
        }
        catch(e){
          resBuilder(res, false, e, e.message);
        }
      }

     // show all articles by user and admin
     static allArticles = async(req,res)=>{
        try{
            const articles = await articleModel.find()
            resBuilder(res, true, articles, "all articles fetched");
        }
        catch(e){
            resBuilder(res, false, e, e.message);
        }
    }

    // show my articles by admin   ....wrong
    static myArticles = async(req,res)=>{
        try{
            const articles = await articleModel.findById(req.params.id)   // admin id
            console.log(articles)
            resBuilder(res, true, articles, "my articles fetched");
        }
        catch(e){
            resBuilder(res, false, e, e.message);
        }
    }

    // add comment by user
    static addComment = async(req, res) =>{
        try{
            const article = await articleModel.findById(req.params.id)  // id article
            article.comments.push({comment:{commentBody:req.body.commentBody ,userId:req.user._id}})
            await article.save()
            resBuilder(res, true, article, "comment added")
        }
        catch(e){
            resBuilder(res, false, e, e.message)
        }  
    }

    // remove comment by user  
    static removeComment = async(req,res) =>{
    try{
      const commentData = await articleModel.findById(req.params.articleId)  // id article / id comment 
      commentData.comments = commentData.comments.filter((el)=> el._id != req.params.id)
      await commentData.save()
      resBuilder(res, true, commentData, "comment removed");
    }
    catch(e){
      resBuilder(res, false, e, e.message);
    }
  }

  // show all comments for article by user and admin
  static allComments = async(req,res)=>{
    try{
        const commentData = await articleModel.findById(req.params.id)  // id article
        resBuilder(res, true, commentData.comments, "all comments fetched")
    }
    catch(e){
        resBuilder(res, false, e, e.message);
    }
}

  // edit comment by user   .... wrong
  static editComment = async(req, res) =>{
    try{
        const comment = await articleModel.findById(req.params.id)   //id comment
        comment.commentBody = req.body.commentBody
        resBuilder(res, true, comment, "comment updated")
    }
    catch(e){
        resBuilder(res, false, e, e.message)
    }  
}

// like article
static likeArticle = async(req, res) =>{
    try{
        const article = await articleModel.findById(req.params.id)  // id article 
        const check = article.likes.find(el=>el.userId.toString() == req.user._id.toString())
        if(check) throw new Error("already liked")
        article.likes.push({userId: req.user._id})
        await article.save()
        resBuilder(res, true, article, "like done");
    }
    catch(e){
        resBuilder(res, false, e, e.message)
    }
}

// unlike article  
static unlikeArticle = async(req, res) =>{
    try{
        const article = await articleModel.findById(req.params.id)  // id article
        const check = article.likes.find(el=>el.userId.toString() == req.user._id.toString())
        if(!check) throw new Error("already unlike")
        article.likes = article.likes.filter((el)=> el.userId == req.user._id)
        await article.save()
        resBuilder(res, true, article, "unlike done");
    }
    catch(e){
        resBuilder(res, false, e, e.message)
    }
}

// show single article 
static singleArticle = async(req,res) =>{
    try{
        const article = await articleModel.findById(req.params.id)  
        resBuilder(res, true, {article,"num of likes": article.likes.length}, "article data is fetched")
    }
    catch(e){
        resBuilder(res, false, e, e.message)
    }
}

}
module.exports=Article