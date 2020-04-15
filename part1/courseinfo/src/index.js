import React from 'react'
import ReactDOM from 'react-dom'


const Head = (n) => {
  return(
    <div>
      <h1>{n.course}</h1>
    </div>
  )
}

const Part = (p) => {
  return(
    <div>
      <p>
        {p.part} {p.exercise}
      </p>
    </div>
  )
}

const Content = (p) => {
  return(
    <>
      <Part part = {p.part1} exercise = {p.exercises1} />
      <Part part = {p.part2} exercise = {p.exercises2} />
      <Part part = {p.part3} exercise = {p.exercises3} />
    </>
  )
}

const Total = (ex) =>{
  return(
    <div>
      <p>Number of exercises {ex.exercises1 + ex.exercises2 + ex.exercises3}</p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Head course = {course} />
      <Content part1 = {part1} part2 = {part2} part3 = {part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))