import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const createNew = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

		dispatch(newAnecdote(content))
		dispatch(setNotification(`New anecdote created '${content}'`, 5))
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={createNew}>
				<div><input name="anecdote" /></div>
				<button type="submit">create</button>
			</form>
		</div >
	)
}

export default AnecdoteForm