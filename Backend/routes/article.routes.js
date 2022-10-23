const router = require("express").Router()
const Article= require("../controllers/article.controller")
const { auth, authUser, authAdmin } = require("../middleware/auth.middleware")
const upload = require("../middleware/fileUpload.middleware")

router.post("/addArticle", auth, authAdmin, upload.single("image"), Article.addArticle) // add article by admin
router.delete("/removeArticle/:id",auth,authAdmin,Article.removeArticle)  // remove article by admin
router.post("/editArticle/:id", auth, authAdmin ,Article.editArticle);   // edit article by admin
router.post("/editImage/:id", auth, authAdmin ,Article.editImage);   // edit image by admin

router.get("/singleArticle/:id", auth,Article.singleArticle)  // show single article
router.get("/allAriticles", auth,Article.allArticles ) // show all articles
router.get("/myAriticles/:id", auth, authAdmin, Article.myArticles) // show my articles
router.get("/allComments/:id", auth,Article.allComments)  // show all comments

router.post("/addComment/:id", auth, authUser, Article.addComment)  // add comment by user
router.delete("/removeComment/:articleId/:id",auth,authUser,Article.removeComment) // remove comment by user
router.post("/editComment/:id", auth, authUser ,Article.editComment);   // edit acomment by admin

router.post("/like/:id", auth, authUser, Article.likeArticle)   // like by user
router.delete("/unlike/:id", auth, authUser, Article.unlikeArticle)  // unlike by user

module.exports=router