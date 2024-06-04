import styles from '@/assets/css/menubar/menubar.module.css'

import logo from '@/assets/images/dashboard/avocode-logo.png'
import mypage from '@/assets/images/dashboard/mypage-img.png'

import logoText from '@/assets/images/logo/text-logo.png'

import userLogo from '@/assets/images/menubar/user-logo.svg'
import { useNavigate } from 'react-router-dom'

function TopMenu() {
    const navigate = useNavigate()
    return (
        <div className={`${styles.nav}`}>
            <div className={`${styles.nav_wrapper}`}>
                <div className={`${styles.logo_img}`}>
                    <img className={`${styles.logo}`} src={logo} alt="logo" />
                </div>
                <div className={`${styles.mypage_img}`}>
                    <img className={`${styles.mypage}`} src={mypage} alt="mypage" />
                </div>
            </div>
        </div>
    )
}
// 로그인되어있을때랑... 안되어있을때... 예외처리 해주어야함.
export default TopMenu
