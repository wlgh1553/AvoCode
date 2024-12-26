import React, { useEffect, useState } from 'react'
import styles from '@/assets/css/education/animation.module.css'
import AnimationContainer from './AnimationContainer'
import CodeContainer from './CodeContainer'
import { requestGDBApi } from '@/plugins/api-setting.js'

function ModalContainer({ isVisible, onClose, editorValue }) {
    //확실히 사용
    const [sessionId, setSessionId] = useState(null)
    const [debugLogs, setDebugLogs] = useState([])
    const [execPoint, setExecPoint] = useState(0) // debugLogs에서 현재 실행중인 곳을 가리킴
    const [execLine, setExecLine] = useState(0)
    const [locals, setLocals] = useState([])
    const [args, setArgs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [globalVariables, setGlobalVariables] = useState([]) //TODO : 추후 global 변수 추가할 수도 있음.

    const increaseExecPoint = () => {
        if (execPoint >= debugLogs.length - 1) return
        setExecPoint((prevExecPoint) => prevExecPoint + 1)
    }

    const decreaseExecPoint = () => {
        if (execPoint <= 0) return
        setExecPoint((prevExecPoint) => prevExecPoint - 1)
    }

    useEffect(() => {
        const execInfo = debugLogs[execPoint]
        if (execInfo) {
            setLocals(execInfo.locals || [])
            setArgs(execInfo.args || [])
            setExecLine(Number(execInfo.line))
        }
    }, [execPoint, debugLogs])

    useEffect(() => {
        manageDebugging()
    }, [isVisible])

    const manageDebugging = async () => {
        if (isVisible) {
            setIsLoading(true)
            const sessionId = await uploadFileToServer()
            setSessionId(sessionId)
            saveDebuggedLogs(sessionId)
            setIsLoading(false)
        } else {
            deleteDebuggedLogs(sessionId)
            setSessionId(null)
        }
    }

    const uploadFileToServer = async () => {
        try {
            // .c 파일 생성
            const blob = new Blob([editorValue], { type: 'text/plain' })
            const file = new File([blob], 'code.c', { type: 'text/plain' })

            // FormData 객체에 파일 추가
            const formData = new FormData()
            formData.append('file', file)

            const { data } = await requestGDBApi.post('/debugger', formData)
            const { message, session_id } = data

            return session_id // 성공 시 session_id 반환
        } catch (error) {
            if (error.response) {
                // 서버가 400대 응답을 반환한 경우
                console.error('Error:', error.response.status) // 상태 코드 (예: 400)
                console.error('Message:', error.response.data.message) // 서버에서 보낸 메시지
                window.alert(error.response.data.message || '파일 업로드 실패')
            } else {
                // 서버에 도달하지 못한 경우 또는 다른 네트워크 오류
                console.error('Error:', error.message)
                window.alert('파일 업로드 중 오류가 발생했습니다.')
            }
            onClose() // 업로드 실패 시 모달 닫기
        }
    }

    const saveDebuggedLogs = async (sessionId) => {
        const { status, data } = await requestGDBApi.get(`/debugger/${sessionId}`)
        const { message, data: logs } = data

        if (status !== 200) {
            console.error('Getting logs failed', message)
            return
        }
        setDebugLogs(logs)
    }

    const deleteDebuggedLogs = async (sessionId) => {
        if (!sessionId) return
        const { status, data } = await requestGDBApi.delete('/debugger', {
            data: { session_id: sessionId }
        })
    }

    return isVisible ? (
        <div className={styles['container']}>
            <div className={styles['content']} onClick={(e) => e.stopPropagation()}>
                <div className={styles['header']}>
                    <h4 className={styles['title']}>Animation Debugger</h4>
                    <button className={styles['close-button']} onClick={onClose}>
                        X
                    </button>
                </div>
                <div className={styles['body']}>
                    <CodeContainer
                        editorValue={editorValue}
                        increaseExecPoint={increaseExecPoint}
                        decreaseExecPoint={decreaseExecPoint}
                        execLine={execLine}
                    />
                    <AnimationContainer
                        locals={locals}
                        args={args}
                        globalVariables={globalVariables}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    ) : null
}

export default ModalContainer
