const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'please enter content']
  },
  postId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Posts',
    required: [true, 'please enter postId']
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'please enter userId']
  }
})
module.exports = mongoose.model('Comment', CommentSchema)