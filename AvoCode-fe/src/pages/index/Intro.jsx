import styles from '@/assets/css/index/index.module.css'

import { useNavigate } from 'react-router-dom'

import avocado from '@/assets/images/character/intro-character.svg'
import ground from '@/assets/images/character/ground.svg'

function Intro() {
    const navigate = useNavigate()

    return (
        <>
            <div className={styles.container}>
                <div className={styles['explain-box']}>
                    <p className={styles['explain-1']}>"처음처럼, 컴퓨터 공학의 모든 것을 이해하는 첫걸음"</p>
                    <div>
                        <p className={styles['explain-2']}>
                            기초 개념부터 탄탄하게! 이해를 돕는 애니메이션을 통해 <br />
                            애매했던 개념들을 확실하게 이해하고, 코딩 실력을 키워보세요!
                        </p>
                        <p className={styles['move-main']} onClick={() => navigate('/dashboard')}>
                            시작하기 →
                        </p>
                    </div>
                </div>

                <div className={styles['intro-character-box']}>
                    <img src={avocado} alt="character" />
                </div>
            </div>
            <div className={styles['background-ground']}>
                <img src={ground} alt="ground" />
            </div>
        </>
    )
}

export default Intro
