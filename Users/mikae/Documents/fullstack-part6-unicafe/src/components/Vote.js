import React from 'react'

const Vote = ({ store }) => {
	return (
		<>
		<button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
		<button onClick={() => store.dispatch({ type: 'OK' })}>neutral</button>
		<button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
		<button onClick={() => store.dispatch({ type: 'ZERO' })}>reset stats</button>
		</>
  )
}

export default Vote