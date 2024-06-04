import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from '@/assets/css/education/animation.module.css'
import background from '@/assets/images/character/avocado/seed.png'

const rotateMotion = {
    rotateSeed: {
        rotate: 360
    },
    initialSeed: {
        rotate: 0
    },
    rotateAndMoveSeed: {
        rotate: 360,
        y: 0
    }
}

function Seed({ seedValue, nowLine }) {
    const [isClicked, setIsClicked] = useState(false)

    const toggleClick = () => {
        setIsClicked(!isClicked)
    }

    return (
        <motion.div
            className={styles['seed']}
            variants={rotateMotion}
            initial={nowLine ? { y: -10 } : { y: 0 }}
            animate={nowLine ? 'rotateAndMoveSeed' : isClicked ? 'rotateSeed' : 'initialSeed'}
            transition={{ type: 'spring', stiffness: 260 }}
            style={{
                backgroundImage: `url(${background})`
            }}
            onClick={toggleClick}
        >
            <div className={styles['seed-value']}>{seedValue}</div>
        </motion.div>
    )
}

export default Seed
