import styles from '@/assets/css/database/algebra.module.css'

import plus from '@/assets/images/database/icon/add-circle-line.svg'
import minus from '@/assets/images/database/icon/subtract-line.svg'
import LoanTable from '@/components/database/example/LoanTable.jsx'
import { useState } from 'react'
import BorrowerTable from '@/components/database/example/BorrowerTable.jsx'
import DepositorTable from '@/components/database/example/Depositor.jsx'

function TableContainer() {
    const [scale, setScale] = useState(1) // 확대/축소 비율을 위한 상태

    const handleZoomIn = () => {
        setScale((prevScale) => prevScale + 0.1) // 10%씩 확대
    }

    const handleZoomOut = () => {
        setScale((prevScale) => prevScale - 0.1) // 10%씩 축소
    }

    return (
        <div className={styles['table-container']}>
            <div className={styles['table-menu-box']}>
                <img
                    src={plus}
                    alt="plus"
                    onClick={() => {
                        handleZoomIn()
                    }}
                />
                <img
                    src={minus}
                    alt="minus"
                    onClick={() => {
                        handleZoomOut()
                    }}
                />
            </div>
            <div className={styles['table-view-container']}>
                <div
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        display: 'inline-block'
                    }}
                >
                    <LoanTable />
                    <BorrowerTable />
                    <DepositorTable />
                </div>
            </div>
        </div>
    )
}

export default TableContainer
