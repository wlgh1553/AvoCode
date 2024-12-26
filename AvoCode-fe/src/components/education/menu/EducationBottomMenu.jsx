import styles from '@/assets/css/education/education.menu.module.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

function EducationTopMenu() {
    const navigate = useNavigate()
    return (
        <div className={`${styles["menu-container"]} ${styles["top-menu-container"]}`}>
            <div className={`inner-container ${styles["bottom-menu-inner"]}`}>
                
            </div>
        </div>
    )
}
// 로그인되어있을때랑... 안되어있을때... 예외처리 해주어야함.
export default EducationTopMenu
