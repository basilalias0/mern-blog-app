const express = require("express")
const isAuth = require("../middleware/auth")
const postController = require("../controller/postController")
const postRouter = express.Router()




postRouter.post('/create-post',isAuth,postController.createPost)
postRouter.get('/allPost',isAuth,postController.viewPost)
postRouter.put('/:postId',isAuth,postController.updatePost)
postRouter.delete('/:postId',isAuth,postController.deletePost)
postRouter.put('/:postId/add-like',isAuth,postController.addLike)
postRouter.put('/:postId/undo-like',isAuth,postController.undoLike)


module.exports = postRouter
