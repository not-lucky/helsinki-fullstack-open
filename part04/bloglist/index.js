const { PORT } = require( './utils/config' )


const app = require( './app' ) // the actual Express application

app.listen( PORT, () => {
  console.log( `Server running on port ${ PORT }` )
} )
