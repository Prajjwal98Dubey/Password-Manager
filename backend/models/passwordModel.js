const mongoose = require('mongoose')
const passwordSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports = mongoose.model('PasswordManager',passwordSchema)