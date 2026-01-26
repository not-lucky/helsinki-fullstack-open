const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const passwordCorrect =
    user === null ? false : bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.JWTSECRET)

  res.status(201).json({
    token,
    username,
    name: user.name,
  })
})

module.exports = loginRouter
