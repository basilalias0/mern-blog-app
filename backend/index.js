require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorhandle');
const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');
const commentRouter = require('./routes/commentRoute');
const cors = require('cors');
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

const corsOption ={
    origin: 'https://mern-blog-app-eight-jade.vercel.app',
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOption))


app.use('/api/v1/user',userRouter)
app.use('/api/v1/post',postRouter)
app.use('/api/v1/post',commentRouter)

app.use(errorHandler)




app.listen(5000,console.log("https://mern-blog-app-bwnp.onrender.com"))