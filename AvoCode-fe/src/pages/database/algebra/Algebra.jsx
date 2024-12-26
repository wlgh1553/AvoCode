import styles from '@/assets/css/database/algebra.module.css'
import AlgebraEditor from '@/components/database/AlgebraEditor.jsx'

import TableContainer from '@/components/database/view/TableContainer.jsx'
import ResultContainer from '@/components/database/view/ResultContainer.jsx'
import { useState } from 'react'
import LoanTable from '@/components/database/example/LoanTable.jsx'
import BorrowerTable from '@/components/database/example/BorrowerTable.jsx'
import DepositorTable from '@/components/database/example/Depositor.jsx'

function Algebra() {
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)

    return (
        <div className={styles['container']}>
            <div className={styles['flex-container']}>
                <div className={`${styles['container-item']} ${styles['editor-container']}`}>
                    <div className={styles['editor-container-center']}>
                        <p className={styles['editor-container-title']}>Relation Algebra</p>
                        <p className={styles['editor-container-explain']}>Enter the Algebra :</p>
                        <AlgebraEditor result={result} setResult={setResult} setLoading={setLoading} />

                        <p className={styles['editor-container-explain']}>Result :</p>
                        <ResultContainer result={result} loading={loading} />
                    </div>
                </div>
                <div className={`${styles['container-item']} ${styles['side-container']}`}>
                    <div className={styles['side-container-center']}>
                        <p>Database</p>
                        <LoanTable />
                        <BorrowerTable />
                        <DepositorTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Algebra
