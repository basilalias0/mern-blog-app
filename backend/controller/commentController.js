const asyncHandler = require("express-async-handler")
const Post = require("../model/postModel/postModel");
const User = require('../model/userModel/userModel');
const Comment = require('../model/commentModel/commentModel')


const commentController = {
    addComment:asyncHandler(async(req,res)=>{
        const {content} = req.body
        const {postId} = req.params
        const userFound = await User.findOne({username:req.user.username})
        const createdComment = await Comment.create({
            content,
            post:postId,
            author:userFound._id
        })
        if(!createdComment){
            throw new Error("Comment didn't created")
        }
        const updatedPost = await Post.findByIdAndUpdate(postId,{$push:{comments:createdComment._id}})
        if(!updatedPost){
            throw new Error("Post not updated")
        }
        const updatedUser = await User.findOneAndUpdate({username:req.user.username},{$push:{comments:createdComment._id}})
        if(!updatedUser){
            throw new Error("User not updated")
        }
        res.json({
            message:"comment created successfully"
        })
    }),
    viewComments: asyncHandler(async(req,res)=>{
        const {postId} = req.params
        const commentList = await Comment.find({post:postId})
        if(!commentList){
            throw new Error("comments didn't get")
        }
        const sortedComment = commentList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        res.send(sortedComment)
    }),
    updateComment:asyncHandler(async(req,res)=>{
        const {commentId} = req.params
        const {content} = req.body
        const updatedComment = await Comment.findByIdAndUpdate(commentId,{content},{new:true,runValidators:true})
        if(!updatedComment){
            throw new Error("Comment update Failed")
        }
        res.json({
            message:"Comment successfully updated",
            comment:updatedComment
        })
    }),
    deleteComment:asyncHandler(async(req,res)=>{
        const {commentId} = req.params
        const deletedComment = await Comment.findByIdAndDelete(commentId)
        if(!deletedComment){
            throw new Error("Comment delete Failed")
        }
        res.json({
            message:"Comment successfully deleted"
        })
    })
}

module.exports = commentController