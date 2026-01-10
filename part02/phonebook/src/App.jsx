import { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState( [] );

  const [ newPerson, setNewPerson ] = useState( { name: '', number: '', id: 100 } );
  const [ filter, setFilter ] = useState( '' );


  const handleSubmit = ( event ) => {
    event.preventDefault();
    // console.log( 'newName', newName );

    if ( persons.some( person => person.name === newPerson.name ) ) {
      alert( `${ newPerson.name } is already added to phonebook` );
      return;
    }

    setPersons( persons.concat( newPerson ) );
    setNewPerson( { name: '', number: '', id: newPerson.id + 1 } );
  };


  const filteredPersons = filter === '' ? persons : persons.filter( ( person ) => person.name.toLocaleLowerCase().includes( filter.toLocaleLowerCase() ) );


  useEffect( () => {
    axios
      .get( 'http://localhost:3001/persons' )
      .then( ( response ) => {
        setPersons( response.data );
      } );

  }, [] );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={ filter } setFilter={ setFilter } />

      <h2>add a new</h2>

      <PersonForm handleSubmit={ handleSubmit } newPerson={ newPerson } setNewPerson={ setNewPerson } />

      <h2>Numbers</h2>

      <Persons filteredPersons={ filteredPersons } />

    </div>
  );
};

export default App;
