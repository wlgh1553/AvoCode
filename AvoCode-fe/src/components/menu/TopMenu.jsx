import styles from '@/assets/css/menubar/menubar.module.css';

import logo from '@/assets/images/dashboard/avocode-logo.png';
import mypage from '@/assets/images/dashboard/mypage-img.png';
import { useState, useEffect } from 'react';

import requestApi from '@/plugins/api-setting';
import { useNavigate } from 'react-router-dom';

function TopMenu() {
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        requestApi.get('auth/profile')
            .then((data) => {
                setLoggedIn(true);
            }).catch((error) => {
        });
    }, []);

    useEffect(() => {
        // 추가적인 isLoggedIn 상태 변화에 따른 로직을 추가할 수 있습니다.
    }, [isLoggedIn]);

    const logout = () => {
        document.cookie = 'token=a';
        setLoggedIn(false);
        navigate('/');
    };

    return (
        <div className={`${styles['nav']}`}>
            <div className={`${styles['nav-wrapper']}`}>
                <div className={`${styles['logo-container']}`}>
                    <img src={logo} alt="logo" />
                </div>

                {
                    !isLoggedIn ?
                        <></>
                        :
                        <>
                            <div className={`${styles['mypage-img']}`}>
                                <img className={`${styles['mypage']}`} src={mypage} alt="mypage" onClick={logout} />
                            </div>
                        </>
                }
            </div>
        </div>
    );
}

export default TopMenu;
