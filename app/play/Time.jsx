'use client'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Time.module.css'

const Time = ({ isRunning, onTimeUpdate, resetTime }) => {
    const [time, setTime] = useState(0)

    useEffect(() => {
        let interval

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 10
                    onTimeUpdate(newTime)
                    return newTime
                })
            }, 10)
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [isRunning, onTimeUpdate])

    useEffect(() => {
        if (resetTime) {
            setTime(0)
        }
    }, [resetTime])

    const formatTime = (time) => {
        const seconds = Math.floor(time / 1000)
        const milliseconds = time % 1000

        return `${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`
    }

    return (
        <div className={styles.time}>
            <p>Time: {formatTime(time)}</p>
        </div>
    )
}

export default Time