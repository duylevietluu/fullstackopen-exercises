import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleName = (event) => {setNewName(event.target.value)}
  const handleNum = (event) => {setNewNum(event.target.value)}

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) === undefined) {
      const newPerson = { name: newName, number: newNum, id: persons.length + 1}
      setPersons(persons.concat(newPerson))
    }
    else {
      window.alert(`${newName} is already added to phonebook`)
    }
    
    setNewName('')
    setNewNum('')
  }

  const nameFilter = (person) => (person.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)

  // fetch data
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterName} onChange={handleFilterName} />

      <h3>Add a new number</h3>
      <PersonForm onSubmit={addName} name={newName} nameChange={handleName} num={newNum} numChange={handleNum} />

      <h3>Numbers</h3>
      <Persons persons={persons.filter(nameFilter)} />

    </div>
  )
}

export default App