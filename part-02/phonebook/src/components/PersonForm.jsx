const PersonForm = ({ persons, newName, newNum, setNewName, setNewNum, setPersons }) => {

  const addPerson = (event) => {
    event.preventDefault();

    // let found = false;

    // persons.forEach((person) => {
    //   if (person.name === newName) {
    //     found = true
    //   }
    // })

    if (!persons.some(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())) {
      setPersons(persons.concat({ name: newName, number: newNum, id: newName + newNum }))
      setNewName("")
      setNewNum('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <>
      <h2>add a new</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} value={newName} />

        </div>
        <div>
          number: <input onChange={(e) => setNewNum(e.target.value)} value={newNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

    </>
  )
}

export default PersonForm
