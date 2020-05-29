import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    const anec = state.anecdotes.filter(a => a.content.includes(state.filter))

    return anec.sort((an1, an2) => an2.votes - an1.votes)
  })

	const vote = (anec) => {
    dispatch(createVote(anec))
    dispatch(setNotification(`You voted '${anec.content}'`, 5))
  }

	return(
		<div>
			{anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
		</div>
	)
}

export default AnecdoteList