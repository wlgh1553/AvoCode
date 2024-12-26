import styles from '@/assets/css/education/education.menu.module.css'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

let cur_lecture_id = 100011
let cur_lecture_title = "변수란?"

let LectureList = [
    {lecture_id : 1000011, lecture_type: "doc", lecture_name: "변수란?", lecture_link: "#", lecture_t_date: "2024-05-17", lecture_complete_state: true},
    {lecture_id : 1000012, lecture_type: "doc", lecture_name: "자료형이란?", lecture_link: "#", lecture_t_date: "2024-05-17", lecture_complete_state: true},
    {lecture_id : 1000013, lecture_type: "code", lecture_name: "정수형 변수 출력", lecture_link: "#", lecture_t_date: "2024-05-17", lecture_complete_state: true},
    {lecture_id : 1000014, lecture_type: "code", lecture_name: "실수형 변수 출력", lecture_link: "#", lecture_t_date: "2024-05-18", lecture_complete_state: true},
    {lecture_id : 1000015, lecture_type: "code", lecture_name: "입력 받기", lecture_link: "#", lecture_t_date: "2024-05-18", lecture_complete_state: false},
    {lecture_id : 1000016, lecture_type: "doc", lecture_name: "상수", lecture_link: "#", lecture_t_date: "2024-05-19", lecture_complete_state: false},
    {lecture_id : 1000017, lecture_type: "doc", lecture_name: "요약 & 정리", lecture_link: "#", lecture_t_date: "", lecture_complete_state: false},
]
    
let CourseList = [
    {course_id: 100001, course_no: 1, course_name: "1강 시작하기에 앞서", lecture_amount:7, lecture_complete_amount: 4, lecture_list: LectureList}, 
    {course_id: 100002, course_no: 2, course_name: "2강 Hello World!", lecture_amount:7, lecture_complete_amount: 4, lecture_list: LectureList}, 
    {course_id: 100003, course_no: 3, course_name: "3강 간단한 데이터 다루기", lecture_amount:7, lecture_complete_amount: 4, lecture_list: LectureList}, 
    {course_id: 100004, course_no: 4, course_name: "4강 연산자와 수식", lecture_amount:7, lecture_complete_amount: 4, lecture_list: LectureList}, 
    {course_id: 100005, course_no: 5, course_name: "5강 반복문", lecture_amount:7, lecture_complete_amount: 4, lecture_list: LectureList},
]

function EducationTopMenu() {
    const navigate = useNavigate()

    let [UserBtnActive, setUserBtnActive] = useState(false);

    const dropDownRef = useRef();

    const UsertoggleActive = (e) => {
      setUserBtnActive((prev) => {
        return !prev;
      });
    };

    useEffect(()=> {
        const outSideClick = (e) => {
           const { target } = e;
           if (UserBtnActive && !dropDownRef.current.contains(target)) {
            setUserBtnActive(false);
           }
         };
         document.addEventListener("mousedown", outSideClick);
       }, [UserBtnActive]);

    return (
        <div className={`${styles["menu-container"]} ${styles["top-menu-container"]}`}>
            <div className={`inner-container ${styles["top-menu-inner"]}`}>
                <div className={styles["lecture-list-container"]}>
                    
                </div>
                <div className={styles["lecture-list-btn"]}>
                    <FontAwesomeIcon icon={faListUl} size="lg"/>
                </div>
                <div className={styles["lecture-title"]}>
                    <p>{cur_lecture_title}</p>
                </div>
                <div className={styles["user-info"]}>
                    <div className={styles["user-info-btn"]} onClick={()=>UsertoggleActive(true)}>
                        <FontAwesomeIcon icon={faUser} />
                        <span className="arrow-box">
                            <FontAwesomeIcon icon={faAngleDown} size="xs"/>
                        </span>
                    </div>     
                    <div ref = {dropDownRef} className={`${styles["user-info-box"]} ${UserBtnActive && styles["active"]}`}>
                        <div className={styles["user-info-title"]}>
                            <div className={styles["user-profile"]}>
                                <FontAwesomeIcon icon={faCircleUser} size="2x"/>
                            </div>
                            <div className={styles["user-account"]}>
                                <span>남희수</span>
                                <p>namisu001@naver.com</p>
                            </div>
                        </div>
                        <ul className={styles["user-info-nav"]}>
                            <li>내 강의실</li>
                            <li>내 정보 수정</li>
                            <li>로그아웃</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EducationTopMenu
