const express = require("express")
const commentController = require("../controller/commentController")
const isAuth = require("../middleware/auth")
const commentRouter = express.Router()



commentRouter.get('/:postId/comments',isAuth,commentController.viewComments)
commentRouter.post('/:postId/add-comment',isAuth,commentController.addComment)
commentRouter.put('/:postId/:commentId',isAuth,commentController.updateComment)
commentRouter.delete('/:postId/:commentId',isAuth,commentController.deleteComment)

module.exports = commentRouter