const express = require('express')
const { createPasswordManager, getAllPasswords, decrpytPassword, editPassword, deletePassword } = require('../controllers/passwordController')
const { protect } = require('../config/authMiddleware')
const router = express.Router()

router.route('/new').post(protect,createPasswordManager)
router.route('/all').get(protect,getAllPasswords)
router.route('/get-one').post(protect,decrpytPassword)
router.route('/edit-password').put(protect,editPassword)
router.route('/delete-password').delete(protect,deletePassword)
 
module.exports = router