var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length !== 0
    ? blogs.reduce((acc, blog) => acc + blog.likes, 0)
    : 0
}

// assuming no blog has -ve likes
const favoriteBlog = (blogs) => {
  let favBlog = null
  let maxLikes = -1

  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      favBlog = blog
    }
  })

  return favBlog
}

// using lodash as encouraged by course (also as my no library js solution was very ugly)
const mostBlogs = (blogs) => {
  if (_.isEmpty(blogs)) return null
  const mostBlogsArray = Object.entries(_.countBy(blogs, (blog) => blog.author)).sort(([, a], [, b]) => b - a)[0]
  return {
    author: mostBlogsArray[0],
    blogs: mostBlogsArray[1]
  }
}

const mostLikes = (blogs) => {
  if (_.isEmpty(blogs)) return null

  const grouped = _.groupBy(blogs, 'author')

  let maxLikes = 0
  let auth = null
  for (let author in grouped) {
    const currAuthLikes = _.sumBy(grouped[author], 'likes');

    if (currAuthLikes > maxLikes) {
      maxLikes = currAuthLikes
      auth = author
    }
  }

  // console.log(maxLikes, auth)

  return {
    author: auth,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
