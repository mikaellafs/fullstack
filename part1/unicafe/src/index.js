import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'
import Vote from './components/Vote'
import Statistics from './components/Statistics'

const store = createStore(reducer)

const App = () => {
  return (
    <div>
      <h2>Give feedback</h2>
      <Vote store = {store}/>
      <Statistics store = {store} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
