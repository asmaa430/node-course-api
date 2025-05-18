const mongoose = require("mongoose");
const validator = require('validator');
const userSchema =new mongoose.Schema({
    firstName : {
         type : String,
         required : true,
    }
    , lastName : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        validate :[validator.isEmail ,'failed , enter valid email ']

    },
    password : {
        type : String,
        required: true
    }
  ,
  token :{
    type: String
  }
})
const User = mongoose.model('User', userSchema);

module.exports = User;