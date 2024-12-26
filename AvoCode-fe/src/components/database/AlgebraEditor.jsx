import styles from '@/assets/css/database/editor.module.css'

import { useEffect, useRef, useState } from 'react'

import play from '@/assets/images/database/icon/play-fill.svg'
import axios from 'axios'
import requestApi, { algebraApi } from '@/plugins/api-setting.js'

function AlgebraEditor({ result, setResult, setLoading }) {
    const [text, setText] = useState('π_{borrower.customer_name, borrower.loan_number, loan.branch_name, loan.amount, depositor.account_number}\n' +
        '(\n' +
        '  (borrower ⨝ loan) ⨝ depositor\n' +
        ')\n')

    const refInput = useRef(null)


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await setResult([])
            await setLoading(prev => true)
            const response = await algebraApi.get(`/algebra`, {
                params: { query: text }
            })
            // console.log(response)
            await setLoading(prev => false)

            if (response.data.includes('wrong')) {
                alert('잘못된 attribute 혹은 문법입니다.')
                return
            }
            setResult(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
            setResult([])
            await setLoading(prev => false)
        }
    }

    useEffect(() => {
        refInput.current.focus()
    }, [])

    const handleTextChange = (event) => {
        const inputText = event.target
        const cursorPosition = inputText.selectionStart

        const newText = inputText.value
            .replace(/\\select /g, 'σ')
            .replace(/\\project /g, 'π')
            .replace(/\\union /g, '∪')
            .replace(/\\intersection /g, '∩')
            .replace(/\\difference /g, '−')
            .replace(/\\cartesian /g, '×')
            .replace(/\\division /g, '÷')
            .replace(/\\rename /g, 'ρ')
            .replace(/\\join /g, '⋈')
            .replace(/\\theta_join /g, '⋈θ')
            .replace(/\\left_outer_join /g, '⟕')
            .replace(/\\right_outer_join /g, '⟖')
            .replace(/\\full_outer_join /g, '⟗')

        setText(newText)

        let newCursorPosition = cursorPosition

        if (newText.length !== inputText.value.length) {
            newCursorPosition += 'σ'.length - '\\sigma '.length
        }

        setTimeout(() => {
            inputText.selectionStart = newCursorPosition
            inputText.selectionEnd = newCursorPosition
        }, 0)
    }

    const handleKeyDown = (event) => {
        const { key, target } = event
        let insertText = ''

        switch (key) {
            case '(':
                insertText = '()'
                break
            case '{':
                insertText = '{}'
                break
            case '[':
                insertText = '[]'
                break
            default:
                return // 다른 키 입력은 무시
        }

        const start = target.selectionStart
        const end = target.selectionEnd
        const textBefore = text.slice(0, start)
        const textAfter = text.slice(end)

        // 선택된 텍스트를 대체하거나 텍스트를 추가
        const newValue = textBefore + insertText + textAfter
        setText(newValue)

        // 커서 위치를 여는 괄호와 닫는 괄호 사이에 놓기
        setTimeout(() => {
            target.selectionStart = start + 1
            target.selectionEnd = start + 1
        }, 0)

        event.preventDefault() // 기본 입력 동작 방지
    }

    const insertAlgebra = (algebra) => {
        if (refInput.current) {
            const textarea = refInput.current
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const before = text.substring(0, start)
            const after = text.substring(end, text.length)

            setText(before + algebra + after)

            // 업데이트된 텍스트 길이만큼 커서 위치를 조정합니다.
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + algebra.length
                textarea.focus()
            }, 0)
        }
    }

    return (
        <div className={styles['container']}>
            <div className={styles['editor-button-container']}>
                <button onClick={() => insertAlgebra('σ')}>σ</button>
                <button onClick={() => insertAlgebra('π')}>π</button>
                <button onClick={() => insertAlgebra('∪')}>∪</button>
                <button onClick={() => insertAlgebra('∩')}>∩</button>
                <button onClick={() => insertAlgebra('−')}>−</button>
                <button onClick={() => insertAlgebra('×')}>×</button>
                <button onClick={() => insertAlgebra('÷')}>÷</button>
                <button onClick={() => insertAlgebra('ρ')}>ρ</button>
                <button onClick={() => insertAlgebra('⋈')}>⋈</button>
                <button onClick={() => insertAlgebra('⋈θ')}>⋈θ</button>
                <button onClick={() => insertAlgebra('⟕')}>⟕</button>
                <button onClick={() => insertAlgebra('⟖')}>⟖</button>
                <button onClick={() => insertAlgebra('⟗')}>⟗</button>
            </div>
            <textarea
                ref={refInput}
                className={styles['editor']}
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
            ></textarea>

            <div className={styles['run-button-container']} onClick={handleSubmit}>
                <p>RUN SQL</p>
                <img src={play} alt="play" />
            </div>
        </div>
    )
}

export default AlgebraEditor
