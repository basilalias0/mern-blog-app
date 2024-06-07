const express = require('express')
const UserController = require('../controller/userController')
const isAuth = require('../middleware/auth')
const userRouter = express.Router()



userRouter.post('/signup',UserController.createUser)
userRouter.post('/login',UserController.loginUser)
userRouter.get('/logout',UserController.logoutUser)
userRouter.get('/profile',isAuth,UserController.userProfile)
userRouter.get('/:id',UserController.userDetails)
userRouter.put('/update-name',isAuth,UserController.updateName)
userRouter.put('/update-username',isAuth,UserController.updateUsername)
userRouter.put('/update-password', isAuth,UserController.updatePassword)




module.exports = userRouter