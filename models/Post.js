const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please enter a title']
  },
  content: {
    type: String,
    required: [true, 'please enter your content']
  },
  category: [],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, 'Post must belong to a user']
  }
})
module.exports = mongoose.model('Posts', PostSchema)