import React from 'react'
import styles from '@/assets/css/education/animation.module.css'
import { motion } from 'framer-motion'

function CodeContainer({ editorValue, nextExecPoint, prevExecPoint, execLine }) {
    const addLineNumbers = (code) => {
        return code.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                <span className={`${styles['line-number']} ${index + 1 === execLine ? styles['exec-line'] : ''}`}>
                    {index + 1}
                    {'\t'}
                </span>
                <span className={`${index + 1 === execLine ? styles['exec-line'] : ''}`}>{line}</span>
                <br />
            </React.Fragment>
        ))
    }

    return (
        <div className={styles['code-container']}>
            <div className={styles['code-block']}>
                <pre className={styles['code']}>
                    <code>{addLineNumbers(editorValue)}</code>
                </pre>
            </div>
            <div className={styles['button-block']}>
                <button className={styles['exec-button']} onClick={prevExecPoint}>
                    prev
                </button>
                <button className={styles['exec-button']} onClick={nextExecPoint}>
                    next
                </button>
            </div>
        </div>
    )
}

export default CodeContainer
