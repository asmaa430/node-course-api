
const express =  require('express')
const router = express.Router();

const coursesControllers = require ("../controllers/courses.controller");
const {validationSchema} = require("../middlewares/validationSchema");
router.route('/')
        .get(coursesControllers.getAllCourses)
        .post(
            validationSchema(),coursesControllers.addCourse)

router.route('/:courseId')
        .get(coursesControllers.getCourse)
        .patch(coursesControllers.updateCourse)
        .delete(coursesControllers.deleteCourse)
module.exports = router;