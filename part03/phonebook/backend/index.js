require( 'dotenv' ).config();
const express = require( "express" );
const morgan = require( 'morgan' );
const Person = require( "./models/person" );

const app = express();


app.use( express.static( 'dist' ) );
app.use( express.json() );

morgan.token( 'body', ( req ) => JSON.stringify( req.body ) );
app.use( morgan( ':method :url :status :response-time ms :body' ) );

app.get( '/info', ( request, response ) => {
  const count = persons.length;
  const now = new Date();
  response.send( `<p>Phonebook has info for ${ count } people.</p><p>${ now }</p>` );
} );

app.get( '/api/persons', ( request, response ) => {
  Person.find( {} ).then( persons => {
    response.json( persons );
  } );

} );

app.get( '/api/persons/:id', ( request, response ) => {
  const id = request.params.id;
  const person = persons.find( person => person.id === id );

  if ( !person ) {
    return response.status( 404 ).json( { error: 'Sorry, cant find that' } );
  }

  response.send( person );

} );


app.delete( '/api/persons/:id', ( request, response ) => {
  const id = request.params.id;
  const person = persons.find( person => person.id === id );

  if ( !person ) {
    return response.status( 404 ).json( { error: 'Sorry, cant find that' } );
  }

  persons = persons.filter( person => person.id !== id );

  response.status( 204 ).end();
} );


app.post( '/api/persons', ( request, response ) => {
  const body = request.body;


  // existingPerson = persons.find( person => person.name == body.name );

  // if ( existingPerson ) {
  //   return response.status( 400 ).json( {
  //     error: 'name must be unique'
  //   } );
  // }

  const newPerson = Person( {
    // id: id.toString(),
    name: body.name,
    number: body.number || '1234567890'
  } );

  newPerson.save().then( savedPerson => {
    console.log( 'savedPerson', savedPerson );
    response.send( savedPerson );
  } );

} );


const unknownEndpoint = ( request, response ) => {
  response.status( 404 ).send( { error: 'unknown endpoint' } );
};

app.use( unknownEndpoint );

const PORT = process.env.PORT || 3001;
app.listen( PORT, () => {
  console.log( `Server running on port ${ PORT }` );
} );
