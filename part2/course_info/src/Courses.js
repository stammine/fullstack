import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
    const total = course.parts.map((item) => item.exercises).reduce((a,b) => a+b)
    return (
        <p>Number of exercises {total}</p>
    )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((part) => <Part part={part} />)}  
      </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

const Courses = ({ courses }) => {
    return courses.map(course => <Course course={course} />)
}

export default Courses;

//https://fullstackopen.com/en/part2/forms