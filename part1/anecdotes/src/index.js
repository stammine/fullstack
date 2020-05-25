import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const initializeVotes = (cnt) => {
  return [...Array(cnt).keys()].reduce((map, key) => {
    map[key] = 0;
    return map;
  }, {})
}

const argMax = (arr) => arr.indexOf(Math.max(...arr));


const App = (props) => {
  const anecdotesCnt = props.anecdotes.length;
  const [selected, setSelected] = useState(getRandomInt(anecdotesCnt))
  const [votes, setVotes] = useState(initializeVotes(anecdotesCnt))
  const mostVoted = argMax([...Array(anecdotesCnt).keys()].map(key => votes[key]))

  const nextAnecdote = () => setSelected(getRandomInt(anecdotesCnt))
  const vote = () => {
    const newVotes = { ...votes }
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={vote} >vote</button>
        <button onClick={nextAnecdote} >next anecdote</button>
      </div>
      <h1>Anecdote with the most votes</h1>
      <div>{props.anecdotes[mostVoted]}</div>
      <div>has {votes[mostVoted]} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)