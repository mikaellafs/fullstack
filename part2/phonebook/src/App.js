import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Number = ({person, deletePerson}) =>{
  return(
    <div>
      {person.name} {person.number} <button onClick ={() => deletePerson(person)}>delete</button>
    </div>
  )
}

const Persons = ({persons, deletePerson}) =>{
  return(
    <>
    {persons.map(person => <Number key = {person.id} person = {person} deletePerson = {deletePerson}/>)}
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

const Notification = ({m}) => {
  if (m === null) {
    return null
  }

  return (
    <div className={m.style}>
      {m.message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect( () => {
      personService.getAll()
      .then(responseData => setPersons(responseData))
    }
    ,[])

  const addPerson = (event) => {
    event.preventDefault()
    let person

    if((person = persons.find(p => p.name === newName)) !== undefined){
      const result  = window.confirm(`${newName} is already added to phonebook, replace de old number with a new one?`)
      if(result){
        const changedNumber = {...person, number : newNumber}
        personService.update(person.id, changedNumber)
        .then(returnedPerson => setPersons(persons.map(p => p.id === person.id? returnedPerson : p)))
      }

    }else{
      const person = {
        name : newName,
        id : persons[persons.length-1].id +1,
        number : newNumber
      }
      
      personService.create(person)
      .then(responseData => {
        setPersons(persons.concat(responseData))

        setNotification({message: `Added ${person.name}`, style :'added'})
        setTimeout(() => {
        setNotification(null)
        }, 5000)
      }).catch(error =>{
        console.log(error.response.data)
      })

    }
    setNewName('')
    setNewNumber('')
  }

  const changeName = (event) => setNewName(event.target.value)
  const changeNumber = (event) => setNewNumber(event.target.value)

  const changeFilter = (event) => setFilter(event.target.value)

  const deletePerson = person => {
    const result = window.confirm(`Delete ${person.name}?`)
    if(result){
      const personsUpdated = persons.filter(p => p.id !== person.id)
      personService.remove(person.id)
      .catch( () => {
          setNotification({message: `Information about ${person.name} has already been removed from server`, style :"deleted"})

          setTimeout(() =>
            setNotification(null)
          , 5000)
        }
      )

      setPersons(personsUpdated)
    }
    
  }

  const personsToShow = filter === ''? persons : 
  persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification m = {notification}/>
        <Filter filter = {filter} changeFilter = {changeFilter}/>
      <h3>Add a new</h3>
        <PersonForm addPerson = {addPerson} newName = {newName} changeName = {changeName}
           newNumber = {newNumber} changeNumber = {changeNumber}/>
      <h3>Numbers</h3>
        <Persons persons = {personsToShow} deletePerson ={deletePerson}/>
    </div>
  )
}

export default App