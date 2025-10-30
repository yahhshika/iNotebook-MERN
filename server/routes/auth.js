const express = require("express");
const router = express.Router();
const User = require("../models/user")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const getId = require("../middlewares/getId");

// Every time user provides correct credentials, you should give an authenticated token to the user.

const SECRET_KEY = "yahhshika";
// using express-validator for schema validation
router.post("/signup",[
    body('name','give a proper name').isLength({min : 3}),
    body('email', 'give a proper email').isEmail(),
    body('password','give password of min 8 characters').isLength({min:8})
],async(req,res)=>{
    let success = true;
    const result = validationResult(req);
    //returning a json response in case of error
    if(!result.isEmpty()){
        success = false;
        return res.status(400).json({success, error: result.errors});
    }

    //checking if a user already exists with the same email.
    try{

        let user = await User.findOne({email: req.body.email});
        if(user){
            success = false;
            return res.json({success,error: "user with this email already exists"});
        }
    
        //finally creating a user.
        const salt = bcrypt.genSaltSync(10);
        const newpass = bcrypt.hashSync(req.body.password, salt);
        user = await User.create({...req.body, password: newpass});
        // as the user gets added to the database, give it an authentication token using jwt authentication
        let data = {
            user:{
                id: user.id
            }
        }
        let authToken = jwt.sign(data, SECRET_KEY);
        // console.log(authToken);
        res.json({success,authToken});
    }catch(err){
        success = false;
        res.status(400).json({success,error:err.message});
    }
    
})


router.post("/login", [
    body('email', 'give a proper email').isEmail(),
    body('password','give password of min 8 characters').isLength({min:8})
],async(req,res)=>{
    let success = true;
    let result = validationResult(req);
    if(!result.isEmpty()){
        success = false;
        return res.status(400).json({success,error: result.errors});
    }
    try{

        let user = await User.findOne({email: req.body.email});
        if(!user){
            success = false;
            return res.status(400).json({success,error: "kindly add correct credentials for access"});
        }
        let matched = await bcrypt.compare(req.body.password,user.password);
        if(!matched){
            success = false
            return res.status(400).json({success,error: "kindly add correct credentials for access."});
        }
    
        // since now the user is valid, give it an auth-token
        let data = {
            user:{
                id: user.id
            }
        }
        let authToken = jwt.sign(data, SECRET_KEY);
        // console.log(authToken);
        res.json({success,authToken});
    }catch(err){
        success = false
        res.status(400).json({success,error:err.message});
    }
    

})

router.get("/user",getId,async (req,res)=>{
    let success = true;
    try{
        let userid = req.user.id;
        // res.send(userid);
        let user = await User.findById(userid).select("-password")
        res.json({success,user});
    }catch(err){
        success = false
        res.status(400).json({success,error:err.message});
    }


})
module.exports = router;