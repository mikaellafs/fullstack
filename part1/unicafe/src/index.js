import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (p) =>{
  return(
    <button onClick = {p.handlerClick}>{p.text}</button>
  )
}

const Statistic = (p) =>{
  return (
    <tbody>
    <tr>
      <td>{p.text}</td>
      <td>{p.t}</td>
    </tr>
    </tbody>
  )
}

const Statistics = ({good, neutral, bad}) =>{
  if(good === 0 && neutral === 0 && bad === 0){
    return(
      <>
        <h2>Statitics</h2>
        <p>No feedback given</p>
      </>
    )
  }

  const total = good + neutral + bad
  const average = (good - bad)/total
  const percent = 100*(good)/total

  return(
    <>
    <h2>Statitics</h2>
    <table>
    <Statistic text = 'Good' t = {good}/>
    <Statistic text = 'Neutral' t = {neutral}/>
    <Statistic text = 'Bad' t = {bad}/>
    <Statistic text = 'All' t = {total} />
    <Statistic text = 'Average' t = {average.toFixed(2)} />
    <Statistic text = 'Positive' t = {percent.toFixed(2) + ' %'}/>
    </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  const increaseGood = () => setGood(good+1)
  const increaseNeutral = () => setNeutral(neutral+1)
  const increaseBad = () => setBad(bad+1)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text = 'good' handlerClick = {increaseGood} />
      <Button text = 'neutral' handlerClick = {increaseNeutral}/>
      <Button text = 'bad' handlerClick = {increaseBad}/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
