import React, { useState } from 'react';

import styles from '@/assets/css/education/education.module.css'

function GptContainer() {
    
    let [btnActive, setBtnActive] = useState(false);

    const toggleActive = (e) => {
      setBtnActive((prev) => {
        return !prev;
      });
    };

    return (
        <div className={`${styles['container-item']} ${styles['gpt-container']}` + " " + (btnActive ? styles.active : "")}>
            <div className={styles['gpt-contents']}>

            </div>
            <div className={`${styles['container-item-btn']} ${styles['gpt-item-btn']}`}>
                <div className={styles['item-btn-area']} onClick={toggleActive}>
                    
                </div>
            </div>
        </div>
    )
}
export default GptContainer
