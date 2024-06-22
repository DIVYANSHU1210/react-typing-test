import React from 'react'
import Graph from './Graph'

function TestResults({wpm,accuracy,correctChars ,incorrectChars ,extraChars}){
  return (
    <div>
        <h1>test results</h1>
        <div className='test-results'>
            <div className='left'>
                <p>Words per minute speed</p>
                <h3>{wpm}</h3>
                <p>Accuracy</p>
                <h3>{accuracy}</h3>
                <p>Correct|incorrect|extra</p>
                <h3>{correctChars}|{incorrectChars}|{extraChars}</h3>
            </div>
            <div className='right'>
                <Graph></Graph>
            </div>
        </div>
    
    </div>

  )
}

export default TestResults