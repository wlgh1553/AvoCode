import React, { useEffect, useState } from 'react'
import styles from '@/assets/css/lecture/lecture.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import requestApi from '@/plugins/api-setting.js'
import formatLectureDate from '@/plugins/format-date.js'

function CourseList() {
    const { category } = useParams()
    const navigate = useNavigate()


    const [lectureList, setLectureList] = useState([])
    const [totalLectures, setTotalLectures] = useState(0)
    const [completedLectures, setCompletedLectures] = useState(0)
    const [chapterCompletion, setChapterCompletion] = useState([])

    const getCourseList = (category) => {
        requestApi.get('/chapter', {
            params: { id: category }
        }).then(res => {
            console.log(res)
            const chapters = res.data.data.chapters
            let totalLecturesCount = 0
            let completedLecturesCount = 0
            let chapterCompletionData = []

            // 전체 갯수와 들은 갯수 확인
            chapters.forEach(chapter => {
                let chapterTotalLectures = chapter.lecture_list.length
                let chapterCompletedLectures = chapter.lecture_list.filter(lecture => lecture.lecture_completed_state).length

                totalLecturesCount += chapterTotalLectures
                completedLecturesCount += chapterCompletedLectures

                chapterCompletionData.push({
                    chapter_id: chapter.chapter_id,
                    chapterTotalLectures: chapterTotalLectures,
                    chapterCompletedLectures: chapterCompletedLectures
                })
            })

            setTotalLectures(totalLecturesCount)
            setCompletedLectures(completedLecturesCount)
            setChapterCompletion(chapterCompletionData)
            setLectureList(chapters)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getCourseList(category)
    }, [category])

    const [courseActive, setCourseActive] = useState(false)
    const CourseToggleComment = id => {
        setCourseActive(prevShownItem => (
            prevShownItem = id
        ))
    }

    const [ListActive, setListActive] = useState({})

    const ListToggleComment = id => {
        setListActive(prevShownItem => ({
            ...prevShownItem,
            [id]: !prevShownItem[id]
        }))
    }

    return (
        <>
            <div className={styles['container']}>
                <div className={`inner-container ${styles['container-items']}`}>
                    <div className={styles['course-navigation']}>
                        <div className={styles['course-info']}>
                            <div className={styles['course-name']}>
                                C언어
                            </div>
                            <ul className={styles['course-tab']}>
                                <li className={courseActive ? '' : styles['active']}>
                                    <span onClick={() => CourseToggleComment(false)}>강좌 홈</span>
                                </li>
                                <li className={courseActive ? styles['active'] : ''}>
                                    <span onClick={() => CourseToggleComment(true)}>강좌 정보</span>
                                </li>
                            </ul>
                        </div>
                        <div className={styles['course-progress-container']}>
                            <div className={styles['course-progress-info']}>
                                <p>{totalLectures}강의 중 {completedLectures}개 강의 수강</p>
                            </div>
                            <div className={styles['course-progress-bar']}>
                                <progress className={styles['progressTag']} value={completedLectures}
                                          max={totalLectures} />
                                <span>
                                {(Number(completedLectures) / Number(totalLectures) * 100).toFixed(0)}%
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['course-list-container']} ${courseActive ? '' : styles['active']}`}>
                        <div className={styles['course-curriculum']}>
                            교육 과정
                        </div>
                        {lectureList.map((chapter, idx) => {
                            const chapterData = chapterCompletion.find(c => c.chapter_id === chapter.chapter_id)
                            return (
                                <>
                                    <ul className={styles['course-list']} key={chapter.chapter_id}>
                                        <li className={styles['course-item']}
                                            onClick={() => ListToggleComment(chapter.chapter_id)}>
                                            <div className={styles['course-name']}><p>{chapter.chapter_name}</p></div>
                                            <div
                                                className={styles['course-state']}>{chapterData ? `${chapterData.chapterCompletedLectures}/${chapterData.chapterTotalLectures}` : ''}</div>
                                            <div className={styles['course-list-state']}>
                                    <span
                                        className={`${styles['state-angle']} ${ListActive[chapter.chapter_id] ? styles['active'] : ''}`}>
                                        <FontAwesomeIcon icon={faAngleDown} size="xs" />
                                    </span>
                                            </div>
                                        </li>
                                        <ul className={`${styles['lecture-list']} ${ListActive[chapter.chapter_id] ? styles['active'] : ''}`}>
                                            {chapter.lecture_list.map((lecture) => {
                                                return (
                                                    <li className={styles['lecture-item']} key={lecture.lecture_id}>
                                                        <a href={lecture.lecture_link} onClick={() => {
                                                            lecture.lecture_type === 'CODE' ?
                                                                navigate(`/education/${lecture.lecture_id}`) : navigate(`/document/${category}/${chapter.chapter_name}/${lecture.lecture_id}`)
                                                        }}>
                                                            <div className={styles['lecture-info']}>
                                                                <div className={styles['lecture-type']}>
                                                <span className={styles['lecture-type-i']}>
                                                    {lecture.lecture_type === 'DOC' ?
                                                        <FontAwesomeIcon icon={faFileLines} /> : ''}
                                                    {lecture.lecture_type === 'CODE' ?
                                                        <FontAwesomeIcon icon={faCode} size="xs" /> : ''}
                                                </span>
                                                                </div>
                                                                <div
                                                                    className={styles['lecture-name']}>{lecture.lecture_name}</div>
                                                                <div
                                                                    className={styles['lecture-date']}>{lecture.lecture_t_date ? '수강일: ' + formatLectureDate(lecture.lecture_t_date) : ''}</div>
                                                                <div className={styles['lecture-state']}>
                                                                    <div className={styles['lecture-state-i']}>
                                                                        {
                                                                            lecture.lecture_completed_state === true ?
                                                                                <FontAwesomeIcon icon={faCircleCheck}
                                                                                                 size="1.5x" /> :
                                                                                lecture.lecture_t_date ?
                                                                                    <FontAwesomeIcon
                                                                                        icon={faCircleMinus}
                                                                                        size="1.5x" /> : ''
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </ul>
                                </>
                            )
                        })}
                    </div>
                    <div
                        className={`${styles['course-information-container']} ${courseActive ? styles['active'] : ''}`}>
                        <div className={styles['course-information']}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseList
