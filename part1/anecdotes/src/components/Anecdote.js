import React from "react"
import { useParams } from "react-router-dom"

const Anecdote = ({ anecdoteById }) => {
	const id = useParams().id
	const anecdote = anecdoteById(id)
	return (
		<div>
			<h3>{anecdote.content} by {anecdote.author}</h3>
			<div>has {anecdote.votes} votes</div>
			<p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
		</div>
	)
}

export default Anecdote