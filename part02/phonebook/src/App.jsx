import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';


const App = () => {
  const [ persons, setPersons ] = useState( [] );

  const [ newPerson, setNewPerson ] = useState( { name: '', number: '' } );
  const [ filter, setFilter ] = useState( '' );


  const handleSubmit = ( event ) => {
    event.preventDefault();
    // console.log( 'newName', newName );

    const existingPerson = persons.find(
      person => person.name === newPerson.name
    );

    if ( existingPerson ) {
      if ( confirm( `${ newPerson.name } is already added to phonebook, replace the old numbere with the new one?` ) ) {

        const updatedPerson = { ...existingPerson, number: newPerson.number };

        personsService
          .update( existingPerson.id, updatedPerson )
          .then( returnedPerson => {
            setPersons( persons.map( person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ) );
            setNewPerson( { name: '', number: '' } );
          } );
      }
      return;
    };

    personsService
      .create( newPerson )
      .then( returnedPerson => {
        setPersons( persons.concat( returnedPerson ) );
        setNewPerson( { name: '', number: '' } );
      } );

  };


  const handleDelete = ( id ) => {
    console.log( 'id', id );
    if ( !window.confirm( `Sure wanna delete this person with id ${ id }` ) ) {
      return;
    }
    console.log( 'uwu' );


    personsService
      .purge( id )
      .then( () => {
        setPersons( persons.filter( person => person.id !== id ) );
      } )
      .catch( () => {
        alert( 'person was already purged from the server.' );
      } );
  };

  const filteredPersons = filter === '' ? persons : persons.filter( ( person ) => person.name.toLocaleLowerCase().includes( filter.toLocaleLowerCase() ) );




  useEffect( () => {
    personsService
      .getAll()
      .then( newData => {
        setPersons( newData );
      } );

  }, [] );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={ filter } setFilter={ setFilter } />

      <h2>add a new</h2>

      <PersonForm handleSubmit={ handleSubmit } newPerson={ newPerson } setNewPerson={ setNewPerson } />

      <h2>Numbers</h2>

      <Persons filteredPersons={ filteredPersons } handleDelete={ handleDelete } />

    </div>
  );
};

export default App;
