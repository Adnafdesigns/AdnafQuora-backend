const express = require('express')
const router = express.Router();
const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

router
  .route("/")
  .post(async (req, res) => {
    try {
      const post = await Post.create(req.body);
      res.status(201).json({
        post
      })
    } catch (err) {
      console.log(err)
    }
  })
  .get(async (req, res) => {
    const posts = await Post.find()
    res.status(200).json({
      posts
    })
  })

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) throw new Error('no post found with that id')
    res.status(200).json({
      post
    })
  })
  .patch(async (req, res) => {
    const { id } = req.params
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    if (!post) throw new Error('no post found with that id')
    res.status(200).json({
      post
    })
  })
  .delete(async (req, res) => {
    const { id } = req.params
    const post = await Post.findByIdAndDelete(id)
    if (!post) throw new Error('no post found with that id')
    res.status(200).json({
      message: "post successfully deleted"
    })
  })

router
  .route('/:id/comments')
  .post(async (req, res) => {
    const { id } = req.params
    const { text, userId } = req.body
    const user = await User.findById(userId)
    if (!user) throw new Error('no user found with that Id')
    const comment = await Comment.create({
      text,
      postId: id,
      userId
    })
    res.status(201).json({
      comment
    })
  })
  .get(async (req, res) => {
    const { id } = req.params
    const comments = await Comment.find({ postId: id })
    res.status(200).json({
      comments
    })
  })

router
  .route('/:id/comments/:commentId')
  .patch(async (req, res) => {
    const { commentId } = req.params
    const { text } = req.body
    if (!text) return
    const comment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true, runValidators: true })
    if (!comment) return
    res.status(200).json({
      comment
    })
  })
  .delete(async (req, res) => {
    const { commentId } = req.params
    const comment = await Comment.findByIdAndDelete(commentId)
    if (!comment) return
    res.status(200).json({
      message: 'comment deleted successfully'
    })
  })

router
  .post('/:id/likes', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return
    const post = await Post.findById(id);
    if (!post) return
    const checkLiked = post.upVotes.some(like => like.user.toString() === userId)

    const likedIndex = post.upVotes.findIndex(like => like.user.toString === userId)

    if (checkLiked) {
      post.upVotes.splice(likedIndex, 1)
    } else {
      post.upVotes.push({ user: userId })
    }
    await post.save()
    res.status(200).json({
      post
    })
  })
router
  .post('/:id/dislikes', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return
    const post = await Post.findById(id);
    if (!post) return
    const checkDisLiked = post.downVotes.some(like => like.user.toString() === userId)

    const disLikedIndex = post.downVotes.findIndex(like => like.user.toString === userId)

    if (checkDisLiked) {
      post.downVotes.splice(disLikedIndex, 1)
    } else {
      post.downVotes.push({ user: userId })
    }
    await post.save()
    res.status(200).json({
      post
    })
  })
module.exports = router