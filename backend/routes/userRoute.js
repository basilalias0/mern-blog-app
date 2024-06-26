const express = require('express')
const UserController = require('../controller/userController')
const isAuth = require('../middleware/auth')
const userRouter = express.Router()
const storage = require('../config/cloudinary')
const multer = require('multer')

const upload = multer({storage})

userRouter.put('/profile-picture',isAuth,upload.single("file"),UserController.uploadProfilePhoto)
userRouter.post('/signup',UserController.createUser)
userRouter.post('/login',UserController.loginUser)
userRouter.get('/logout',isAuth,UserController.logoutUser)
userRouter.get('/all-user-data',isAuth,UserController.allUsers)
userRouter.get('/:username',isAuth,UserController.userDetails)
userRouter.put('/update-name',isAuth,UserController.updateName)
userRouter.put('/update-username',isAuth,UserController.updateUsername)
userRouter.put('/update-password', isAuth,UserController.updatePassword)




module.exports = userRouter