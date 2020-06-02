import React, { useState, useEffect } from 'react'
import personService from './services/persons';

const Notification = ({ message, isError }) => {
  if (message === null || message === undefined) {
    return null
  }

  return (
    <div className={isError ? 'errorNotification' : 'notification'} >
      {message}
    </div>
  )
}

const SearchFilter = ({searchTerm, updateSearch}) => {
    return (
        <div>
            filter shown with: <input value={searchTerm} onChange={updateSearch} />
        </div>
    )
}

const PersonDetails = ({person, deleteAndUpdate}) => {
    const deletePerson = event => {
      const confirmed = window.confirm(`Delete ${person.name}?`);
      if (confirmed) {
        const id = person.id
        deleteAndUpdate(id, person.name)
      }
    }
    return <div className="person" >{person.name} {person.number} <button onClick={deletePerson} >Delete</button></div>
}

const PersonList = ({persons, searchTerm, deleteAndUpdate}) => {
    const personsToShow = (searchTerm.length === 0) 
        ? persons 
        : persons.filter(person => person.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
    return (
        <div>{personsToShow.map(person => 
          <PersonDetails
            key={person.name}
            person={person} 
            deleteAndUpdate={deleteAndUpdate} />)}</div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ message, setMessage ] = useState()
  const [ errorMessage, setErrorMessage ] = useState()

  useEffect(() => {
    const eventHandler = response => {
      setPersons(response)
    }
    personService.getAll().then(eventHandler)
  }, [])

  const updateNewName = (event) => setNewName(event.target.value)
  const updateNewNumber = (event) => setNewNumber(event.target.value)
  const updateSearch = (event) => setSearchTerm(event.target.value)

  const success = message => {
    setNewName('')
    setNewNumber('')
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  };

  const failed = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  };

  const addNewName = (event) => {
      event.preventDefault()
      const newItem = {name: newName, number: newNumber}

      const matches = persons.filter(person => person.name === newName)
      if(matches.length > 0) {
        const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if (confirmed) {
          const personId = matches[0].id;
          personService.update(personId, newItem).then((updatedItem) => {
            const updatedPersons = [...persons.map(person => {
              if(person.id === personId) {
                return updatedItem
              }
              return person
            })]
            setPersons(updatedPersons)
            success(`Updated '${newItem.name}'.`)
          }).catch(err => console.error(err))
        }
      } else {
        personService.create(newItem).then((createdItem) => {
          const newNames = persons.concat([createdItem])
          setPersons(newNames)
          success(`Added '${newItem.name}'.`)
        }).catch(err => console.error(err))
      }
  }

  const deleteAndUpdate = (id, name) => {
    personService.remove(id).then(() => {
      const newPersons = [...persons.filter(per => per.id !== id)]
      setPersons(newPersons)
    }).catch(err => {
      failed(`Information of '${name}' has already been removed from server.`);
      console.error(err)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={false} />
      <Notification message={errorMessage} isError={true} />
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
      <PersonList persons={persons} searchTerm={searchTerm} deleteAndUpdate={deleteAndUpdate} />
    </div>
  )
}

export default App