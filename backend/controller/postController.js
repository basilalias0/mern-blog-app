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
        const authorFound = await User.findById(postFound.author.name)
        if(!authorFound){
            throw new Error("Author of the post not found")
        }
        res.json({
           title:postFound.title,
           content:postFound.content,
           author:authorFound,
           updatedAt:postFound.updatedAt,
           likes:postFound.likes,
           comments:postFound.comments,
        })
    }),
    addLike:asyncHandler(async(req,res)=>{
        const {postId} = req.params
        const postFound = await Post.updateOne({_id:postId},{likes:likes+1})
        if(!postFound){
            throw new Error("Post not found")
        }
        console.log(postFound);
        res.json({
            message:"Post updated"
        })
    }),
    undoLike:asyncHandler(async(req,res)=>{
        const {postId} = req.params
        const postFound = await Post.updateOne({_id:postId},{likes:likes-1})
        if(!postFound){
            throw new Error("Post not found")
        }
        res.json({
            message:"Post updated"
        })
    }),
    updatePost:asyncHandler(async(req,res)=>{
        const {postId} = req.params
        const {title,content} = req.body
        if(!title || !content){
            throw new Error("Need to content or title to edit")
        }
        const updateObject = {};
        if (content) updateObject.content = content;
        if (title) updateObject.title = title;

        const result = await User.updateOne(
            { _id: postId },
            { $set: updateObject }
          )
        console.log(result)
        res.json({
            message:"Post updated"
        })
        }),
    deletePost:asyncHandler(async(req,res)=>{
        const {postId} = req.params
        await Post.findByIdAndDelete(postId)
        res.json({
            message:"Post deleted"
        })
    })
        
        
}

module.exports = postController