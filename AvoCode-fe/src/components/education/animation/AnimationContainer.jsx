import React from 'react'
import styles from '@/assets/css/education/animation.module.css'
import Seed from './Seed'
import { motion } from 'framer-motion'
import Avocado from './Avocado'

function AnimationContainer({ locals, args, isLoading, globalVariables }) {
    if (isLoading)
        return <div className={`${styles['animation-container']} ${styles['animation-message']}`}>loading...</div>

    const isAddress = (value) => {
        const addressPattern = /^0x[0-9a-fA-F]+$/
        return addressPattern.test(value)
    }

    const makeSeed = (address) => {
        if (isAddress(address)) {
            return <div></div> // 주소값인 경우 화살표 그리기
        }
        return <Seed seedValue={address} /> // 그렇지 않은 경우 원래 값 전달
    }

    const isArray = (variable) => {
        const arrayPattern = /^\{\s*(\{.*?\}|[^{}]*?)\s*\}$/
        return arrayPattern.test(variable.value)
    }

    const makeAvocado = (variable) => {
        if (isArray(variable)) {
            const parsedArray = parseArray(variable.value)
            const dim = getArrayDimensions(parsedArray) //1 또는 2차원으로 가정

            if (dim === 1) {
                return (
                    <motion.div className={styles['avocado-array-conatiner']}>
                        <motion.div className={styles['array-name']}>{variable.name}</motion.div>
                        <motion.div className={styles['array-row']}>
                            {parsedArray.map((e, idx) => {
                                return <Avocado key={idx}>{makeSeed(e)}</Avocado>
                            })}
                        </motion.div>
                    </motion.div>
                )
            } else if (dim === 2) {
                return (
                    <motion.div className={styles['avocado-array-container']}>
                        <motion.div className={styles['array-name']}>{variable.name}</motion.div>
                        {parsedArray.map((e1, idx1) => {
                            return (
                                <motion.div key={idx1} className={styles['array-row']}>
                                    {e1.map((e2, idx2) => {
                                        return <Avocado key={`${idx1}-${idx2}`}>{makeSeed(e2)}</Avocado>
                                    })}
                                </motion.div>
                            )
                        })}
                    </motion.div>
                )
            }

            //임시
            return (
                <motion.div className={styles['avocado-array-conatiner']}>
                    {parsedArray.map((variable) => makeAvocado(variable))}
                </motion.div>
            )
        }
        return (
            <Avocado key={variable.address}>
                {makeSeed(variable.value)}
                <motion.div className={styles['avocado-name']}>{variable.name}</motion.div>
            </Avocado>
        )
    }

    const makeAvocados = (variables) => {
        return (
            <motion.div className={styles['avocado-container']}>
                {variables.map((variable) => makeAvocado(variable))}
            </motion.div>
        )
    }

    const renderVariableSection = (variables, sectionName) => {
        if (!variables || variables.length === 0) {
            return <div></div>
        }

        return (
            <div>
                <h6 className={styles['variable-area-name']}>{sectionName}</h6>
                {makeAvocados(variables)}
            </div>
        )
    }

    function parseArray(arrayString) {
        // Trim the outer braces
        arrayString = arrayString.trim()
        if (arrayString.startsWith('{') && arrayString.endsWith('}')) {
            arrayString = arrayString.slice(1, -1).trim()
        }

        let result = []
        let temp = ''
        let braceLevel = 0

        for (let char of arrayString) {
            if (char === '{') {
                braceLevel++
            } else if (char === '}') {
                braceLevel--
            }

            if (char === ',' && braceLevel === 0) {
                result.push(temp.trim())
                temp = ''
            } else {
                temp += char
            }
        }
        if (temp) {
            result.push(temp.trim())
        }

        // Parse each element recursively
        return result.map((item) => {
            if (item.startsWith('{') && item.endsWith('}')) {
                return parseArray(item)
            } else {
                return item
            }
        })
    }

    function getArrayDimensions(arr) {
        if (!Array.isArray(arr)) {
            return 0
        }

        let maxSubArrayDimension = 0

        for (let item of arr) {
            const subArrayDimension = getArrayDimensions(item)
            if (subArrayDimension > maxSubArrayDimension) {
                maxSubArrayDimension = subArrayDimension
            }
        }

        return maxSubArrayDimension + 1
    }

    return (
        <div className={styles['animation-container']}>
            <div className={styles['global-container']}>{renderVariableSection(globalVariables, 'global')}</div>
            <div className={styles['local-container']}>{renderVariableSection(locals, 'local')}</div>
            <div className={styles['args-container']}>{renderVariableSection(args, 'args')}</div>
        </div>
    )
}

export default AnimationContainer
