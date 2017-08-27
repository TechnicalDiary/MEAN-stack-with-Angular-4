const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

let titleLengthChecker = (title) =>{
    if(!title) {
        return false;
    } else {
        if(title.length <5 || title.length > 30){
            return false;
        } else {
            return true;
        }
    }
}

// let alphanumericTitleChecker = (title) =>{
//     if(!title) {
//         return false;
//     } else {
//         const regExp = /^[0-9a-zA-Z]+$/;
//         return regExp.test(title);
//     }
// }

let bodyLengthChecker = (body) => {
    if(!body) {
        return false;
    } else {
        if (body.length < 3  || body.length > 500) {
            return false;
        } else {
            return true;
        }
    }
}

// let validUsernameChecker = (username) => {
//     if (!username) {
//         return false;
//     } else {
//         const regExp = /^[a-zA-Z0-9]+$/;
//         return regExp.test(username);
//     }
// }

let commentLengthChecker = (comment) => {
    if(!comment) {
        return false;
    } else {
        if (comment.length < 1  || comment.length > 200) {
            return false;
        } else {
            return true;
        }
    }
}

// let validPasswordChecker = (password) => {
//     if (!password) {
//         return false;
//     } else {
//         const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
//         return regExp.test(password);
//     }
// }

const titleValidators = [
    {
        validator: titleLengthChecker, message: 'Title must be at least 5 characters but less than 30'
    }
    // {
    //     validator: alphanumericTitleChecker, message: 'Title must be alphanumeric'
    // }
];

const bodyValidators = [
    {
        validator: bodyLengthChecker, message: 'Article must be at least 5 characters but less than 500'
    }
    // {
    //     validator: validUsernameChecker, message: 'username must not have special character'
    // }
];

const commentValidators = [
    {
        validator: commentLengthChecker, message: 'Comment must be at least 1 character and not more than 200 characters.'
    }
];


const blogSchema = new Schema({
    title:{ type:String, required:true, validate: titleValidators},
    body: { type:String, required:true, validate: bodyValidators},
    createdBy: {type: String},
    CreatedAt: {type:Date, default:Date.now() },
    likes: {type:Number, default:0},
    likedBy: {type:Array},
    dislikes: { type:Number, default:0 },
    dislikedBy: { type:Array},
    comments: [{
        comment: {
            type:String,
            validate: commentValidators
        },
        commentator: {type:String}
    }] 
})


module.exports = mongoose.model('Blog', blogSchema );