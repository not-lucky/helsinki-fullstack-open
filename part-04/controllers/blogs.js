const blogRouter = require("express").Router()
const Blog = require("../models/blog")


blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  const result = await blog.save()

  response.status(201).json(result)

})

blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  await Blog
    .findByIdAndDelete(id)

  response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id

  const newBlog = { ...request.body }

  const updatedNote = await Blog
    .findByIdAndUpdate(
      id,
      newBlog,
      { new: true, runValidators: true, context: 'query' }
    )

  response.status(200).json(updatedNote)
})


module.exports = blogRouter
