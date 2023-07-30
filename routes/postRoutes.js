const express = require('express')
const router = express.Router();
const Post = require('../models/Post')

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
    const post = await Post.findOne(id)
    if (!post) throw new Error('no post found with that id')
    res.status(200).json({
      post
    })
  })
  .patch(async (req, res) => {
    const { id } = req.params
    const post = await Post.findByIdAndUpdate(id)
    if (!user) throw new Error('no post found with that id')
    res.status(200).json({
      post
    })
  })
  .delete(async (req, res) => {
    const { id } = req.params
    const post = await Post.findByIdAndDelete(id)
    if (!user) throw new Error('no post found with that id')
    res.status(200).json({
      message: "post successfully deleted"
    })
  })

module.exports = router