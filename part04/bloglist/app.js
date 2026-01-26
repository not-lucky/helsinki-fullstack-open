const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const userRouter = require('./controllers/users')
const initRouter = require('./controllers/db_init')
const loginRouter = require('./controllers/login')

const app = express()
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/init', initRouter)
app.use('/api/login', loginRouter)

const mongoUrl = MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
