import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text,increment}) => {
  return (
    <button onClick={increment} >{text}</button>
  )
}

const Statistic = ({text,count}) => {
  return (
    <tr  key={text}>
      <td>{text}</td>
      <td>{count} {text === "positive" && "%"}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total =  good + neutral + bad;
  const title = "statistics";
  if(total === 0) {
    return (
      <div>
        <h1>{title}</h1>
        <p>No feedback given.</p>
      </div>
    )
  }
  const weighted = (good * 1) + (bad * -1)
  const average = weighted / total;
  const positiveRatio = good / total;

  return (
    <div>
      <h1>{title}</h1>
      <table>
        <tbody>
          <Statistic text="good" count={good} />
          <Statistic text="neutral" count={neutral} />
          <Statistic text="bad" count={bad} />
          <Statistic text="average" count={average} />
          <Statistic text="positive" count={positiveRatio * 100} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const increment = (count, setter) => {
    return () => {
      setter(count + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button text={"good"} increment={increment(good, setGood)}/>
      <Button text={"neutral"} increment={increment(neutral, setNeutral)}/>
      <Button text={"bad"} increment={increment(bad, setBad)}/>
      <Statistics good={good}
                  neutral={neutral}
                  bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)