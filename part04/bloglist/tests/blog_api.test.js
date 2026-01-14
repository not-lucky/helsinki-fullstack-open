const { test, after, beforeEach, describe } = require( 'node:test' )
const assert = require( 'node:assert' )
const mongoose = require( 'mongoose' )
const supertest = require( 'supertest' )
const app = require( '../app' )
const Blog = require( '../models/blog' )
const helper = require( './test_helper' )

const api = supertest( app )


beforeEach( async () => {
  await Blog.deleteMany( {} )

  // const blogObjects = helper.initialBlogs.map( blog => new Blog( blog ) )

  // const promiseArray = blogObjects.map( blog => blog.save() )

  // await Promise.all( promiseArray )

  await Blog.insertMany( helper.initialBlogs )

} )

describe( 'when there is initially some blogs saved', () => {
  test( 'blogs are returned as json', async () => {
    await api
      .get( '/api/blogs' )
      .expect( 200 )
      .expect( 'Content-Type', /application\/json/ )
  } )

  test( 'all blogs are returned', async () => {
    const response = await api.get( '/api/blogs' )

    assert.strictEqual( response.body.length, helper.initialBlogs.length )
  } )

  test( 'specific author is within the returned blogs', async () => {
    const response = await api.get( '/api/blogs' )

    const authors = response.body.map( e => e.author )
    assert.strictEqual( authors.includes( 'Edsger W. Dijkstra' ), true )
  } )

  test( 'the blogs have property id', async () => {
    const blogsAtEnd = await helper.blogsInDb()

    const doesntHasID = blogsAtEnd.map( blog => !Object.hasOwn( blog, 'id' ) )

    assert( !doesntHasID.some( Boolean ) )
  } )
} )

describe( 'viewing a specific blog', () => {
  test( 'a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[ 0 ]


    const resultBlog = await api
      .get( `/api/blogs/${ blogToView.id }` )
      .expect( 200 )
      .expect( 'Content-Type', /application\/json/ )

    assert.deepStrictEqual( resultBlog.body, blogToView )
  } )
} )

describe( 'addition of a new blog', () => {
  test( 'a valid blog can be added ', async () => {
    const newBlog = {
      title: 'random title',
      author: 'random author',
      url: 'http://randomlink.com',
      likes: 100,
    }

    await api
      .post( '/api/blogs' )
      .send( newBlog )
      .expect( 201 )
      .expect( 'Content-Type', /application\/json/ )

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual( blogsAtEnd.length, helper.initialBlogs.length + 1 )

    const titles = blogsAtEnd.map( r => r.title )
    assert( titles.includes( 'random title' ) )
  } )

  test( 'a blog without like in request has 0 likes ', async () => {
    const newBlog = {
      title: 'random title',
      author: 'random author',
      url: 'http://randomlink.com',
    }

    const response = await api
      .post( '/api/blogs' )
      .send( newBlog )
      .expect( 201 )
      .expect( 'Content-Type', /application\/json/ )

    assert.strictEqual( response.body.likes, 0 )

  } )

  test( 'a blog without title or url raises 400 bad request ', async () => {
    const noTitle = {
      author: 'random author',
      url: 'http://randomlink.com'
    }

    let response = await api
      .post( '/api/blogs' )
      .send( noTitle )
      .expect( 400 )

    // const error = response.body.error
    // console.log( 'error', error )

    const noUrl = {
      title: 'idk',
      author: 'random author'
    }

    response = await api
      .post( '/api/blogs' )
      .send( noUrl )
      .expect( 400 )

    const error = response.body.error
    console.log( 'error', error )

  } )
} )

describe( 'deletion of a blog', () => {
  test( 'a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[ 0 ]

    await api
      .delete( `/api/blogs/${ blogToDelete.id }` )
      .expect( 204 )

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map( n => n.id )
    assert( !ids.includes( blogToDelete.id ) )

    assert.strictEqual( blogsAtEnd.length, helper.initialBlogs.length - 1 )
  } )
} )

describe( 'updating a blog', () => {
  test( 'updating likes of a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[ 0 ]

    const blogID = blogToUpdate.id

    const newBlog = {
      ...blogToUpdate,
      likes: 200
    }

    const response = await api
      .put( `/api/blogs/${ blogToUpdate.id }` )
      .send( newBlog )
      .expect( 200 )

    const updatedBlog = response.body

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual( updatedBlog.likes, 200 )
    assert.strictEqual( blogsAtStart.length, blogsAtEnd.length )

    const hopefullyUpdatedBlog = ( await api.get( `/api/blogs/${ blogID }` ) ).body


    assert.deepStrictEqual( updatedBlog, hopefullyUpdatedBlog )

  } )
} )

after( async () => {
  await mongoose.connection.close()
} )
