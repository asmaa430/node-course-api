require('dotenv').config()
const express =  require('express')
const Course = require ('./models/course.model');
const cors = require("cors");

const mongoose = require ('mongoose');
const httpStatusText = require("./utilites/httpStatusText");

const app = express()
app.use(cors());
//to read json files
app.use(express.json());

const url = process.env.MONGO_URL;

 mongoose.connect(url).then(()=>{
    console.log("mongo server started");
    console.log("DB:", mongoose.connection.name);
})


const coursesRouter = require("./routes/courses.routes")
const usersRouter = require("./routes/users.routes")
app.use('/api/courses',coursesRouter);
app.use('/api/users',usersRouter);// /api/users

 // global error handler
 app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500).json({
        status: error.statusText || httpStatusText.ERROR,
        message: error.message,
        code: error.statusCode || 500,
        data: error.data || null
    });
});

app.listen(3000,()=>{
    console.log('listening on port 3000')
})