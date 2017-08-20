const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;


const blogSchema = new Schema({
    title:{ type:String, required:true},
    body: { type:String, required:true},
    createdBy: {type: String},
    CreatedAt: {type:Date, default:Date.now() },
    likes: {type:number, default:0},
    likedBy: {type:Array},
    dislikes: { type:number, default:0 },
    dislikedBy: { type:Array},
    comments: [{
        comment: {type:String},
        commentator: {type:String}
    }] 
})


module.exports = mongoose.model('Blog', blogSchema );