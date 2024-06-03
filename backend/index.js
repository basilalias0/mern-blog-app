require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorhandle');


const mongooseConnect = async()=>{
    try {
        await mongoose.connect("mongodb+srv://basilalyas2000:CiWirS7XQ6MPy0U0@blogmain.2zbtee7.mongodb.net/?retryWrites=true&w=majority&appName=BlogMain")
    console.log("DB Connected successfully");
        } catch (error) {
        console.log(error);
    }  
}
mongooseConnect()




app.use(cookieParser())
app.use(express.json())




app.get('/',(req,res)=>{
    res.json({
        message:"Hello world"
    })
})

app.use('/api/v1/user',userRoute)

app.use(errorHandler)




app.listen(5000,console.log("http://localhost:5000"))