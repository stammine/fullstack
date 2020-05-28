import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
          {props.part.name} {props.part.exercises}
        </p>
    )
}


const Content = (props) => {
    return (
      <div>
        {props.parts.map((part) => <Part part={part} />)}  
      </div>
    )
}

const Total = (props) => {
    const total = props.parts.map((item) => item.exercises).reduce((a,b) => a+b)
    return (
        <p>Number of exercises {total}</p>
    )
  }

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
            name: 'Fundamentals of React',
            exercises: 10
            },
            {
            name: 'Using props to pass data',
            exercises: 7
            },
            {
            name: 'State of a component',
            exercises: 14
            }
        ]
    }

  return (
    <div>
      <Header course={course.name} />
      <Content  parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// continue at https://fullstackopen.com/en/part1/component_state_event_handlers