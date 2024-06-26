const asyncHandler = require("express-async-handler")
const Post = require("../model/postModel/postModel");
const User = require('../model/userModel/userModel');
const Comment = require('../model/commentModel/commentModel')
const mongoose = require('mongoose');


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
    viewComments: asyncHandler(async (req, res) => {
        const { postId } = req.params;
          const comments = await Post.aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(postId), // Convert string ID to ObjectId
              },
            },
            {
              $unwind: '$comments', // Unwind comments array within the Post document
            },
            {
              $lookup: {
                from: 'comments', // Assuming Comment collection holds detailed comment data
                localField: 'comments', // Field in Post referencing comment IDs
                foreignField: '_id', // Field in Comment identifying the comment
                as: 'commentInfo', // Alias for the joined comment information
              },
            },
            {
              $lookup: {
                from: 'users', // Assuming User collection holds author details
                localField: 'commentInfo.author', // Field in Comment referencing the author
                foreignField: '_id', // Field in User identifying the author
                as: 'authorInfo', // Alias for the joined author information
              },
            },
            {
              $unwind: '$authorInfo', // Unwind authorInfo if it's an array (optional)
            },
            {
              $sort: { 'commentInfo.createdAt': -1 }, // Sort comments by creation date (descending)
            },
          ]);
          res.send(comments);
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
        const {commentId,postId} = req.params
        console.log(commentId);
        const {username} = req.user
        const deletedComment = await Comment.findByIdAndDelete(commentId)
        if(!deletedComment){
            throw new Error("Comment delete Failed")
        }
        const pullCommentFromPost = await Post.findByIdAndUpdate(postId,
            {$pull:{comments:commentId}},
            {new:true,runValidators:true}  
        )
        if(!pullCommentFromPost){
          throw new Error("Error happened from PullCommentFromPost")
        }
        const pullCommentFromUser = await User.findOneAndUpdate({username},
          {$pull:{comments:commentId}},
          {new:true,runValidators:true}  
      )
      if(!pullCommentFromUser){
        throw new Error("Error happened from PullCommentFromUser")
      }
        res.json({
            message:"Comment successfully deleted"
        })
    })
}

module.exports = commentController