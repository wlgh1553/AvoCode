import React, { useState } from 'react'
import styles from '@/assets/css/education/education.module.css'
import Editor from '@monaco-editor/react'
import WebTerminal from '@/components/terminal/Terminal.jsx'
import requestApi from '@/plugins/api-setting.js'

function EditorContainer({ onDebugClick, editorValue, setEditorValue, defaultCode }) {
    //TODO
    const token = "";
    const problemId = 5;

    const [terminalValue, setTerminalValue] = useState('');

    const resetCode = () => {
        setEditorValue(defaultCode);
    }

    const handleEditorChange = (value) => {
        setEditorValue(value)
    }

    const handleRunClick = async () => {
        setTerminalValue('loading...');

        const url = '/submission/sample';
        const data = {
            problem_id: problemId,
            code: encodeURIComponent(editorValue),
            language: 75
        };

        try {
            const response = await requestApi.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("response", response.data);

            let responseValue = `[${response.data.data.description}]\n`;

            if (response.data.data.stdin) {
                responseValue += `input : ${response.data.data.stdin}\n`;
            } else {
                responseValue += `no input\n`;
            }

            if (response.data.data.stdout) {
                responseValue += `output : ${response.data.data.stdout}\n`;
            } else {
                responseValue += `no output\n`;
            }

            if (response.data.compile_output) {
                const decodedOutput = decodeURIComponent(escape(atob(response.data.compile_output)));
                console.log('Decoded Output:', decodedOutput);
                responseValue += `${decodedOutput}\n`;
            } else {
                responseValue += 'No compile output.\n';
            }

            console.log(responseValue);
            setTerminalValue(responseValue);
        } catch (error) {
            console.error('Error:', error);
            setTerminalValue('Error during compilation.');
        }
    }

    const handleSubmitClick = async () => {
        setTerminalValue('loading...');

        const url = '/submission';
        const data = {
            problem_id: problemId,
            code: encodeURIComponent(editorValue),
            language: 75
        };

        try {
            const response = await requestApi.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("response", response.data);

            let responseValue = `[${response.data.data.description}]\n`;

            if (response.data.data.score) {
                responseValue += `score : ${response.data.data.score}\n`;
            } else {
                responseValue += `score : 0\n`;
            }

            if (response.data.compile_output) {
                const decodedOutput = decodeURIComponent(escape(atob(response.data.compile_output)));
                console.log('Decoded Output:', decodedOutput);
                responseValue += `${decodedOutput}\n`;
            } else {
                responseValue += 'No compile output.\n';
            }

            console.log(responseValue);
            setTerminalValue(responseValue);
        } catch (error) {
            console.error('Error:', error);
            setTerminalValue('Error during compilation.');
        }
    }

    return (
        <div className={`${styles['container-item']} ${styles['editor-container']}`}>
            <div className={styles['editor-box']}>
                <ul className={styles['editor-oper']}>
                    <li className={styles['editor-language-list']}>
                        <div className={styles['editor-language']}>C</div>
                    </li>
                    <li className={styles['editor-btn-list']}>
                        <button
                            type="button"
                            id="btn-init"
                            class="btn btn-primary"
                            onClick={resetCode}
                        >
                            초기화
                        </button>
                        {/* <button type="button" id="btn-save" class="btn btn-primary">
                            저장
                        </button> */}
                        {/*저장 기능은 아직 백엔드에 만들어 지지 않았습니다..*/}
                        <button type="button" id="btn-run" class="btn btn-primary" onClick={handleRunClick}>
                            실행
                        </button>
                        <button type="button" id="btn-submit" class="btn btn-success" onClick={handleSubmitClick}>
                            제출
                        </button>
                        <button
                            type="button"
                            id="btn-debug"
                            class="btn btn-success"
                            onClick={() => onDebugClick(editorValue)}
                        >
                            디버그
                        </button>
                    </li>
                </ul>
                <div className={styles['editor-wrap']}>
                    <Editor
                        width="100%"
                        height="100%"
                        options={{
                            fontSize: '16',
                            minimap: { enabled: false }
                        }}
                        theme="vs-dark"
                        defaultLanguage="c"
                        value={editorValue}
                        onChange={handleEditorChange}
                    />
                </div>
            </div>
            <div className={styles['terminal-box']}>
                <ul className={styles['terminal-oper']}>
                    <li className={styles['terminal-oper-item']}>
                        <a href="#">실행결과</a>
                    </li>
                </ul>
                <div className={styles['terminal-wrap']}>
                    <WebTerminal terminalValue={terminalValue}/>
                </div>
            </div>
        </div>
    )
}
export default EditorContainer
