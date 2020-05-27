import React from 'react'

const Statistics = ({ store }) => {
	if(store.getState().good === 0 && store.getState().ok === 0 && store.getState().bad === 0){
    return(
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
	}
	
	const sum = store.getState().good + store.getState().ok + store.getState().bad
	const average = (store.getState().good - store.getState().bad)/sum
	const percent = 100*(store.getState().good)/sum

	return (
		<>
			<h2>Statistics</h2>
			<div>good {store.getState().good}</div>
			<div>neutral {store.getState().ok}</div>
			<div>bad {store.getState().bad}</div>
			<div>All {sum}</div>
			<div>Average {average}</div>
			<div>Positive {percent} %</div>
		</>
  )
}

export default Statistics