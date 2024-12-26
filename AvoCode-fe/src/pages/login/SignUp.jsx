import styles from '@/assets/css/login/login.module.css'

import apple from '@/assets/images/login/apple.svg'
import facebook from '@/assets/images/login/facebook.svg'
import google from '@/assets/images/login/google.svg'
import requestApi from '@/plugins/api-setting'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();

    const userIdChanged = () => {
        setUserId(document.getElementsByName('id')[0].value);
    };

    const userNameChanged = () => {
        setUserName(document.getElementsByName('username')[0].value);
    };

    const passwordChanged = () => {
        setPassword(document.getElementsByName('password')[0].value);
    };

    const confirmPasswordChanged = () => {
        setPasswordConfirm(document.getElementsByName('confirm password')[0].value);
    }

    const tryRegister = () => {
        if (!userId || !userName || !password || !passwordConfirm)
            return;

        if (password != passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다!');
            return;
        }

        requestApi.post('/user',
            {
                id: userId,
                name: userName,
                password: password
            }
        ).then((data) => { navigate('/login'); }).catch((e) => { alert(e.response.data.message); });
    };

    useEffect(() => {
    }, [userId, userName, password, passwordConfirm]);

    return (
        <div className={styles['container']}>
            <div className={`${styles['container-item']} ${styles['left-container']}`}></div>
            <div className={`${styles['container-item']} ${styles['right-container']}`}>
                <div className={styles['login-box']} id='login-box'>
                    <p className={styles['login-box-title']}>Sign Up</p>
                    <div className={styles['input-box']}>
                        <input name="id" type="text" placeholder="Enter id" className={(!userId && userId == '') ? `${styles['red']}` : ''} onChange={userIdChanged} />
                        <input name="username" type="text" placeholder="Enter User name" className={(!userName && userName == '') ? `${styles['red']}` : ''} onChange={userNameChanged} />
                        <input name="password" type="password" placeholder="password" className={(password && password == '') || (password && passwordConfirm && password !== passwordConfirm) ? `${styles['red']}` : ''} onChange={passwordChanged} />
                        <input name="confirm password" type="password" placeholder="Confirm Password" className={(passwordConfirm && passwordConfirm == '') || (password && passwordConfirm && password !== passwordConfirm) ? `${styles['red']}` : ''} onChange={confirmPasswordChanged} />
                    </div>
                    <button className={styles['login-button']} onClick={tryRegister}>Register</button>
                    <p className={styles['sign-up-message']} onClick={() => navigate('/login')}>
                        sign in
                    </p>
                    <p className={styles['oauth-guide']}>or continue with</p>
                    <div className={styles['oauth-box']}>
                        <img src={facebook} alt="" />
                        <img src={apple} alt="" />
                        <img src={google} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
