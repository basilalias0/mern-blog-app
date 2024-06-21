const express = require("express")
const isAuth = require("../middleware/auth")
const postController = require("../controller/postController")
const postRouter = express.Router()




postRouter.post('/create-post',isAuth,postController.createPost)
postRouter.get('/allPost',postController.viewPost)
postRouter.put('/:postId',postController.updatePost)
postRouter.delete('/:postId',postController.deletePost)
postRouter.put('/:postId/add-like',postController.addLike)
postRouter.put('/:postId/undo-like',postController.undoLike)


module.exports = postRouter
