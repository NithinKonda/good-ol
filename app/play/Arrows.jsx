import React from 'react'
import { useState, useEffect } from 'react'

const Arrows = () => {
    const arrows = ['⬆️', '⬅️', '➡️', '⬇️', '⬇️']
    const [randomArrows, setRandomArrows] = useState([])

    useEffect(() => {
        const shuffled = [...arrows].sort(() => Math.random() - 0.5)
        setRandomArrows(shuffled)
    }, [])

    return (
        <div>
            <div style={{ fontSize: '2rem' }}>
                {randomArrows.map((arrow, index) => (
                    <span key={index}>{arrow} </span>
                ))}
            </div>
        </div>
    )
}

export default Arrows