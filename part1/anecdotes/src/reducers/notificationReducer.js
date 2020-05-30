let lastIdTimeOut

export const removeNotification = () => {
	return ({
		type: 'REMOVE'
	})
}

export const setNotification = (message, sec) => {
	return async dispatch => {
		dispatch({
			type: 'NEW_NOTIF',
			message: message
		})

		clearTimeout(lastIdTimeOut)
		lastIdTimeOut = setTimeout(() =>{
			dispatch(removeNotification())
		}, sec*1000)
	}
}

const reducer = (state = null, action) => {
	switch (action.type) {
		case 'NEW_NOTIF':
			return action.message
		case 'REMOVE':
			return null
		default:
			return state
	}

}

export default reducer