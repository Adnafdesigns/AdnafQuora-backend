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
  likes: [],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, 'Post must belong to a user']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
// PostSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'user',
//   })
//   next()
// })
module.exports = mongoose.model('Posts', PostSchema)