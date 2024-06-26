const asyncHandler = require("express-async-handler");
const Post = require("../model/postModel/postModel");
const User = require('../model/userModel/userModel')




const postController={
    createPost:asyncHandler(async(req,res)=>{
        const {title,content}= req.body
        const userFound = await User.findOne({username:req.user.username})
        if(!title || !content){
            throw new Error("Must include Title and content")
        }

        const createdPost = await Post.create({
            title,
            content,
            author:userFound._id
        })
        const userDetailUpdate = await User.updateOne({username:userFound.username},{$push:{posts:createdPost._id}})
        if(!userDetailUpdate){
            throw new Error("userDetailUpdate didn't updated")
        }
        res.json({
            message:"post created successfully"
        })
    }),
    viewPost:asyncHandler(async(req,res)=>{
        const allPost = await Post.aggregate([
            {
                $lookup: {
                  from: 'users', // collection name in db
                  localField: 'author',
                  foreignField: '_id',
                  as: 'author',
                },
            },
            {
              $unwind: '$author',
            },
          ]);
        if(!allPost){
            throw new Error("Failed to fetch posts")
        }
        const sortedPost = allPost.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        res.send(sortedPost)
    }),
    addLike:asyncHandler(async(req,res)=>{
        const postId = req.params.postId
        const {username} = req.user
        const postFound = await Post.findById(postId)
        if(!postFound){
            throw new Error("Post not found")
        }
        const userFound = await User.findOne({username})
        if(!userFound){
            throw new Error("User not found")
        } 
        const updatedPost = await Post.findByIdAndUpdate(postId,
            {$push:{likedUser:userFound._id}},
            {new:true,runValidators:true}
        )
        if(!updatedPost){
            throw new Error("Post not updated")
        }
        res.json({
            message:"Post updated",
            post:updatedPost
        })
    }),
    undoLike:asyncHandler(async(req,res)=>{
        const {postId} = req.params
        const {username} = req.user
        const postFound = await Post.findById(postId)
        if(!postFound){
            throw new Error("Post not found")
        }
        const userFound = await User.findOne({username})
        if(!userFound){
            throw new Error("User not found")
        } 
        const updatedPost = await Post.findByIdAndUpdate(postId,
            {$pull:{likedUser:userFound._id}},
            {new:true,runValidators:true}
        )
        if(!updatedPost){
            throw new Error("Post not updated")
        }
        res.json({
            message:"Post updated",
            post:updatedPost
        })
    }),
    updatePost:asyncHandler(async(req,res)=>{
        const {postId} = req.params
        const {title,content} = req.body
        if(!title && !content){
            throw new Error("Need content or title to edit")
        }
        const updateObject = {};
        if (content) updateObject.content = content;
        if (title) updateObject.title = title;

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $set: updateObject },
            { new: true, runValidators:true } 
          )
          if(!updatedPost){
            throw new Error("Post not updated")
        }
        res.json({
            message:"Post updated",
            post:updatedPost
        })
    }),
    deletePost:asyncHandler(async(req,res)=>{
        const {postId} = req.params
        const postDelete = await Post.findByIdAndDelete(postId)
        if(!postDelete){
            throw new Error("Post not deleted")
        }
        res.json({
            message:"Post deleted"
        })
    }),
        
        
}

module.exports = postController