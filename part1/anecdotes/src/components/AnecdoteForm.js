import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
	const createNew = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

		props.newAnecdote(content)
		props.setNotification(`New anecdote created '${content}'`, 5)
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

const mapDispatchToProps = {
  newAnecdote, setNotification
}


const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm