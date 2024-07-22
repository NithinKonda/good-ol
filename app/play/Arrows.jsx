import React from 'react'
import styles from '../styles/Arrows.module.css'
const Arrows = ({ arrows, currentIndex }) => {
    return (
        <div className={styles.arrows}>
            {arrows.map((arrow, index) => (
                <span 
                    key={index} 
                    className={`${styles.arrow} ${index < currentIndex ? styles.completed : ''} ${index === currentIndex ? styles.current : ''}`}
                >
                    {arrow} 
                </span>
            ))}
        </div>
    )
}

export default Arrows