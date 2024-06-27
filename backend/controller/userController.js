const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { Error } = require('mongoose')
const User = require('../model/userModel/userModel')
const Post = require('../model/postModel/postModel')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
require('dotenv').config()



const UserController = {

    createUser:asyncHandler(async(req,res)=>{
        const {name,username,password,email} = req.body

        const usernameFound = await User.findOne({username})
        const emailFound = await User.findOne({email})
        if(!name||!username ||!email ||!password){
            throw new Error("Data incomplete!!")
        }else if(emailFound){
            throw new Error("User already exist!!")
        }else if(usernameFound){
            throw new Error("Username already taken!!")
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const createdUser = await User.create({
                name,
                username,
                email,
                password:hashedPassword,
            }) 

            if(createdUser){
                const payload={
                    username
                }
                const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)


                res.cookie('token',token,{
                    maxAge:1*24*60*60*1000,
                    sameSite:'none',
                    httpOnly:true,
                    secure:true

                })
                res.json({
                    name,
                    username,
                    email,
                    token,
                    id:createdUser._id
                })
            }else{
                throw new Error("User didn't created")
            }
        }
    }),
    loginUser : asyncHandler(async(req,res)=>{
        const {username,password} = req.body

        const userFound = await User.findOne({username})
        if(!userFound){
            throw new Error("User does not exist")
        }
        const comparedPassword = await bcrypt.compare(password,userFound.password)
        if (!comparedPassword){
                throw new Error("Password does not match")
        }
        const payload={
           username,
        }
         const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)


        res.cookie('token',token,{
        maxAge:1*24*60*60*1000,
        sameSite:'none',
        httpOnly:true,
        secure:true
         })
        res.json({
        name:userFound.name,
        email:userFound.email,
        username,
        token,
        id:userFound._id,
        profileImage:userFound.profileImage
         })
                
    
        

    }),
    userProfile:asyncHandler(async(req,res)=>{
        const {username} = req.user
        const userFound = await User.findOne({username})
        res.json({
            name:userFound.name,
            username:userFound.username,
            email:userFound.email,
            posts:userFound.posts,
            id:userFound._id,
            profileImage:userFound.profileImage,

        })
    }),
    userDetails:asyncHandler(async(req,res)=>{
        const {username} = req.params
        const userFound = await User.findOne({username})
        if(!userFound){
            throw new Error("User not found ")
        }
        const userDetails = await User.aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(userFound._id), // Convert string ID to ObjectId
              }},
              {$lookup: {
                from: 'posts',
                localField: 'posts',
                foreignField: '_id',
                as: 'userPost'
              }}
          ]);
        
          const userPost = userDetails[0].userPost
        
        const sortedPosts = userPost.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        res.json({
            name:userDetails[0].name,
            username:userDetails[0].username,
            email:userDetails[0].email,
            profileImage:userDetails[0].profileImage,
            userPost:sortedPosts
        })

    }),
    updateName: asyncHandler(async(req,res)=>{
        const {name} = req.body
        const {username} = req.user
        
        const updatedUser = await User.updateOne({username},{name})
        if(!updatedUser){
            throw new Error("Name not updated")
        }
        const userFound = await User.findOne({username})
            const payload={
                username
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)
    
    
            res.cookie('token',token,{
                maxAge:1*24*60*60*1000,
                secure:true,
                sameSite:'none',
                httpOnly:true,
    
            })
            res.json({
                name:userFound.name,
                email:userFound.email,
                username:userFound.username,
                token,
                id:userFound._id,
                profileImage:userFound.profileImage
            })
        

        

    }),
    updateUsername:asyncHandler(async(req,res)=>{
        const {username} = req.body
        const userExist = await User.findOne({username})
        if (username === req.user.username){
            throw new Error("Same username entered!!")
        }else if(userExist){
            throw new Error("Username already exist, Try different one")
        }else{
           const updatedUser =await User.updateOne({username:req.user.username},{username})
           if(!updatedUser){
            throw new Error("Username not changed")
           }
        }
        const userFound = await User.findOne({username})
        const payload = {
            username
        }
        
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            res.cookie('token',token,{
                maxAge:1*24*60*1000,
                httpOnly:true,
                secure:true,
                sameSite:'none'
            })

            res.json({
                name:userFound.name,
                email:userFound.email,
                username:userFound.username,
                token,
                id:userFound._id,
                profileImage:userFound.profileImage
            })
        
    }),
    updatePassword:asyncHandler(async(req,res)=>{
        const {newPassword,oldPassword} = req.body
        if(newPassword===oldPassword){
            throw new Error("Old password re-entered")
        }
        const username = req.user.username
        const userFound = await User.findOne({username})
        if(!userFound){
            throw new Error("User Not Found")
        }
        const passwordMatch = await bcrypt.compare(oldPassword,userFound.password)
        if(!passwordMatch){
            throw new Error("Old password incorrect")
        }
        const hashedPassword =await bcrypt.hash(newPassword,10)
        const passwordChanged = await User.updateOne({username},{password:hashedPassword})
        if(!passwordChanged){
            throw new Error("Password not changed")
        }
        const payload = {
            username
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        res.cookie('token',token,{
            maxAge:1*24*60*1000,
            httpOnly:true,
            secure:true,
            sameSite:'none'
        })
        res.json({
            name:userFound.name,
            email:userFound.email,
            username,
            token,
            id:userFound._id,
            profileImage:userFound.profileImage
            })
        
    }),
    allUsers:asyncHandler(async(req,res)=>{
        const allUserData = await User.find()
        if(!allUserData){
            throw new Error("No data of Users Found")
        }
        const updatedData = allUserData.map((element)=>{
            return(
                {
                    id:element._id,
                    name:element.name,
                    username:element.username,
                    profileImage:element.profileImage
                }
            )
        })
        res.json(updatedData)
    }),
    uploadProfilePhoto:asyncHandler(async(req,res)=>{
        const {username} = req.user
        const userFound = await User.findOne({username})
        if(!userFound){
            throw new Error("User Not Found")
        }
        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
            cloud_name: 'dh8crye03', 
            api_key: '719359753684953', 
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
            preset:'blog-app-v4',
          });
        const updatedData = await User.findOneAndUpdate({username},
            {profileImage:uploadResponse.secure_url}
            
        )
        if(!updatedData){
            throw new Error("No pic updated")
        }
            const payload={
                username
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)

            res.cookie('token',token,{
                maxAge:1*24*60*60*1000,
                sameSite:'none',
                httpOnly:true,
                secure:true})
        res.json({
            name:updatedData.name,
            email:updatedData.email,
            username,
            token,
            id:updatedData._id,
            profileImage:updatedData.profileImage
            })
      
    }),

    logoutUser:asyncHandler(async(req,res)=>{
        res.clearCookie('token')
        res.json({ message: 'Logged out successfully' });
    }),
    


}

module.exports = UserController
