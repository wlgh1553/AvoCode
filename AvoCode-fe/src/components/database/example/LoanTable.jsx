import styles from '@/assets/css/database/example/example.module.css'


function LoanTable({ scale }) {
    return (
        <div className={styles['container']}>
            <table>
                <caption>loan</caption>
                <thead>
                    <tr>
                        <th>loan_number</th>
                        <th>branch_name</th>
                        <th>amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>L-11</td>
                        <td>Round Hill</td>
                        <td>900</td>
                    </tr>
                    <tr>
                        <td>L-14</td>
                        <td>Downtown</td>
                        <td>1500</td>
                    </tr>
                    <tr>
                        <td>L-15</td>
                        <td>Perryridge</td>
                        <td>1500</td>
                    </tr>
                    <tr>
                        <td>L-16</td>
                        <td>Perryridge</td>
                        <td>1300</td>
                    </tr>
                    <tr>
                        <td>L-17</td>
                        <td>Downtown</td>
                        <td>1000</td>
                    </tr>
                    <tr>
                        <td>L-23</td>
                        <td>Redwood</td>
                        <td>2000</td>
                    </tr>
                    <tr>
                        <td>L-93</td>
                        <td>Manius</td>
                        <td>500</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LoanTable
