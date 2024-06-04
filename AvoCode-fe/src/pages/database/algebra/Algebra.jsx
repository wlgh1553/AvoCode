import styles from '@/assets/css/database/algebra.module.css'
import AlgebraEditor from '@/components/database/AlgebraEditor.jsx'

import TableContainer from '@/components/database/view/TableContainer.jsx'
import ResultContainer from '@/components/database/view/ResultContainer.jsx'
import { useState } from 'react'

function Algebra() {
    const [result, setResult] = useState([])

    return (
        <div className={styles['container']}>
            <div className={styles['flex-container']}>
                <div className={`${styles['container-item']} ${styles['editor-container']}`}>
                    <p className={styles['editor-container-title']}>Relation Algebra</p>
                    <AlgebraEditor result={result} setResult={setResult} />
                </div>
                <div className={`${styles['container-item']} ${styles['view-container']}`}>
                    <TableContainer />
                    <ResultContainer result={result} />
                </div>
            </div>
        </div>
    )
}

export default Algebra
