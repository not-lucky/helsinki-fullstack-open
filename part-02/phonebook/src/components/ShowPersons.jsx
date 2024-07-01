const ShowPersons = ({ filteredPersons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
    </>
  )
}

export default ShowPersons
