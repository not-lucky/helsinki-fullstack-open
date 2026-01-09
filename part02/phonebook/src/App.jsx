import { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {

  const [ persons, setPersons ] = useState( [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ] );

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
