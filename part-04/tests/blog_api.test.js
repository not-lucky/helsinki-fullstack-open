const { test, after, beforeEach, describe } = require('node:test')
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

describe("when there is initially some notes saved", () => {
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
})

describe('creating blog', () => {
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

  test.only("and if title or url missing in post, 400 Bad Request", async () => {

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
})

describe("deleting blog", () => {
  test("by valid id, return 204", async () => {
    const firstBlog = (await api.get("/api/blogs")).body[0]
    await api.delete(`/api/blogs/${firstBlog.id}`).expect(204)

    const newFIrstBlog = (await api.get("/api/blogs")).body[0]

    assert(!_.isEqual(firstBlog, newFIrstBlog))
  })

  test("by invalid id, return 400", async () => {
    await api.delete('/api/blogs/w3b6yn89p').expect(400)

    const blogs = (await api.get("/api/blogs")).body
    assert.strictEqual(blogs.length, dummydata.length)
  })
})

describe("updating blog", () => {
  test("increasing likes of first blog by 1", async () => {
    const blogs = (await api.get("/api/blogs")).body
    blogToUpdate = blogs[0]
    blogToUpdate.likes += 1

    const updatedBlog = (await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)).body

    assert.strictEqual(blogs.length, dummydata.length)

    assert.strictEqual(updatedBlog.likes, dummydata[0].likes + 1)
  })

  test("increasing likes of last blog by 10", async () => {
    const blogs = (await api.get("/api/blogs")).body
    blogToUpdate = blogs.at(-1)
    blogToUpdate.likes += 10

    const updatedBlog = (await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)).body

    assert.strictEqual(blogs.length, dummydata.length)

    assert.strictEqual(updatedBlog.likes, dummydata.at(-1).likes + 10)
  })
})

after(async () => {
  await mongoose.connection.close()
})
