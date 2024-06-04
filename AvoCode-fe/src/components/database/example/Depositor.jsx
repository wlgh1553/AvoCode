import styles from '@/assets/css/database/example/example.module.css'

function DepositorTable() {
    return (
        <div className={styles['container']}>
            <table>
                <caption>depositor</caption>
                <thead>
                    <tr>
                        <th>customer_name</th>
                        <th>account_number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Hayes</td>
                        <td>A-102</td>
                    </tr>
                    <tr>
                        <td>Johnson</td>
                        <td>A-101</td>
                    </tr>
                    <tr>
                        <td>Johnson</td>
                        <td>A-201</td>
                    </tr>
                    <tr>
                        <td>Jones</td>
                        <td>A-217</td>
                    </tr>
                    <tr>
                        <td>Lindsay</td>
                        <td>A-222</td>
                    </tr>
                    <tr>
                        <td>Smith</td>
                        <td>A-215</td>
                    </tr>
                    <tr>
                        <td>Turner</td>
                        <td>A-305</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DepositorTable
