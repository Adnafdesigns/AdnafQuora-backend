const express = require('express')
const router = express.Router()
const User = require('../models/User')


router.post('/signup', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({
      user
    })
  } catch (err) {
    console.log(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("email and password is required")
    const user = await User.findOne({ email })
    if (!user || !await user.correctPassword(password, user.password)) {
      return res.status(401).json({
        message: "Incorrect Details"
      })
    }
    res.status(200).json({
      user
    })
  } catch (err) {
    console.log(err)
  }
})
router
  .get(('/'), async (req, res) => {
    try {
      const users = await User.find()
      res.status(200).json({ users })
    } catch (err) {
      console.log(err)
    }
  })


router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params
      const user = await User.findById(id).populate('Posts')
      if (!user) throw new Error("No user found with that id")
      res.status(200).json({ user })
    } catch (err) {
      console.log(err)
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params
      const user = await User.findByIdAndDelete(id)
      if (!user) throw new Error("No user found with that id")
      res.status(200).json({
        message: "user successfully deleted"
      })
    } catch (err) {
      console.log(err)
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      })
      if (!user) throw new Error("No user found with that id")
      res.status(200).json({
        user
      })
    } catch (err) {
      console.log(err)
    }
  })
module.exports = router