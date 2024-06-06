const express = require("express")
const isAuth = require("../middleware/auth")
const postController = require("../controller/postController")
const postRoute = express.Router()



postRoute.post('/create-post',postController.createPost)
postRoute.get('/:postId',postController.viewPost)
postRoute.put('/:postId',postController.updatePost)
postRoute.delete('/:postId',postController.deletePost)
postRoute.put('/:postId/add-like',postController.addLike)
postRoute.put('/:postId/undo-like',postController.undoLike)
