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
        console.log(createdPost);
        const userDetailUpdate = await User.updateOne({username:userFound.username},{$push:{posts:createdPost._id}})
        if(!userDetailUpdate){
            throw new Error("userDetailUpdate didn't updated")
        }
        console.log(userDetailUpdate);
        res.json({
            message:"post created successfully"
        })
    }),
    viewPost:asyncHandler(async(req,res)=>{
        const {postId} = req.params
        const postFound = await Post.findById(postId)
        if(!postFound){
            throw new Error("Post not found")
        }
        const authorFound = await User.findById(postFound.author._id)
        if(!authorFound){
            throw new Error("Author of the post not found")
        }
        res.json({
           title:postFound.title,
           content:postFound.content,
           author:authorFound.name,
           updatedAt:postFound.updatedAt,
           likes:postFound.likes,
           comments:postFound.comments,
        })
    }),
    addLike:asyncHandler(async(req,res)=>{
        const {postId} = req.params
        const postFound = await Post.findById(postId)
        if(!postFound){
            throw new Error("Post not found")
        }
        const updatedLike = postFound.likes+1
        const updatedPost = await Post.findByIdAndUpdate(postId,
            {likes:updatedLike},
            {new:true,runValidators:true}
        )
        if(!updatedPost){
            throw new Error("Post not updated")
        }
        const userFound = await User.findOneAndUpdate({username:req.user.username},{$push:{likedPosts:postId}})
        if(!userFound){
            throw new Error("User not Found")
        }
        await userFound.likedPosts
        res.json({
            message:"Post updated",
            post:updatedPost
        })
    }),
    undoLike:asyncHandler(async(req,res)=>{
        const {postId} = req.params
        const postFound = await Post.findById(postId)
        if(!postFound){
            throw new Error("Post not found")
        }
        const updatedLike = postFound.likes-1
        const updatedPost = await Post.findByIdAndUpdate(postId,
            {likes:updatedLike},
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
    allPost:asyncHandler(async(req,res)=>{
        const allPostList = await Post.find()
        const sortedPost = allPostList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        res.send(sortedPost)
    })
        
        
}

module.exports = postController