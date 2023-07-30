const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name']
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true,
    lowercase: true

  },
  password: {
    type: String,
    required: [true, 'please enter your password'],

  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true, toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

UserSchema.virtual('Posts', {
  ref: 'Posts',
  foreignField: 'user',
  localField: '_id'
})
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  try {
    return await bcrypt.compare(candidatePassword, userPassword)
  } catch (err) {
    console.log(err)
  }
}
const User = mongoose.model('User', UserSchema)
module.exports = User