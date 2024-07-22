'use client'
import React, { useState, useEffect } from 'react'
import Time from './Time'
import Arrows from './Arrows'
import styles from '../styles/Game.module.css'

const Game = () => {
    const [score, setScore] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [arrows, setArrows] = useState([])
    const [resetTime, setResetTime] = useState(false)

    const handleStart = () => {
        setIsRunning(true)
        setCurrentIndex(0)
        setScore(0)
        setArrows(generateRandomArrows())
        setResetTime(true)
        // Reset the resetTime flag after a short delay
        setTimeout(() => setResetTime(false), 50)
    }

    const handleKeyPress = (key) => {
        if (!isRunning) return

        const arrowMap = {
            'ArrowUp': '⬆️',
            'ArrowLeft': '⬅️',
            'ArrowRight': '➡️',
            'ArrowDown': '⬇️'
        }

        if (arrowMap[key] === arrows[currentIndex]) {
            if (currentIndex === arrows.length - 1) {
                // Game completed successfully
                setIsRunning(false)
            } else {
                setCurrentIndex(prevIndex => prevIndex + 1)
            }
        } else {
            // Wrong arrow pressed, reset game
            setCurrentIndex(0)
            setArrows(generateRandomArrows())
        }
    }

    const generateRandomArrows = () => {
        const arrowOptions = ['⬆️', '⬅️', '➡️', '⬇️']
        return Array.from({ length: 5 }, () => arrowOptions[Math.floor(Math.random() * arrowOptions.length)])
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                handleKeyPress(event.key)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isRunning, currentIndex, arrows])

    return (
        <div className={styles.game}>
            <h1 className={styles.title}>ARROW GAME</h1>
            <div className={styles.gameContent}>
                <Time isRunning={isRunning} onTimeUpdate={setScore} resetTime={resetTime} />
                <Arrows arrows={arrows} currentIndex={currentIndex} />
                <button 
                    className={styles.startButton} 
                    onClick={handleStart} 
                    disabled={isRunning}
                >
                    Start
                </button>
                <p className={styles.score}>Score : {score}</p>
            </div>
        </div>
    )
}

export default Game