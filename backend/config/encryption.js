const crypto = require('crypto')
require('dotenv').config()
const encryptionFunction =(text)=>{
    const algorithm = 'aes-256-cbc'
    const cipher = crypto.createCipheriv(algorithm,process.env.SECRET_CRYPTO_KEY,process.env.SECRET_CRYPTO_IV)
    let encrypted = cipher.update(text,'utf-8','hex')
    encrypted+=cipher.final('hex')
    return encrypted
}

module.exports={encryptionFunction}