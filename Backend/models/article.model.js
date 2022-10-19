const mongoose = require("mongoose")
const validator = require("validator")

const articleSchema = mongoose.Schema({

    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    title:{
        type:String,
        required:true, 
        trim:true
    }, 

    body:{
        type:String, 
        required:true, 
        trim:true
    }, 

    image:{
        type:String,
        trim:true
    }, 

    likes:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId
        }
    }],
    
    comments:[{
        commentBody:{
            type:String, 
            required:true, 
            trim:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId
        }
    }]
    
},
{
    timestamps:true
})

const Article = mongoose.model("Article",articleSchema)
module.exports=Article