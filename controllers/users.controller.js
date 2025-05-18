const asyncWrapper =require("../middlewares/asyncWrapper");
const User = require('../models/user.model');
const httpStatusText = require("../utilites/httpStatusText");
const AppError = require("../utilites/appErrorr");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const generateJWT = require("../utilites/generateJWT");
const getAllUsers =  asyncWrapper(async (req,res)=>{
   
    const query = req.query;
   // console.log(query);
    const limit = query.limit||10;
    const page = query.page||1;
    const skip = (page - 1) * limit;

   const users =  await User.find({},{ __v: 0 }).limit(limit).skip(skip);
    res.json({status : httpStatusText.SUCCESS, data : {users}}
    );
})

//password
const register  = asyncWrapper(async(req,res,next) => {
    console.log(req.body);
    const {firstName,lastName,email,password} = req.body;
  const oldUser = await User.findOne({email:email})
  if(oldUser){
   const error = AppError.create('User already exits',400,httpStatusText.FAIL);
              return next(error);
  }
  const hashedPassword = await bcrypt.hash(password,10);
 
   const newUser = new User({
    firstName,
    lastName,
    email,
    password:hashedPassword
});
//generate token 
    const token = await generateJWT({email:newUser.email, id:newUser._id});
    await newUser.save(); 
    
    res.status(201).json({status : httpStatusText.SUCCESS, data : {newUser},token});
    
})

const login = asyncWrapper(async(req,res,next) => {
    const {email,password} = req.body;
    if(!email&&!password){
        const error = AppError.create('Email and password are required',400,httpStatusText.FAIL);
              return next(error);
    }
    const user = await User.findOne({email:email})
    if(!user){
        const error = AppError.create('User not found',400,httpStatusText.FAIL);
        return next(error);
    }
    const matchedPassword = await bcrypt.compare(password,user.password);
    
    if(user&&matchedPassword){
        const token = await generateJWT({email:user.email, id:user._id});

        return  res.status(201).json({status : httpStatusText.SUCCESS, data : {user : "  logged in successfullly"
        },token});

    }else{
        const error = AppError.create('something wrong',500,httpStatusText.ERROR);
        return next(error);
    }
})

module.exports = {
    login, register,getAllUsers
}