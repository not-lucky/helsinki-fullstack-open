const mongoose = require( 'mongoose' );


const url = process.env.MONGODB_URI;

mongoose.set( 'strictQuery', false );

mongoose.connect( url, { family: 4 } )
  .then( result => {
    console.log( 'connected to MongoDB' );
  } )
  .catch( error => {
    console.log( 'error connecting to MongoDB:', error.message );
  } );


const phoneValidator = {
  validator: function ( value ) {
    // length check
    if ( value.length < 8 ) {
      return false;
    }

    // must contain exactly one "-"
    const parts = value.split( "-" );
    if ( parts.length !== 2 ) {
      return false;
    }

    const [ firstPart, secondPart ] = parts;

    // first part: 2 or 3 digits
    if ( !/^\d{2,3}$/.test( firstPart ) ) {
      return false;
    }

    // second part: digits only
    if ( !/^\d+$/.test( secondPart ) ) {
      return false;
    }

    return true;
  },
  message: props => `${ props.value } is not a valid phone number`
};

const personSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    validate: phoneValidator
  },
} );


personSchema.set( 'toJSON', {
  transform: ( document, returnedObject ) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
} );


module.exports = mongoose.model( 'Person', personSchema );
