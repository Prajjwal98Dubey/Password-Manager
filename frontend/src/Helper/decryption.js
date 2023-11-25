// const crypto = require('crypto')
// // const { encrpytedPassword } = req.body
// //     const algorithm = 'aes-256-cbc'
// //     const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(iv,'hex'))
// //     let decrypted = decipher.update(encrpytedPassword,'hex','utf-8');
// //     decrypted += decipher.final('utf-8');
// //     res.status(201).json({decrypted})
// const key = crypto.randomBytes(32)
// const iv = crypto.randomBytes(16);
// const decrpytPassword = (text)=>{
//     const algorithm = 'aes-256-cbc'
//     const decipher = crypto.createDecipheriv(algorithm,Buffer.from(key),Buffer.from(iv))
//     let decrypted = decipher.update(text,'hex','utf-8')
//     decrypted+=decipher.final('utf-8')
//     return decrypted
// }

// module.exports  = decrpytPassword