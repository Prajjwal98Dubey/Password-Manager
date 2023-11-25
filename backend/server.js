const express = require('express')
const connectDB = require('./db/connect')
const app = express()
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const passwordRoutes = require('./routes/passwordRoutes')
app.use(cors())
app.use(express.json())
app.use('/api/user',userRoutes)
app.use('/api/password',passwordRoutes)
const start = async()=>{
    await connectDB()
    await app.listen(5001,console.log("Server Connected at 5001🚀"))
}
start()

