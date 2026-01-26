const Blog = require( '../models/blog' )
const User = require( '../models/user' )
const initRouter = require( 'express' ).Router()

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const initialUsers = [
  {
    username: 'root',
    name: 'root',
    blogs: [],
  },
  {
    username: 'notLucky',
    name: 'lucky',
    blogs: [],
  },
  {
    username: 'uwu',
    name: 'owo',
    blogs: [],
  },
]

const randomUserId = ( users ) => {
  return users[ Math.floor( Math.random() * users.length ) ]
}

const userForTesting = {
  username: 'test',
  name: 'test',
  blogs: [],
}

initRouter.get( '/', async ( req, res ) => {
  await Promise.all( [ User.deleteMany( {} ), Blog.deleteMany( {} ) ] )

  const users = await User.insertMany( initialUsers )

  initialBlogs.forEach( ( blog ) => {
    blog.user = randomUserId( users.map( ( user ) => user.id ) ).toString()
  } )

  const blogs = await Blog.insertMany( initialBlogs )

  blogs.forEach( ( blog ) => {
    users
      .find( ( user ) => String( user.id ) === String( blog.user ) )
      .blogs.push( blog._id )
  } )

  const promiseArray = users.map( ( user ) => user.save() )
  await Promise.all( [ ...promiseArray, new User( userForTesting ).save() ] )

  res.status( 200 ).send( 'uwu' )
} )

module.exports = initRouter
