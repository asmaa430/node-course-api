const { body } = require('express-validator');
const validationSchema =  ()=>{
    return[
            body('title')
                    .notEmpty()
                    .withMessage("title is required"),
            body('price')
                .notEmpty()
                .withMessage("price is required"),       
            ]
    }

        module.exports ={ validationSchema}