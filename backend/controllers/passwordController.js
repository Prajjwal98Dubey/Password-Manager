const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
require('dotenv').config()
const passwordManager = require('../models/passwordModel')
const { encryptionFunction } = require('../config/encryption')
const createPasswordManager = async (req, res) => {
    try {
        const algorithm = 'aes-256-cbc'
        const cipher = crypto.createCipheriv(algorithm, process.env.SECRET_CRYPTO_KEY, process.env.SECRET_CRYPTO_IV)
        const { name, password } = req.body
        let token = req.headers.authorization.split(' ')[1]
        const userID = jwt.verify(token, process.env.JWT_SECRET_KEY).id
        let encrpytedPassword = cipher.update(password, 'utf-8', 'hex')
        encrpytedPassword += cipher.final('hex')
        const user = await passwordManager.create({
            name: name,
            password: encrpytedPassword,
            user: userID
        })
        user.save()
        res.status(201).json({
            _id: user._id,
            name: user.name,
            password: user.password,
            user: userID
        })
    } catch (error) {
        res.send(error.message)
    }

}
const getAllPasswords = async (req, res) => {
    let token = req.headers.authorization.split(' ')[1]
    const userId = jwt.verify(token, process.env.JWT_SECRET_KEY).id
    const users = await passwordManager.find({ user: userId })
    res.status(201).json(users)
}

const decrpytPassword = (req, res) => {
    const { encrpytedPassword } = req.body
    const algorithm = 'aes-256-cbc'
    const decipher = crypto.createDecipheriv(algorithm, process.env.SECRET_CRYPTO_KEY, process.env.SECRET_CRYPTO_IV)
    let decrypted = decipher.update(encrpytedPassword, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    res.status(201).json({ decrypted })
}

const editPassword = async (req, res) => {
    const { password_id, updatedPassword } = req.body
    const checkPasswordId = await passwordManager.findOne({ _id: password_id })
    if (!checkPasswordId) {
        res.json({ message: "This Password does not exists." })
        return
    }
    checkPasswordId.password = encryptionFunction(updatedPassword)
    checkPasswordId.save()
    res.status(200).json(checkPasswordId)
}
const deletePassword = async(req, res) => {
    const { password_id } = req.body
    try {
        await passwordManager.findByIdAndDelete({ _id: password_id })
        res.status(201).json({ message: "Password Deleted." })
    }
    catch (error) {
        res.json({ message: "This password does not exists." })
    }
}

module.exports = { createPasswordManager, getAllPasswords, decrpytPassword, editPassword, deletePassword }