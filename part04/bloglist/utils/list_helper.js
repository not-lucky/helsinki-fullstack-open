const dummy = () => {
  return 1
}

const totalLikes = ( blogs ) => {
  let sum = 0
  blogs
    .forEach( blog => {
      sum += blog.likes
    } )

  return sum

}

const favoriteBlog = ( blogs ) => {
  if ( blogs.length === 0 ) return null

  let favoriteBlog = blogs[ 0 ]

  for ( let blog of blogs ) {
    if ( blog.likes > favoriteBlog.likes ) favoriteBlog = blog
  }

  return favoriteBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
