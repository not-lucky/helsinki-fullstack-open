import { useEffect, useState } from 'react'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'
import axios from 'axios'



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
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])



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
