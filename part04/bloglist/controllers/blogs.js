const blogsRouter = require( 'express' ).Router()
const jwt = require( 'jsonwebtoken' )
const Blog = require( '../models/blog' )
const User = require( '../models/user' )

blogsRouter.get( '/', async ( _, response ) => {
  const blogs = await Blog.find( {} ).populate( 'user', {
    username: 1,
    name: 1,
  } )

  // console.log( blogs.map(blog => blog.toJSON()) )

  response.json( blogs )
} )

blogsRouter.get( '/:id', async ( request, response ) => {
  const blog = await Blog.findById( request.params.id )
  if ( blog ) {
    response.json( blog )
  } else {
    response.status( 404 ).end()
  }
} )


const getTokenFrom = ( req ) => {
  const auth = req.get( 'authorization' )

  if ( auth && auth.startsWith( 'Bearer ' ) ) {
    return auth.replace( 'Bearer ', '' )
  }
  return null
}


blogsRouter.post( '/', async ( request, response ) => {
  // console.log( 'blog', request )

  // const body = request.body

  const decodedToken = jwt.verify( getTokenFrom( request ), process.env.JWTSECRET )

  if ( !decodedToken.id ) {
    return response.status( 401 ).json( {
      error: 'token invalid'
    } )
  }

  const user = await User.findById( decodedToken.id )

  if ( !user ) {
    return response.status( 400 ).json( { error: 'userId missing or not valid' } )
  }

  const blogToCreate = new Blog( { ...request.body, user: user._id } )
  // console.log( 'blog', blog )

  const savedBlog = await blogToCreate.save()
  user.blogs = user.blogs.concat( savedBlog._id )
  await user.save()

  response.status( 201 ).json( savedBlog )
} )

blogsRouter.put( '/:id', async ( request, response ) => {
  const blog = await Blog.findById( request.params.id )

  if ( !blog ) {
    return response.status( 404 ).end()
  }

  blog.likes = request.body.likes
  const savedBlog = await blog.save()
  response.status( 200 ).json( savedBlog )
} )

blogsRouter.delete( '/:id', async ( request, response ) => {
  await Blog.findByIdAndDelete( request.params.id )
  response.status( 204 ).end()
} )

module.exports = blogsRouter
