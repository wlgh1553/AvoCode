import React from 'react'
import { motion } from 'framer-motion'
import styles from '@/assets/css/education/animation.module.css'
import background from '@/assets/images/character/avocado/avo1.png'

const initialMotion = {
    veryDown: {
        y: 50
    },
    littleDown: {
        y: 0
    }
}

const springMotion = {
    type: 'spring',
    stiffness: 210
}

function Avocado(props) {
    return (
        <motion.div
            className={styles['avocado']}
            variants={initialMotion}
            initial="veryDown"
            animate="littleDown"
            transition={springMotion}
        >
            <img src={background} className={styles['avo-image']} />
            {props.children}
        </motion.div>
    )
}

export default Avocado
