import { useEffect, useState } from 'react'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'
import personService from "./services/persons"



const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = filter === ''
    ? persons
    : persons.filter(
      person =>
        person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>

      <SearchFilter filter={filter} setFilter={setFilter} />


      <PersonForm persons={persons} newNum={newNum} newName={newName} setNewName={setNewName} setNewNum={setNewNum} setPersons={setPersons} />

      <ShowPersons filteredPersons={filteredPersons} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App
