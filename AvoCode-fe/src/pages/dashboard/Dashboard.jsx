import styles from '@/assets/css/dashboard/dashboard.module.css';
import React, { useEffect, useRef, useState } from 'react';

import requestApi from '@/plugins/api-setting';
import { Line } from 'progressbar.js';

import c_book from '@/assets/images/dashboard/C-book.png';
import algebraBook from '@/assets/images/dashboard/algebra-book.png';
import algo from '@/assets/images/dashboard/algo-book.png';
import goc_book from '@/assets/images/dashboard/goC-book.png';
import mypage from '@/assets/images/dashboard/mypage-img.png';
import profile from '@/assets/images/dashboard/profile-img.png';
import zagoo from '@/assets/images/dashboard/zagoo-book.png';
import { useNavigate } from 'react-router-dom';



export default function Dashboard() {
    const navigate = useNavigate();

    const [userLevel, setUserLevel] = useState(1);
    const [levelProgress, setLevelProgress] = useState(0);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    const [modal, setModal] = useState(false);

    const showModal = () => {
        setModal(true);
    };

    const hideModal = () => {
        setModal(false);
    };

    const gotoEducation = () => {
        navigate('/education');
    }

    const progressBarRef = useRef(null); // DOM 요소 참조를 위한 Ref 생성

    useEffect(() => {
        // progressBarRef.current가 실제 DOM 요소를 가리키는 경우에만 프로그래스 바 인스턴스 생성
        if (progressBarRef.current) {
            // 프로그래스 바 인스턴스 생성
            const bar = new Line(progressBarRef.current, {
                strokeWidth: 8,
                color: '#FFC81E',
                trailColor: '#f3f3f3',
                svgStyle: { width: '450px', height: '100%' }
            });

            // 프로그래스 업데이트
            bar.animate(levelProgress / 100); // 0.0에서 1.0 사이의 값으로, 여기서는 백분율을 0에서 1 사이의 값으로 변환

            // 컴포넌트가 언마운트될 때 인스턴스 제거
            return () => {
                bar.destroy();
            };
        }
    }, [levelProgress]); // levelProgress가 변경될 때마다 useEffect가 실행되도록 의존성 배열에 추가

    useEffect(() => {
        requestApi.get('/user')
            .then((response) => {
                const data = response.data.data;
                const experience = data.experience;

                setUserLevel(Math.floor(experience / 100));
                setLevelProgress(experience % 100);

                setUserName(data.name);
                setUserId(data.id);

                console.log(userLevel, levelProgress);
            })
            .catch((e) => {
                navigate('/login');
            });
    }, []);

    return (
        <div className={`${styles.body_color}`}>
            <div className={`${styles.container}`}>
                <div className={`${styles.content}`}>
                    <div className={`${styles.content_wrapper}`}>
                        <div className={`${styles.text}`}>
                            <h1>Dashboard</h1>
                        </div>
                        <div className={`${styles.container2}`}>
                            <div className={`${styles.container3}`}>
                                <div className={`${styles.profile_box}`}>
                                    <div className={`${styles.profile_img}`}>
                                        <img className={`${styles.profile}`} src={profile} alt="profile" />
                                    </div>
                                    <div className={`${styles.nameblock}`}>
                                        <p className={`${styles.name_text}`}>Name</p>
                                        <p className={`${styles.name}`}>{userName}</p>
                                        <div className={`${styles.username_block}`}>
                                            <p className={`${styles.username_text}`}>Username</p>
                                            <p className={`${styles.username}`}>{userId}</p>
                                        </div>
                                    </div>
                                    <button onClick={showModal} className={`${styles.edit_profile}`}>Edit Profile</button>
                                    {modal && (
                                        <div className={`${styles.modal_container}`}>
                                            <div className={`${styles.modal_content}`}>
                                                <div className={`${styles.modal_header}`}>
                                                    <p>Edit Profile</p>
                                                    <button onClick={hideModal} className={`${styles.closebtn}`}>✖</button>
                                                </div>
                                                <div className={`${styles.modalinputWrap}`}>
                                                    <div className={`${styles.inputname}`}>
                                                        <p>NAME</p>
                                                        <input className={`${styles.input_name}`} placeholder="NAME" />
                                                    </div>
                                                    <div className={`${styles.inputusername}`}>
                                                        <p>USERNAME</p>
                                                        <input className={`${styles.input_name}`} placeholder="USERNAME" />
                                                    </div>
                                                </div>
                                                <div className={`${styles.profileWrap}`}>
                                                    <p>PROFILE IMAGE</p>
                                                    <div className={`${styles.profile_content}`}>
                                                        <div className={`${styles.profileimg}`}>
                                                            <img className={`${styles.profile}`} src={mypage} />
                                                        </div>
                                                        <button className={`${styles.chooseimgbtn}`}>Choose photo</button>
                                                    </div>
                                                </div>
                                                <div className={`${styles.save}`}>
                                                    <button className={`${styles.savebtn}`}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <button className={`${styles.see_profile}`}>See Profile</button>
                                </div>
                                <div className={`${styles.level_box}`}>
                                    <div className={`${styles.level}`}>
                                        <div className={`${styles.level_text}`}>
                                            <div className={`${styles.circle}`}><h2>{userLevel}</h2></div>
                                            <h2>Level {userLevel}</h2>
                                        </div>
                                        <div className={`${styles.level_bar}`}>
                                            <p>다음 레벨까지 {100 - levelProgress} POINT 남았습니다.</p>
                                            <div ref={progressBarRef}></div>{/* 프로그래스 바를 렌더링할 DOM 요소 */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.book_box}`}>
                                <div className={`${styles.study}`}>
                                    <div className={`${styles.cp}`} onClick={gotoEducation}>
                                        <img className={`${styles.cpbook}`} src={c_book} />
                                        <div className={`${styles.cpb}`}>
                                            <button className={`${styles.cpbtn}`}>C언어</button>
                                        </div>
                                    </div>
                                    <div className={`${styles.cp}`} onClick={gotoEducation}>
                                        <img className={`${styles.goCbook}`} src={goc_book} />
                                        <div className={`${styles.cpb}`}>
                                            <button className={`${styles.cpbtn}`}>고C</button>
                                        </div>
                                    </div>
                                    <div className={`${styles.cp}`} onClick={gotoEducation}>
                                        <img className={`${styles.zagoo}`} src={zagoo} />
                                        <div className={`${styles.cpb}`}>
                                            <button className={`${styles.cpbtn}`}>자료구조</button>
                                        </div>
                                    </div>
                                    <div className={`${styles.cp}`} onClick={gotoEducation}>
                                        <img className={`${styles.algobook}`} src={algo} />
                                        <div className={`${styles.cpb}`}>
                                            <button className={`${styles.cpbtn}`}>알고리즘</button>
                                        </div>
                                    </div>
                                    <div className={`${styles.cp}`} onClick={gotoEducation}>
                                        <img className={`${styles.algebrabook}`} src={algebraBook} />
                                        <div className={`${styles.cpb}`}>
                                            <button className={`${styles.cpbtn}`}>Algebra</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className={`${styles.board2}`}></footer>
            </div>
        </div>
    );
}