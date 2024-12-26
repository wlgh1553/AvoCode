import styles from '@/assets/css/database/algebra.module.css'

import plus from '@/assets/images/database/icon/add-circle-line.svg'
import minus from '@/assets/images/database/icon/subtract-line.svg'
import LoanTable from '@/components/database/example/LoanTable.jsx'
import { useState } from 'react'
import BorrowerTable from '@/components/database/example/BorrowerTable.jsx'

function ResultContainer({ result, loading }) {
    const [scale, setScale] = useState(1) // 확대/축소 비율을 위한 상태

    const handleZoomIn = () => {
        setScale((prevScale) => prevScale + 0.1) // 10%씩 확대
    }

    const handleZoomOut = () => {
        setScale((prevScale) => prevScale - 0.1) // 10%씩 축소
    }
    const RenderTable = () => {
        if (result.length === 0) {
            return null
        }

        const headers = Object.keys(result[0])

        return (
            <table border="1">
                <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {result.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header) => (
                            <td key={header}>{row[header]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
    return (
        <div className={styles['result-container']}>
            <div className={styles['result-menu-box']}>
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
            <div className={styles['result-view-container']}>
                <div
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        display: 'inline-block'
                    }}
                >
                    {/*<LoanTable />*/}
                    {/*<BorrowerTable />*/}
                    <div>
                        {loading && <div className={styles['loader']}></div>}

                        <RenderTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultContainer
