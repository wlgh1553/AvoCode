import styles from '@/assets/css/database/example/example.module.css'

function BorrowerTable() {
    return (
        <div className={styles['container']}>
            <table>
                <caption>borrower</caption>
                <thead>
                    <tr>
                        <th>customer_name</th>
                        <th>loan_number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Adams</td>
                        <td>L-16</td>
                    </tr>
                    <tr>
                        <td>Curry</td>
                        <td>L-93</td>
                    </tr>
                    <tr>
                        <td>Hayes</td>
                        <td>L-15</td>
                    </tr>
                    <tr>
                        <td>Jackson</td>
                        <td>L-14</td>
                    </tr>
                    <tr>
                        <td>Jones</td>
                        <td>L-17</td>
                    </tr>
                    <tr>
                        <td>Smith</td>
                        <td>L-11</td>
                    </tr>
                    <tr>
                        <td>Smith</td>
                        <td>L-23</td>
                    </tr>
                    <tr>
                        <td>Williams</td>
                        <td>L-17</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BorrowerTable
