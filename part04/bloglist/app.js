const express = require( 'express' )
const mongoose = require( 'mongoose' )
const { MONGODB_URI } = require( './utils/config' )
const blogsRouter = require( './controllers/blogs' )
const middleware = require( './utils/middleware' )

const app = express()
app.use( express.json() )
app.use( middleware.requestLogger )

app.use( '/api/blogs', blogsRouter )

const mongoUrl = MONGODB_URI
mongoose.connect( mongoUrl, { family: 4 } )

app.use( middleware.unknownEndpoint )
app.use( middleware.errorHandler )

module.exports = app
