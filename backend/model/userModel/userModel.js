const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: [3, 'Username must be at least 3 characters long'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters'],
        trim: true
      },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
      },
      profileImage:{
        type:String
      },
      posts:[{
        type:mongoose.Schema.Types.ObjectId
      }],
      likedPosts:[{
        type:mongoose.Schema.Types.ObjectId
      }],
      comments:[{
        type:mongoose.Schema.Types.ObjectId
      }],
      
},{
  timestamps:true
});

module.exports = mongoose.model('User', userSchema);