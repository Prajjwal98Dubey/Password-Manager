const express = require('express')
const { registerUser, loginUser, myProfile } = require('../controllers/userController')
const router = express.Router()

router.route('/register-user').post(registerUser)
router.route('/login-user').post(loginUser)
router.route('/my-profile').post(myProfile)
module.exports = router