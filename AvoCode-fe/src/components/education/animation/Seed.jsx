import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from '@/assets/css/education/animation.module.css'
import background from '@/assets/images/character/avocado/seed.png'

const rotateMotion = (rotateValue) => ({
    rotateSeed: {
        rotate: rotateValue
    },
    initialSeed: {
        rotate: 0
    }
})

function Seed({ seedValue, nowLine }) {
    const [rotateValue, setRotateValue] = useState(0)

    useEffect(() => {
        // seedValue가 변경될 때마다 회전 각도를 증가시킴
        setRotateValue((prevRotate) => prevRotate + 360)
    }, [seedValue])

    return (
        <motion.div
            className={styles['seed']}
            variants={rotateMotion(rotateValue)}
            initial={nowLine ? { y: -10 } : { y: 0 }}
            animate="rotateSeed"
            transition={{ type: 'spring', stiffness: 260 }}
            style={{
                backgroundImage: `url(${background})`
            }}
        >
            <div className={styles['seed-value']}>{seedValue}</div>
        </motion.div>
    )
}

export default Seed
