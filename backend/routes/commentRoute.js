const express = require("express")
const commentController = require("../controller/commentController")
const commentRouter = express.Router()


commentRouter.get('/:postId/comments',commentController.viewComments)
commentRouter.post('/:postId/create-comment',commentController.addComment)
commentRouter.put('/:postId/:commentId',commentController.updateComment)
commentRouter.delete('/:postId/:commentId',commentController.deleteComment)