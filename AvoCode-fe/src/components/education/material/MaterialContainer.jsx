import React, { useState, useEffect } from 'react';
import requestApi from '@/plugins/api-setting.js';
import styles from '@/assets/css/education/education.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function MaterialContainer({ setEditorValue, problemId }) {
    //TODO : 나중에 받아와서 사용하기!!
    // const problemId = 13;

    const [TabActive, setTabActive] = useState(0);
    const [material, setMaterial] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CourseToggleComment = id => {
        setTabActive(id);
        if (id === 1) {
            fetchSubmissions();
        }
    };

    useEffect(() => {
        requestApi.get(`/problem/${problemId}`)
            .then(response => {
                setMaterial(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    const fetchSubmissions = async () => {
        setLoading(true);
        setError(null);

        requestApi.get(`/submission/${problemId}`)
            .then(response => {
                setSubmissions(response.data.data);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchSubmissionCode = async (submissionId) => {
        requestApi.get(`/submission/code/${submissionId}`)
            .then(response => {
                const code = response.data.data.code;
                try {
                    const decodedCode = decodeURIComponent(code);
                    setEditorValue(decodedCode);
                } catch (e) {
                    console.error("Failed to decode code. Using raw code.", e);
                    setEditorValue(code);
                }
            })
            .catch(err => {
                setError(err);
            })
    };
    const formatContent = (content) => {
        const blocks = content.split('```');
        return blocks.map((block, index) => {
            if (index % 2 === 1) {  // 코드 블록
                const lines = block.split('\n');
                const language = lines[0] || 'text';
                const code = lines.slice(1).join('\n');

                return (
                    <SyntaxHighlighter
                        key={index}
                        language={language}
                        style={materialDark}
                        className={styles['code-block']}
                    >
                        {code}
                    </SyntaxHighlighter>
                );
            } else {  // 일반 텍스트
                return (
                    <span key={index} style={{ whiteSpace: 'pre-line' }}>
                    {block}
                </span>
                );
            }
        });
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={`${styles['container-item']} ${styles['education-container']}`}>
            <div className={styles['materials-tab-cont']}>
                <ul className={styles['materials-tab']}>
                    <li onClick={() => CourseToggleComment(0)} className={TabActive === 0 ? styles["active"] : ""}>학습하기</li>
                    <li onClick={() => CourseToggleComment(1)} className={TabActive === 1 ? styles["active"] : ""}>제출내역</li>
                </ul>
            </div>
            <div className={`${styles['materials-box']}`}>
                <div className={`${styles['submission-record-box']} ${TabActive === 1 ? styles["active"] : ""}`}>
                    <table>
                        <thead>
                        <tr>
                            <th>제출 일시</th>
                            <th>제출 언어</th>
                            <th>채점 내역</th>
                        </tr>
                        </thead>
                        <tbody>
                        {submissions.map((d, idx) => (
                            <tr key={idx} onClick={() => {
                                const result = window.confirm(d.created_at  + " id " + d.id + " 코드를 불러오겠습니까?");
                                if(result){
                                    fetchSubmissionCode(d.id);
                                }
                            }}>
                                <td>{d.created_at}</td>
                                <td>{d.language}</td>
                                <td>{d.result}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {
                !TabActive && <div className={`${styles['materials-explain-box']}`}>
                    <p className={styles['materials-title']}>{material.title}</p>
                    <div className={styles['materials-explain']}>
                        <div>{formatContent(material.description)}</div>
                        {material.testcases.map((testcase, index) => (
                            <div key={index}>
                                <br />
                                <p>{`TestCase : ${index + 1}`}</p>
                                <p style={{ whiteSpace: 'pre-line' }}>{`Input:\n${testcase.input}`}</p>
                                <p style={{ whiteSpace: 'pre-line' }}>{`Output:\n${testcase.output}`}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default MaterialContainer;
