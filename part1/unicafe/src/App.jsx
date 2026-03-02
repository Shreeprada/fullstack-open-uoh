import { useState } from 'react';

const Button=({text,onClick})=>{
  return (<div>
    <button onClick={onClick}>{text}</button>
  </div>)
}

const StatisticLine=({text,value})=>{
  return(<>
  <td>{text}</td>
  <td>{value}</td>
  </>)

}

const Statistics=({good,bad,neutral})=>{
  const allClicks=good+neutral+bad;
  let average;
  if (allClicks===0){
    average= 0;
  } else {
       average=((good*1)+(neutral*0)+(bad*-1))/allClicks;
  }
  let positive;
  if (allClicks===0){
    positive=0;
  } else{
    positive=((good*1)/allClicks)*100 +"%";
  }

  if (allClicks===0){
    return (<div>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </div>)
  }
  return(<div>
    <h2>Statistics</h2>
    <table>
      <tbody>
        <tr>
          <StatisticLine text="Good" value={good}/>
        </tr>
        <tr>
          <StatisticLine text="Neutral" value={neutral}/>
        </tr>
        <tr>
          <StatisticLine text="Bad" value={bad}/>
        </tr>
        <tr>
          <StatisticLine text="All" value={allClicks}/>
        </tr>
        <tr>
          <StatisticLine text="Average" value={average}/>
        </tr>
        <tr>
          <StatisticLine text="Positive" value={positive}/>
        </tr>
      </tbody>
    </table>  
  </div>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick=(text)=>{
    if (text==='good'){
      setGood(good+1);
    }else if (text==='neutral'){
      setNeutral(neutral+1);
    }else if (text==='bad'){
      setBad(bad+1);
    }
  }

 

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" onClick={()=>handleClick('good')}/>
      <Button text="Neutral" onClick={()=>handleClick('neutral')}/>
      <Button text="Bad" onClick={()=>handleClick('bad')}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

export default App
