import styles from '@/assets/css/login/login.module.css'

import apple from '@/assets/images/login/apple.svg'
import facebook from '@/assets/images/login/facebook.svg'
import google from '@/assets/images/login/google.svg'
import requestApi from '@/plugins/api-setting'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    let tryLogin = () => {
        const user_id = document.getElementsByName('id')[0].value;
        const password = document.getElementsByName('password')[0].value;

        requestApi.post('auth/login', {
            id: user_id,
            password: password
        }).then((response) => {
            let data = response.data.data;

            document.cookie = `token=${data.access_token}`;
            navigate('/dashboard');
        }, (e) => { alert(e.response.data.message); navigate('/login'); });
    };

    useEffect(() => {
        requestApi.get('auth/profile')
            .then((dataE) => {
                if (data.ok)
                    navigate('/dashboard');
                else
                throw new Error("ASDF")
            }, (e) => { }).catch((e) => { });
    }, []);

    return (
        <div className={styles['container']}>
            <div className={`${styles['container-item']} ${styles['left-container']}`}></div>
            <div className={`${styles['container-item']} ${styles['right-container']}`}>
                <div className={styles['login-box']}>
                    <p className={styles['login-box-title']}>Sign in</p>
                    <div className={styles['input-box']}>
                        <input name="id" type="text" placeholder="Enter email or user name" />
                        <input name="password" type="password" placeholder="Password " />
                    </div>
                    <p className={styles['forgot-password']}>Forgot password?</p>
                    <button className={styles['login-button']} onClick={tryLogin}>Login</button>
                    <p className={styles['sign-up-message']} onClick={() => navigate('/signup')}>
                        sign up
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

export default Login
