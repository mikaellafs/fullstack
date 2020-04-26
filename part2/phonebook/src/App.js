import React, { useState } from 'react'

const Number = ({person}) =>{
  return(
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Persons = ({persons}) =>{
  return(
    <>
    {persons.map(person => <Number key = {person.id} person = {person}/>)}
    </>
  )
}

const PersonForm = (p) => {
  return(
    <form onSubmit = {p.addPerson}>
      <div>
        name: <input value = {p.newName} onChange = {p.changeName}/>
      </div>
      <div>
        number: <input value = {p.newNumber} onChange = {p.changeNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
        
    </form>
  )
}

const Filter = ({filter, changeFilter}) =>{
  return(
    <form>
      <div>
        fitler shown with <input value = {filter} onChange = {changeFilter}/>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id : 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.findIndex(p => p.name === newName)>= 0){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      const person = {
        name : newName,
        id : persons.length +1,
        number : newNumber
      }
    
      setPersons(persons.concat(person))
    }
    setNewName('')
    setNewNumber('')
  }

  const changeName = (event) => setNewName(event.target.value)
  const changeNumber = (event) => setNewNumber(event.target.value)

  const changeFilter = (event) => setFilter(event.target.value)

  const personsToShow = filter === ''? persons : 
  persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter = {filter} changeFilter = {changeFilter}/>
      <h3>Add a new</h3>
        <PersonForm addPerson = {addPerson} newName = {newName} changeName = {changeName}
           newNumber = {newNumber} changeNumber = {changeNumber}/>
      <h3>Numbers</h3>
        <Persons persons = {personsToShow} />
    </div>
  )
}

export default App