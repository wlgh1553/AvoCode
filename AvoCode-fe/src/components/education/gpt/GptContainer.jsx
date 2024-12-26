import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from '@/assets/css/education/education.module.css'
import requestApi, { algebraApi } from '@/plugins/api-setting.js'

import send from '@/assets/images/gpt/send.svg'

function GptContainer() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const refInput = useRef(null)
    const chatBoxRef = useRef(null)

    const sendMessage = async (event) => {
        const newMessages = [...messages, { sender: 'You', text: message }]
        setMessages(newMessages)
        setMessage('')
        // event.preventDefault()
        try {
            const response = await algebraApi.get(`/gpt/qna`, {
                params: { query: message }
            })
            console.log(response)
            setMessages([...newMessages, { sender: 'GPT', text: response.data.qnaQuery }])

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    const formatGPTResponse = (response) => {
        // 양식 변환 로직 추가
        return response.replace(/\n/g, '<br>')
    }

    let [btnActive, setBtnActive] = useState(false)

    useEffect(() => {
        // if (btnActive) refInput.current.focus()
    }, [btnActive])


    const toggleActive = (e) => {
        setBtnActive((prev) => {
            return !prev
        })
    }

    return (
        <div
            className={`${styles['container-item']} ${styles['gpt-container']}` + ' ' + (btnActive ? styles.active : '')}>
            <div className={styles['gpt-contents']}>
                <div className={styles['chat-box']} ref={chatBoxRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`${styles[`message-${msg.sender}`]}`}>
                            <div className={`${styles[`message-width-${msg.sender}`]}`}>
                                <strong>{msg.sender}:</strong>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles['input-box']}>
                    <input
                        type="text"
                        ref={refInput}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your question..."
                        className={styles['qua-input']}
                    />
                    <button className={styles['qna-button']} onClick={sendMessage}><img src={send} /></button>
                </div>
            </div>
            <div className={`${styles['container-item-btn']} ${styles['gpt-item-btn']}`}>
                <div className={styles['item-btn-area']} onClick={toggleActive}>
                </div>
            </div>

        </div>

    )
}

export default GptContainer
