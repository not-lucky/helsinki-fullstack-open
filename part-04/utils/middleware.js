const morgan = require("morgan")

morgan.token('body', (req) => JSON.stringify(req.body))
const morganLog = morgan(':method :url :status :res[content-length] - :response-time ms :body')


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  morganLog,
  unknownEndpoint,
  errorHandler
}
