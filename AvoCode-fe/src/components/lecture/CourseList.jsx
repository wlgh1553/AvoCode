import React, { useState } from 'react';
import styles from '@/assets/css/lecture/lecture.module.css'

function CourseList() {
    const CourseData = [
        { c_id: 100011, c_type: "docs", c_title: "변수란?", c_link: "#", tc_data: "23.03.24", tc_state: true},
        { c_id: 100012, c_type: "docs", c_title: "자료형이란?", c_link: "#", tc_data: "23.03.24", tc_state: true},
        { c_id: 100013, c_type: "code", c_title: "정수형 변수 출력", c_link: "#", tc_data: "23.03.24", tc_state: true},
        { c_id: 100014, c_type: "code", c_title: "실수형 변수 출력", c_link: "#", tc_data: "23.03.24", tc_state: false},
        { c_id: 100015, c_type: "code", c_title: "입력 받기", c_link: "#", tc_data: "23.03.24", tc_state: false},
        { c_id: 100016, c_type: "docs", c_title: "상수", c_link: "#", tc_data: "23.03.24", tc_state: false},
        { c_id: 100017, c_type: "docs", c_title: "요약 & 정리", c_link: "#", tc_data: "23.03.24", tc_state: false},
    ]

    const ChapterData = [
        { ch_id: 100001, ch_num: 1, ch_title: "1강 시작하기", ch_course: CourseData, c_amount: 7, c_complete: 3}, 
        { ch_id: 100002, ch_num: 1, ch_title: "2강 Hello World!", ch_course: CourseData, c_amount: 7, c_complete: 3}, 
        { ch_id: 100003, ch_num: 1, ch_title: "3강 간단한 데이터 다루기", ch_course: CourseData, c_amount: 7, c_complete: 3}, 
        { ch_id: 100004, ch_num: 1, ch_title: "4강 연산자와 수식", ch_course: CourseData, c_amount: 7, c_complete: 3}, 
        { ch_id: 100005, ch_num: 1, ch_title: "5강 반복문", ch_course: CourseData, c_amount: 7, c_complete: 3}, 
        { ch_id: 100006, ch_num: 1, ch_title: "6강 배열", ch_course: CourseData, c_amount: 7, c_complete: 3}, 
    ];
      
    let [listActive, setListActive] = useState({});

    const toggleActive = (idx) => {
      setListActive((prev) => {
        return !prev[idx];
      });
    };

    return (
        <div className={`${styles['container-item']} ${styles['gpt-container']}` + " " + (btnActive ? styles.active : "")}>
            <ul className={styles["chapter-list"]}>
                {   
                ChapterData.map((chapter, idx) => (
                    <>
                    <li className={styles["chapter-item"]} data-ch-id={chapter.ch_id}>
                        <div className={`${styles["chapter-data"]} ${styles["chapter-num"]}`}></div>
                        <div className={`${styles["chapter-data"]} ${styles["chapter-title"]}`}></div>
                        <div className={`${styles["chapter-data"]} ${styles["chapter-complete"]}`}></div>
                        <div className={`${styles["chapter-data"]} ${styles["chapter-amount"]}`}></div>
                    </li>
                    {chapter.ch_course === NULL && (
                    <ul className={styles["course-list"]}>
                        {chapter.ch_course.map((course, idx) => (
                            <li className={styles["course-item"]}>
                                <a href={course.c_link}>
                                    <div className={styles["course-item-info"]}>
                                        <em></em>
                                        <p></p>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                    )}
                    </> 
                ))
                }
            </ul>
        </div>
    )
}
export default CourseList
