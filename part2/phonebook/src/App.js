import React, { useState } from 'react'

const SearchFilter = ({searchTerm, updateSearch}) => {
    return (
        <div>
            filter shown with: <input value={searchTerm} onChange={updateSearch} />
        </div>
    )
}

const PersonDetails = ({person}) => {
    return <div key={person.name}>{person.name} {person.number}</div>
}

const PersonList = ({persons, searchTerm}) => {
    const personsToShow = (searchTerm.length === 0) 
        ? persons 
        : persons.filter(person => person.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
    return (
        <div>{personsToShow.map(person => <PersonDetails person={person} />)}</div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

  const updateNewName = (event) => setNewName(event.target.value)
  const updateNewNumber = (event) => setNewNumber(event.target.value)
  const updateSearch = (event) => setSearchTerm(event.target.value)

  const addNewName = (event) => {
      event.preventDefault()
      const matches = persons.filter(person => person.name === newName)
      if(matches.length > 0) {
          alert(`${newName} is already added to phonebook`)
      } else {
        const newNames = persons.concat([{name: newName, number: newNumber}])
        setPersons(newNames)
        setNewName('')
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <SearchFilter searchTerm={searchTerm} updateSearch={updateSearch} />
      <h2>add a new</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={updateNewName} />
        </div>
        <div>
            number: <input value={newNumber} onChange={updateNewNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonList persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App