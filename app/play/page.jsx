'use client';

import React, { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Time from './Time'
import Arrows from './Arrows'
import styles from '../styles/Game.module.css'

const Game = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [score, setScore] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [arrows, setArrows] = useState([])
    const [resetTime, setResetTime] = useState(false)

    const generateRandomArrows = useCallback(() => {
        const arrowOptions = ['⬆️', '⬅️', '➡️', '⬇️']
        return Array.from({ length: 5 }, () => arrowOptions[Math.floor(Math.random() * arrowOptions.length)])
    }, [])

    const handleStart = useCallback(() => {
        setIsRunning(true)
        setCurrentIndex(0)
        setScore(0)
        setArrows(generateRandomArrows())
        setResetTime(prev => !prev)
    }, [generateRandomArrows])

    const updateScore = useCallback(async (finalScore) => {
        if (session && session.user) {
            try {
                const response = await fetch('/api/scores', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: session.user.name, score: finalScore }),
                })
                if (response.ok) {
                    console.log('Score updated successfully')
                }
            } catch (error) {
                console.error('Error updating score:', error)
            }
        }
    }, [session])

    const handleGameEnd = useCallback(() => {
        setIsRunning(false)
        updateScore(score)
    }, [score, updateScore])

    const handleKeyPress = useCallback((key) => {
        if (!isRunning) return

        const arrowMap = {
            'ArrowUp': '⬆️',
            'ArrowLeft': '⬅️',
            'ArrowRight': '➡️',
            'ArrowDown': '⬇️'
        }

        if (arrowMap[key] === arrows[currentIndex]) {
            if (currentIndex === arrows.length - 1) {
                handleGameEnd()
            } else {
                setCurrentIndex(prevIndex => prevIndex + 1)
            }
        } else {
            setCurrentIndex(0)
            setArrows(generateRandomArrows())
        }
    }, [isRunning, arrows, currentIndex, generateRandomArrows, handleGameEnd])

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
    }, [handleKeyPress])

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.game}>
            <h1 className={styles.title}>ARROW GAME</h1>
            {session ? (
                <p>Welcome, {session.user.name}!</p>
            ) : (
                <p>Welcome, Guest!</p>
            )}
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