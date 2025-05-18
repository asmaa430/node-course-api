
const express =  require('express')
const router = express.Router();
const verifyToken = require('../middlewares/verifyTokens')
const usersControllers = require ("../controllers/users.controller");
router.route('/')
        .get(verifyToken,usersControllers.getAllUsers)
router.route('/register')   
    .post(usersControllers.register)
router.route('/login')   
    .post(usersControllers.login)
module.exports = router;

