const User = require('../models/user');

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
            User.findOne({email:req.param.email}, (err, user) => {
                if(err){
                    res.json({success:false, message: err})
                } else {
                    if(user){
                        res.json({success:false, message:'Email-is already taken'});
                    } else {
                        res.json({ success:false, message: 'Email is available'})
                    }
                }
            })
        }
    });

    router.get('/checkUsername/:username', (req,res) => {
        if(!req.params.username){
            res.json({ success: false, message:'Username was not provided'});
        } else {
            User.findOne({username:req.param.username}, (err, user) => {
                if(err){
                    res.json({success:false, message: err})
                } else {
                    if(user){
                        res.json({success:false, message:'Username already taken'});
                    } else {
                        res.json({ success:false, message: 'Username is available'});
                    }
                }
            })
        }
    });

    return router;
}