const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) =>{
    router.post('/register', (req, res) => {

        if(!req.body.email) {
            res.json({success: false, message: 'You must provide an email'});
        } else {
            if(!req.body.username) {
                res.json({success:false, message: 'you must provide an username'});
            } else {
                if (!req.body.password) {
                    res.json({success:false, message: 'you must provide a password'});
                } else {
                    let user  = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                            if(err.code === 11000){
                                res.json({success:false, message: 'Username or Email already exist'});
                            } else {
                                if(err.errors.email){
                                    res.json({success:false, message:err.errors.email.message})
                                } else {
                                    if ( err.errors.username) {
                                        res.json({success:false, message:err.errors.username.message})
                                    } else {
                                        if(err.errors.password) {
                                            res.json({success:false, message: err.errors.password.message})
                                        } else {
                                            res.json({success:false, message: 'Error: Could not save user ==>', err});
                                        }
                                    }
                                }
                            }
                        } else {
                            res.json({succes:true, message:'User registred successfully'});
                        }
                    });
                }
            }
        }
    });

    router.get('/checkEmail/:email', (req,res) => {
        if(!req.params.email){
            res.json({ success: false, message:'E-mail was not provided'});
        } else {
            User.findOne({"email":req.params.email}, 'email username', (err, user) => {
                if(err){
                    res.json({success:false, message: err})
                } else {
                    if(user){
                        res.json({success:false, message:'Error: Email-is already taken'});
                    } else {
                        res.json({ success:true, message: 'Email is available'})
                    }
                }
            })
        }
    });

    router.get('/checkUsername/:username', (req,res) => {
        if(!req.params.username){
            res.json({ success: false, message:'Username was not provided'});
        } else {
            User.findOne({"username":req.params.username}, 'email username', (err, user) => {
                if(err){
                    res.json({success:false, message: err})
                } else {
                    if(user){
                        res.json({success:false, message:'Error: Username already taken'});
                    } else {
                        res.json({ success:true, message: 'Username is available'});
                    }
                }
            })
        }
    });
    
    
    router.post('/login', (req, res) => {
        if(!req.body.username){
            res.json({success:false, message: 'you must provide username to login'});
        } else {
            if(!req.body.password){
                res.json({success:false, message:'You must provide password to login'});
            } else {
                User.findOne({"username":req.body.username.toLowerCase()}, '_id email username password', (err, user) => {
                    if(err){
                        res.json({success:false, message: err})
                    } else {
                        if(!user){
                            res.json({success:false, message:'User not found'});
                        } else {
                            const validPassword = user.comparePassword(req.body.password);
                            if(!validPassword) {
                                res.json({success:false, message:'Invalid Password'});
                            } else {
                                const token = jwt.sign({userId: user._id}, config.secret, {expiresIn:'24h'});
                                res.json({success:true, message:'successfully logedin', token:token, user:{username:user.username} });
                            }
                        }
                    }
                })
            }
        }
    });

    router.use((req,res,next) => {
        const token = req.headers['authorization']; 
        if(!token) {
            res.json({success: false, message: 'No token provided'});
        } else {
            jwt.verify(token,config.secret, (err, decoded) => {
                if (err) {
                    res.json({success:false, message:'Token invalid' + err});
                } else {
                    req.decode = decoded;
                    next();
                }
            })
        }
    })

    router.get('/profile', (req, res) => {
        User.findOne({_id: req.decode.userId}).select('username email').exec((err, user) =>{
            if(err) {
                res.json({success:false, message:err});
            } else {
                if(!user){
                    res.json({success:false, message:'User not found'});
                } else {
                    res.json({success: true, user:user});
                }
            }
        })
    })

    return router;
}