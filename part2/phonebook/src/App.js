import { useState, useEffect } from 'react'
import personsService from './services/persons.js'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [isSuccess, setSuccess] = useState(true)

  const handleName = (event) => {setNewName(event.target.value)}
  const handleNum = (event) => {setNewNum(event.target.value)}

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const personAdd = persons.find(person => person.name === newName)

    // new
    if (personAdd === undefined) {
      const newPerson = { name: newName, number: newNum}
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${returnedPerson.name}`)
          setSuccess(true)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
    // old
    else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const newPerson = {...personAdd, number: newNum}
      personsService
        .update(newPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
          setMessage(`Changed ${updatedPerson.name}'s number`)
          setSuccess(true)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== newPerson.id))
          setMessage(`Person named '${newName}' was already removed from server`)
          setSuccess(false)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }

    setNewName('')
    setNewNum('')
  }

  const nameFilter = (person) => (person.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)

  const removePerson = (id) => {
    personsService
      .remove(id)
      .then(data => setPersons(persons.filter(person => person.id !== id)))
      .catch(error => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`Person was already removed from server`)
        setSuccess(false)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  // fetch data
  useEffect(() => {
    personsService
      .getAll()
      .then(initData => {setPersons(initData)})
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isSuccess={isSuccess} />

      <Filter value={filterName} onChange={handleFilterName} />

      <h3>Add a new number</h3>
      <PersonForm onSubmit={addName} name={newName} nameChange={handleName} num={newNum} numChange={handleNum} />

      <h3>Numbers</h3>
      <Persons persons={persons.filter(nameFilter)} removePerson={removePerson} />

    </div>
  )
}

export default App