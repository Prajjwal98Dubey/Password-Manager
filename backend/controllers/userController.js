const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateToken = require('../config/generateToken')
const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    const findUserName = await User.findOne({ username: username })
    const findEmail = await User.findOne({ email: email })
    if (findEmail || findUserName) {
        res.send("User already exists.")
        return
    }
    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(password, salt)
    const user = await User.create({ username: username, email: email, password: newPassword })
    user.save()
    res.status(200).json({
        _id: user._id,
        username: username,
        email: email,
        password: newPassword,
        token: generateToken(user._id)
    })
}
const loginUser = async (req, res) => {
    const { input, password } = req.body
    const inputUserName = await User.findOne({ username: input }) ? 1 : 0
    const inputEmail = await User.findOne({ email: input }) ? 1 : 0
    if (inputUserName || inputEmail) {
        const user = inputUserName ? await User.findOne({ username: input }) : await User.findOne({ email: input })
        const actualPassword = await bcrypt.compare(password, user.password)
        if (actualPassword) {
            res.status(201).json({
                token: generateToken(user._id)
            })
            return
        }
        else {
            res.send("Invalid Credentials.")
        }
    }
    else {
        res.send("No User Exists.")
    }
}
const myProfile = async (req, res) => {
    const { token } = req.body
    const verifiedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    const decoded = verifiedToken.id
    const user = await User.findOne({ _id: decoded })
    res.status(201).json({
        name: user.username
    })
}

module.exports = { registerUser, loginUser, myProfile }