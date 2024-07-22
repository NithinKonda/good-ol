'use client'
import React, { useState, useEffect } from 'react'

const Time = ({ running }) => {
    const [time, setTime] = useState(0)

    useEffect(() => {
        let interval

        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [running])

    const formatTime = (time) => {
        const seconds = Math.floor(time / 1000)
        const milliseconds = time % 1000

        return `${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`
    }

    return (
        <div>
            <p>Time: {formatTime(time)}</p>
        </div>
    )
}

export default Time