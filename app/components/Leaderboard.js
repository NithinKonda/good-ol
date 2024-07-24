'use client';

import { useState, useEffect } from 'react'

const Leaderboard = () => {
  const [scores, setScores] = useState([])

  const fetchScores = async () => {
    const response = await fetch('/api/scores')
    if (response.ok) {
      const data = await response.json()
      setScores(data)
    }
  }

  useEffect(() => {
    fetchScores()
    const interval = setInterval(fetchScores, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index} className="mb-2">
            {score.name}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Leaderboard