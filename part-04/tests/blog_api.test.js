const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const dummydata = require("../sample/dummydata")
const Blog = require('../models/blog')

const _ = require("lodash")


const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(dummydata)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are n notes', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, dummydata.length)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(e => e.author)
  assert(contents.includes('John Doe'))
})

test('the blogs have property id', async () => {
  const response = await api.get('/api/blogs')

  // check if blog has id
  // if a single blog doesnt have id property, returns true for that
  const doesntHasID = response.body.map(blog => !Object.hasOwn(blog, 'id'))

  // doesntHasID.push(true)

  // is theres a single true in array, some will return true. NOT op. will invert it
  assert(!doesntHasID.some(Boolean))
})

test('blog successfully created', async () => {
  const newBlog = {
    title: "just a test",
    author: "me!!!!",
    url: "https://url",
    likes: 235
  }

  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  // console.log('res', res)

  delete res.body.id

  assert.deepStrictEqual(res.body, newBlog)

  const blogs = (await api.get("/api/blogs")).body

  assert.strictEqual(blogs.length, dummydata.length + 1)

  const foundNewBlog = blogs
    .map(blog => {
      delete blog.id
      return blog
    })
    .some(blog => _.isEqual(blog, newBlog))

  // console.log('foundNewBlog', foundNewBlog)
  assert(foundNewBlog)
})

test("likes of blog default to 0 if not sent in request", async () => {

  const newBlog = {
    title: "just a test",
    author: "me!!!!",
    url: "https://url",
    // likes: 235
  }

  const postedBlog = (await api.post("/api/blogs").send(newBlog)).body

  assert.strictEqual(postedBlog.likes, 0)

})


test.only("400 Bad Request if title or url missing in post", async () => {

  const noTitleBlog = {
    // title: "just a test",
    author: "me!!!!",
    url: "https://url",
  }

  const noTitleError = (await api.post("/api/blogs").send(noTitleBlog).expect(400)).body.error

  // assert.strictEqual(noTitleError, "Blog validation failed: title: Path `title` is required.")


  const noUrlBlog = {
    title: "just a test",
    author: "me!!!!",
    // url: "https://url",
  }

  const noUrlError = (await api.post("/api/blogs").send(noUrlBlog).expect(400)).body.error

  // assert.strictEqual(noUrlError, "Blog validation failed: url: Path `url` is required.")
})

after(async () => {
  await mongoose.connection.close()
})
