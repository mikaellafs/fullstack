import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const createNew = async (content) => {
	const newObj = {
		content: content,
		votes: 0
	}
	const response = await axios.post(baseUrl, newObj)
	return response.data
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const update = async (id, newObject) => {
	const request = await axios.put(`${baseUrl}/${id}`, newObject)
	return request.data
}

export default { getAll, createNew, update }