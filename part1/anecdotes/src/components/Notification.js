import React from "react"

let lastId

const Notification = ({ message, setNotification }) => {
	if (message === '') return null

	clearTimeout(lastId)
	lastId = setTimeout(() => setNotification(''), 10000)

	return (
		<div>
			{message}
		</div>
	)
}

export default Notification