import React, { useEffect, useRef, useState } from 'react'
import styles from '@/assets/css/education/document/quiz.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import requestApi from '@/plugins/api-setting.js'

function QuizContainer({ category_id, data }) {

    const [answer, setAnswer] = useState(0);

    const navigate = useNavigate()

    const sendAnswer = () => {
        requestApi.post('/lecture', {
            "lecture_id" : data.id,
            "quiz_user_answer" : answer,
        }).then(res => {
            if (res.data.data.quiz_result === "fail"){
                alert('오답입니다. :(')
            } else {
                alert('정답입니다! :)')
                navigate(`/lecture/${category_id}`)

            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className={styles['lecture-quiz-box']}>
            <p className={styles['quiz-title']}>Q. {data.quiz_description}</p>
            <ul className={styles['quiz-data']}>
                <li>
                    <p className={styles['quiz-option-detail']} onClick={() => setAnswer(1)}>
                        <input type="radio" id={data.quiz_sel1} name="quiz" value={1} />
                        <label htmlFor={data.quiz_sel1}>
                            {data.quiz_sel1}
                        </label>
                    </p>
                    <p className={styles['quiz-option-detail']} onClick={() => setAnswer(2)}>
                        <input type="radio" id={data.quiz_sel2} name="quiz" value={2} />
                        <label htmlFor={data.quiz_sel2}>
                            {data.quiz_sel2}
                        </label>
                    </p>
                    <p className={styles['quiz-option-detail']} onClick={() => setAnswer(3)}>
                        <input type="radio" id={data.quiz_sel3} name="quiz" value={3} />
                        <label htmlFor={data.quiz_sel3}>
                            {data.quiz_sel3}
                        </label>
                    </p>
                </li>
            </ul>
            <div className={styles['quiz-button-box']}>
                <button className="btn btn-primary" onClick={sendAnswer}>제출하기</button>
            </div>
        </div>
    )
}

export default QuizContainer
