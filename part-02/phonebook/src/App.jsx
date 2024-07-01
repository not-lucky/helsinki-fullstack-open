import { useState } from 'react'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = filter === ''
    ? persons
    : persons.filter(
      person =>
        person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>

      <SearchFilter filter={filter} setFilter={setFilter} />


      <PersonForm persons={persons} newNum={newNum} newName={newName} setNewName={setNewName} setNewNum={setNewNum} setPersons={setPersons} />

      <ShowPersons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
