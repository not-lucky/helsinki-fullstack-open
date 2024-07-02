import personService from "../services/persons"


const ShowPersons = ({ filteredPersons, persons, setPersons }) => {
  const removePerson = (person) => {
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(res => {
          console.log('res', res)
          setPersons(persons.filter(person => person.id !== res.id))
        })
        .catch(err => console.log('err', err))
    }
  }

  return (
    <>
      <h2>Numbers</h2>
      {filteredPersons.map(person => {
        return (
          <div key={person.id}>
            <span >{person.name} {person.number} </span>
            <button onClick={() => removePerson(person)}>delete</button>
            <br />
          </div>)
      })}
    </>
  )
}

export default ShowPersons
