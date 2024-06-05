const express = require("express")
const isAuth = require("../middleware/auth")
const postController = require("../controller/postController")
const postRoute = express.Router()



postRoute.post('/create-post',postController.createPost)