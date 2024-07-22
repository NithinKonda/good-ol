'use client'
import React, { useState } from 'react'
import Time from './Time'
import Arrows from './Arrows'
const Game = () => {
    const [score,setScore] = useState(0)
    const [running,setRunning] = useState(false)

    const handleStart = () => {
        setRunning(true)
    }
  return (
    <div>
        <div>THIS IS THE GAME</div>
        <div>
            <Time running={running}/>
            <Arrows />
            <button onClick={handleStart}>Start</button>
            <p>Score : {score}</p>
        </div>
    </div>
  )
}

export default Game