const express = require('express')
const app = express()
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const studentRoute = require('./routes/student')
const subjectRoute = require('./routes/subject')
const assignmentRoute = require('./routes/assignment')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

dotenv.config()

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}

app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/student',studentRoute)
app.use('/api/subject',subjectRoute)
app.use('/api/assignment',assignmentRoute)

app.listen(process.env.PORT,()=>{
    connectDB()
    console.log(`Your app is running on port ${process.env.PORT}`)
})