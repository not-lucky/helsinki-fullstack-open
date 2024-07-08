const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const dummyData = require("../dummy/dummydata")


blogRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(err => next(err))
})

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  console.log('blog', request.body)

  blog
    .save()
    .then(result => {
      console.log('result', result)
      response.status(201).json(result)
    })
    .catch(err => next(err))

})


blogRouter.get('/fill', (request, response) => {
  dummyData.forEach(dummyBlog => {
    const blog = new Blog(dummyBlog)
    blog
      .save()
      .then((res) => console.log(`${dummyBlog.author} saved`))
      .catch(err => console.log('err', err))
  })
})

module.exports = blogRouter
