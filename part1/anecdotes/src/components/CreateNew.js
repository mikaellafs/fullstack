import React from 'react'
import { useHistory } from "react-router-dom"
import { useField } from '../hooks/index'

const omitKey = (obj, key) =>{
	const {[key] : omitted, ...rest} = obj
	return rest
}

const CreateNew = (props) => {
	const content = useField('text')
	const author = useField('text')
	const info = useField('text')

	const history = useHistory()

	const handleSubmit = (e) => {
		e.preventDefault()

		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})

		history.push('/')
	}

	const resetAll = () =>{
		content.reset()
		author.reset()
		info.reset()
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
            <input {...omitKey(content, 'reset')} />
				</div>
				<div>
					author
            <input {...omitKey(author, 'reset')} />
				</div>
				<div>
					url for more info
            <input {...omitKey(info, 'reset')} />
				</div>
				<button type = 'submit'>create</button>
				<button type = 'reset' onClick = {resetAll}>reset</button>
			</form>
			
		</div>
	)

}

export default CreateNew