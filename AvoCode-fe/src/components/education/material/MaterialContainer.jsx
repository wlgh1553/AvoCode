import React, { useState, useEffect } from 'react';
import requestApi from '@/plugins/api-setting.js';
import styles from '@/assets/css/education/education.module.css';

function MaterialContainer(setEditorValue) {
    //TODO : 나중에 받아와서 사용하기!!
    const problemId = 5;
    const token = "";

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
        const fetchMaterial = async () => {
            const url = `/problem/${problemId}`;

            try {
                const response = await requestApi.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMaterial(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchMaterial();
    }, []);

    const fetchSubmissions = async () => {
        setLoading(true);
        setError(null);

        const url = `/submission/${problemId}`;

        try {
            const response = await requestApi.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSubmissions(response.data.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubmissionCode = async (submissionId) => {
        const url = `/submission/code/${submissionId}`;
        try {
            const response = await requestApi.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const code = response.data.data.code;
            console.log('code !!! ', code);
            const decodedCode = decodeURIComponent(escape(atob(code)));
            console.log(decoded, code);
            setEditorValue(decodedCode);
        } catch (err) {
            setError(err);
        }
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
                                    if (window.confirm(d.created_at  + " id " + d.id + " 코드를 불러오겠습니까?")) {
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
                !TabActive&& <div className={`${styles['materials-explain-box']}`}>
                <p className={styles['materials-title']}>Ch.2 연산자</p>
                <div className={styles['materials-explain']}>
                    <p>{material.description}</p>
                    {material.testcases.map((testcase, index) => (
                        <div key={index}>
                            <br />
                            <p>{`TestCase : ${index + 1}`}</p>
                            <p>Input: {testcase.input}</p>
                            <p>Output: {testcase.output}</p>
                        </div>
                    ))}
                </div>
            </div>
            }
        </div>
    );
}

export default MaterialContainer;
