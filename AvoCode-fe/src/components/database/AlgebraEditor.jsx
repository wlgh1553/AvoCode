import styles from '@/assets/css/database/editor.module.css'

import { useEffect, useRef, useState } from 'react'

import play from '@/assets/images/database/icon/play-fill.svg'
import axios from 'axios'

function AlgebraEditor({ result, setResult }) {
    const [text, setText] = useState('')

    const refInput = useRef(null)


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.get(`http://localhost:3000/algebra/getLoan`, {
                params: { query: text }
            })
            setResult(response.data.result)

            console.log(response)
        } catch (error) {
            console.error('Error fetching data:', error)
            setResult([])
        }
    }
    useEffect(() => {
        refInput.current.focus()
    }, [])

    const handleTextChange = (event) => {
        const inputText = event.target
        const cursorPosition = inputText.selectionStart

        const newText = inputText.value
            .replace(/\\sigma /g, 'σ')
            .replace(/\\project /g, 'π')
            .replace(/\\union /g, '∪')
            .replace(/\\intersection /g, '∩')
            .replace(/\\difference /g, 'ㅡ')
            .replace(/\\cartesian /g, '×')

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

    return (
        <div className={styles['container']}>
            <input
                ref={refInput}
                className={styles['editor']}
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
            ></input>
            <div>
                <img src={play} alt="play" onClick={handleSubmit} />
            </div>

        </div>
    )
}

export default AlgebraEditor
