const blogsRouter = require( 'express' ).Router()
const Blog = require( '../models/blog' )


blogsRouter.get( '/', async ( _, response ) => {
  const blogs = await Blog.find( {} )
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

blogsRouter.post( '/', async ( request, response ) => {
  // console.log( 'blog', request )

  const blogToCreate = new Blog( request.body )
  // console.log( 'blog', blog )

  const savedBlog = await blogToCreate.save()
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
