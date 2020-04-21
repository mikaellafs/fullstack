import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (p) =>{
  return(
    <button onClick = {p.handlerClick}>{p.text}</button>
  )
}

const DisplayAn = ({anecdotes, selected, votes}) =>{
  return(
    <>
    <div>{anecdotes[selected]}</div>
    <div>has {votes[selected]} votes</div>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))
  const [mostVotes, setMost] = useState(0)

  const nextAnecdote = () =>{
    let newNumber = Math.floor(Math.random()*5);

    setSelected(newNumber)
  }

  const vote = () =>{
    const newVotes = [...votes]
    newVotes[selected]++

    setVotes(newVotes)

    if(selected !== mostVotes){
      let [imost, most] = [mostVotes, votes[mostVotes]]

      for(let i = 0; i<6; i++){
        if(votes[i]>=most){
          most = votes[i]
          imost = i
        }
      }
      setMost(imost)
    }
  } 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAn votes = {votes} anecdotes = {props.anecdotes} selected = {selected}/>
      <Button text = 'vote' handlerClick = {vote} />
      <Button text = 'next anecdote' handlerClick = {nextAnecdote}/>

      <h1>Anecdote with most votes</h1>
      <DisplayAn votes = {votes} anecdotes = {props.anecdotes} selected = {mostVotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)