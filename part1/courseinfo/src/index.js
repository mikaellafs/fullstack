import React from 'react'
import ReactDOM from 'react-dom'


const Head = (p) => {
  return(
    <div>
      <h1>{p.course.name}</h1>
    </div>
  )
}

const Part = (p) => {
  return(
    <div>
      <p>
        {p.part.name} {p.part.exercises}
      </p>
    </div>
  )
}

const Content = (p) => {
  return(
    <>
      <Part part = {p.parts[0]} />
      <Part part = {p.parts[1]} />
      <Part part = {p.parts[2]} />
    </>
  )
}

const Total = (p) =>{
  return(
    <div>
      <p>Number of exercises {p.parts[0].exercises + p.parts[1].exercises + p.parts[2].exercises}</p>
    </div>
  )
}



const App = () => {
  const course = {
    name:'Half Stack application development',

    parts : [{
      name : 'Fundamentals of React',
      exercises : 10
    },
    {
      name : 'Using props to pass data',
      exercises : 7
    },
    {
      name : 'State of a component',
      exercises : 14
    }]
  }

  return (
    <>
      <Head course = {course} />
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))