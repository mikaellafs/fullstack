import React from 'react';

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.map(p => p.exercises).reduce((a, c) => a+c)
    return(
      <b><p>total of {sum} exercises</p></b>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        <li>{props.part.name} {props.part.exercises}</li>
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        <ul>
          {course.parts.map(part => <Part key={part.id} part={part}/>)}
        </ul>
      </div>
    )
  }
  
  const Course = ({course}) =>{
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course