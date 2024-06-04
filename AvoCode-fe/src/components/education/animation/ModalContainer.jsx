import React, { useState } from 'react'
import styles from '@/assets/css/education/animation.module.css'
import AnimationContainer from './AnimationContainer'
import CodeContainer from './CodeContainer'

function ModalContainer({ isVisible, onClose, editorValue }) {
    const debuggerServer = import.meta.env.VITE_DEBUGGER_URL

    if (!isVisible) return null

    const [debugStart, setDebugStart] = useState(false)
    const [debugEnd, setDebugEnd] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [serverResponse, setServerResponse] = useState(null)
    const [globalVariables, setGlobalVariables] = useState([])
    const [sessionId, setSessionId] = useState(0)
    const [execRecord, setExecRecord] = useState([]) // 지금까지 실행한 것들 (0번이 start_debug 결과)
    const [execPoint, setExecPoint] = useState(-1) // execRecord에서 현재 실행중인 곳을 가리킴
    const [execLine, setExecLine] = useState(0)

    const uploadFileToServer = async () => {
        // .c 파일 생성
        const blob = new Blob([editorValue], { type: 'text/plain' })
        const file = new File([blob], 'code.c', { type: 'text/plain' })

        // FormData 객체에 파일 추가
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch(`${debuggerServer}/upload`, {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                const result = await response.json()
                console.log('File uploaded successfully', result)
                setServerResponse(result.executable)
                startDebug(result.executable)

                setIsLoading(true) // 로딩 상태 시작
            } else {
                console.error('File upload failed', response.statusText)
                setServerResponse({ error: response.statusText })
            }
        } catch (error) {
            console.error('Error uploading file', error)
            setServerResponse({ error: error.message })
        }
    }

    const startDebug = async (executable) => {
        try {
            const response = await fetch(`${debuggerServer}/start_debug`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ executable: executable })
            })

            if (response.ok) {
                const result = await response.json()
                console.log('Debug started successfully', result)

                setExecRecord([result])
                setExecPoint(0)
                setExecLine(+result.line)

                setGlobalVariables(result.globals)
                setSessionId(+result.session_id)

                setServerResponse(result)

                setIsLoading(false) // 로딩 상태 종료
                setDebugStart(true)
            } else {
                console.error('Debug start failed', response.statusText)
                setServerResponse({ error1: response.statusText })
                setIsLoading(false) // 로딩 상태 종료
            }
        } catch (error) {
            console.error('Error debug start', error)
            setServerResponse({ error2: error.message })
            setIsLoading(false) // 로딩 상태 종료
        }
    }

    const debugNextLine = async () => {
        try {
            const globalNames = globalVariables ? globalVariables.map((e) => e.name) : []

            const response = await fetch(`${debuggerServer}/debug`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ session_id: sessionId, command: 'next', global_names: globalNames })
            })

            if (response.ok) {
                const result = await response.json()
                console.log('Debug next line successfully', result)
                if (result.status === 'running') setExecRecord((prevExecRecord) => [...prevExecRecord, result])
                return result // Return the result to use it in nextExecPoint
            } else {
                console.error('Debug next line failed', response.statusText)
                setServerResponse({ error1: response.statusText })
            }
        } catch (error) {
            console.error('Error debug next line', error)
            setServerResponse({ error2: error.message })
        }
    }

    const updateGlobalVariables = (variables) => {
        const updatedGlobals = globalVariables.map((e, idx) => ({
            ...e,
            value: variables[idx].value
        }))
        setGlobalVariables(updatedGlobals)
    }

    const nextExecPoint = async () => {
        if (execPoint === execRecord.length - 1) {
            if (debugEnd) {
                return
            }
            const result = await debugNextLine()
            if (!result) {
                return
            }
            if (result.status !== 'running') {
                setDebugEnd(true)
                return
            }
            setExecPoint((prevExecPoint) => prevExecPoint + 1)
            setExecLine(+result.line)
            setServerResponse(result)
            updateGlobalVariables(result.globals)
        } else {
            setExecPoint((prevExecPoint) => {
                const newExecPoint = prevExecPoint + 1
                setExecLine(+execRecord[newExecPoint].line)
                setServerResponse(execRecord[newExecPoint])
                return newExecPoint
            })
        }
    }

    const prevExecPoint = () => {
        setExecPoint((prevExecPoint) => {
            const newExecPoint = Math.max(prevExecPoint - 1, 0)
            setExecLine(+execRecord[newExecPoint].line)
            setServerResponse(execRecord[newExecPoint])
            return newExecPoint
        })
    }

    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['header']}>
                    <h4 className={styles['title']}>Animation Debugger</h4>
                    <button className={styles['close-button']} onClick={onClose}>
                        X
                    </button>
                </div>
                <div className={styles['body']}>
                    <CodeContainer
                        editorValue={editorValue}
                        nextExecPoint={nextExecPoint}
                        prevExecPoint={prevExecPoint}
                        execLine={execLine}
                    />
                    <AnimationContainer
                        execPoint={execPoint}
                        execRecord={execRecord}
                        globalVariables={globalVariables}
                        debugStart={debugStart}
                        isLoading={isLoading}
                    />
                    {!debugStart && (
                        <div className={styles['temp']}>
                            {!debugStart && (
                                <button className={styles['send-button']} onClick={uploadFileToServer}>
                                    DEBUG START
                                </button>
                            )}
                            {!isLoading && serverResponse && (
                                <div className={styles['response']}>
                                    <h5>Server Response:</h5>
                                    <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ModalContainer
