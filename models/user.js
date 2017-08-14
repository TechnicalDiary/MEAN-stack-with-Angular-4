const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) =>{
    if(!email) {
        return false;
    } else {
        if(email.length <5 || email.length > 30){
            return false;
        } else {
            return true;
        }
    }
}

let validEmailChecker = (email) =>{
    if(!email) {
        return false;
    } else {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(email);
    }
}

let usernameLengthChecker = (username) => {
    if(!username) {
        return false;
    } else {
        if (username.length < 3  || username.length > 15) {
            return false;
        } else {
            return true;
        }
    }
}

let validUsernameChecker = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = /^[a-zA-Z0-9]+$/;
        return regExp.test(username);
    }
}

let passwordLengthChecker = (password) => {
    if(!password) {
        return false;
    } else {
        if (password.length < 8  || password.length > 30) {
            return false;
        } else {
            return true;
        }
    }
}

let validPasswordChecker = (password) => {
    if (!password) {
        return false;
    } else {
        const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return regExp.test(password);
    }
}

const emailValidators = [
    {
        validator: emailLengthChecker, message: 'Email must be at least 5 characters but less than 30'
    },
    {
        validator: validEmailChecker, message: 'Must be a valid email'
    }
];

const usernameValidators = [
    {
        validator: usernameLengthChecker, message: 'username must be at least 3 characters but less than 15'
    },
    {
        validator: validUsernameChecker, message: 'username must not have special character'
    }
];

const passwordValidators = [
    {
        validator: passwordLengthChecker, message: 'password must be at least 8 characters and not more than 30 characters.'
    },
    {
        validator: validPasswordChecker, message: 'Password must have at least one uppercase, lowercase, digit and special character.'
    }
];

const userSchema = new Schema({
    email: { type: String, requied: true, unique : true, lowercase:true, validate: emailValidators },
    username: { type: String, required: true,  unique : true, lowercase:true, validate: usernameValidators },
    password: { type: String, required:true, validate: passwordValidators }
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) =>{
        if(err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password)
}


module.exports = mongoose.model('User', userSchema);