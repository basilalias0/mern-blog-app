const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Error } = require('mongoose')
const User = require('../model/userModel/userModel')
const Post = require('../model/postModel/postModel')


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
                    secure:false,
                    sameSite:'strict',
                    httpOnly:true,

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
        secure:false,
        sameSite:'strict',
        httpOnly:true,

         })
        res.json({
        name:userFound.name,
        email:userFound.email,
        username,
        token,
        id:userFound._id
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
            coverImage:userFound.coverImage,

        })
    }),
    userDetails:asyncHandler(async(req,res)=>{
        const {id} = req.params
        const userFound = await User.findById(id)
        if(!userFound){
            throw new Error("User not found ")
        }
        const posts = await Post.find({author:id})
        
        res.json({
            name:userFound.name,
            username:userFound.username,
            posts,
            profileImage:userFound.profileImage,
            coverImage:userFound.coverImage,

        })

    }),
    updateName: asyncHandler(async(req,res)=>{
        const {name} = req.body
        const {username} = req.user
        const userFound = await User.findOne({username})
        const updatedUser = await User.updateOne({username},{name})
        if(!updatedUser){
            throw new Error("Name not updated")
        }
            const payload={
                username
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)
    
    
            res.cookie('token',token,{
                maxAge:1*24*60*60*1000,
                secure:false,
                sameSite:'strict',
                httpOnly:true,
    
            })
            res.json({
                name,
                username,
                email:userFound.email,
                token
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
                secure:false,
                sameSite:true
            })

            res.json({
                username,
                token,
                email:userFound.email,
                name:userFound.name
               })
        
    }),
    updatePassword:asyncHandler(async(req,res)=>{
        const {newPassword,oldPassword} = req.body
        if(newPassword===oldPassword){
            throw new Error("Old password re-entered")
        }
        const username = req.user.username
        const userFound = await User.findOne({username})
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
        res.json({
            username,
            token,
            email:userFound.email,
            name:userFound.name
            })
        
    }),
    logoutUser:asyncHandler(async(req,res)=>{
        res.clearCookie('token')
        res.json({ message: 'Logged out successfully' });
    }),


}

module.exports = UserController
