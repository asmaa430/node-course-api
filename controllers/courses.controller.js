
const Course = require("../models/course.model");
const {validationResult } = require('express-validator');
const httpStatusText = require("../utilites/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const AppError = require("../utilites/appErrorr");
const getAllCourses = asyncWrapper(async (req,res)=>{
   
    const query = req.query;
    console.log(query);
    const limit = query.limit||10;
    const page = query.page||1;
    const skip = (page - 1) * limit;

   const courses =  await Course.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({status : httpStatusText.SUCCESS, data : {courses:courses}}
    );
})
const getCourse = asyncWrapper(
    async(req,res,next)=>{
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            const error = AppError.create('course not found ',404,httpStatusText.FAIL);
            return next(error);
        }
    
       return res.json({status : httpStatusText.SUCCESS, data : {course}});
    }
)
    
const addCourse =  asyncWrapper (
    async (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            if (!errors.isEmpty()) {
               const error = AppError.create(errors.array(),400,httpStatusText.FAIL);
                return next(error);
            }
            
        }
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json({status : httpStatusText.SUCCESS, data : {newCourse}});
        console.log("Request Body:", req.body);
      
})
const updateCourse = asyncWrapper(async (req,res)=>{
    const courseId = req.params.courseId;
    const updateCourse = await  Course.updateOne({_id:courseId},{$set:{...req.body}});
    return  res.status(200).json({status: httpStatusText.SUCCESS,data:{updateCourse}});
   
  
})
const deleteCourse = asyncWrapper(async (req,res)=>{
    const courseId = req.params.courseId;
    await Course.deleteOne({_id:courseId});
    return res.json({
    status : httpStatusText.SUCCESS, data : null})
});
module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse,

}
