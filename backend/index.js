require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorhandle');
const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');
const commentRouter = require('./routes/commentRoute');
const DBConnectionString = process.env.MONGO_CONNECTION_STRING


const mongooseConnect = async()=>{
    try {
        await mongoose.connect(DBConnectionString)
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

app.use('/api/v1/user',userRouter)
app.use('/api/v1/post',postRouter)
app.use('/api/v1/post',commentRouter)

app.use(errorHandler)




app.listen(5000,console.log("http://localhost:5000"))