import styles from '@/assets/css/lecture/lecture.module.css'
import { useNavigate } from 'react-router-dom'
import CourseList from '../../components/lecture/CourseList'

function Lecture() {
    const navigate = useNavigate()
    return (
        <CourseList/>
    )
}

export default Lecture
