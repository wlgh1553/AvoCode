import styles from '@/assets/css/education/document/document.module.css'

import EducationTopMenu from '@/components/education/menu/EducationTopMenu'
import EducationBottomMenu from '@/components/education/menu/EducationBottomMenu'
import DocumentContainer from '@/components/education/document/DocumentContainer'
import QuizContainer from '@/components/education/document/QuizContainer'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import requestApi from '@/plugins/api-setting.js'

function Document() {
    const { category_id, chapter_name, lecture_id } = useParams()

    const [data, setData] = useState({})

    const getLectureList = (lecture_id) => {
        requestApi.get(`/lecture/${lecture_id}`)
            .then(res => {
                console.log(res)

                setData({ ...res.data.data })
            }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getLectureList(lecture_id)
    }, [])


    return (
        <div className={styles['container']}>
            <EducationTopMenu />
            <div className={`inner-container ${styles['container-items']}`}>
                <div className={`${styles['container-item']}`}>
                    <DocumentContainer chapter_name={chapter_name} data={data} />
                    <QuizContainer category_id={category_id} data={data}/>
                </div>
            </div>
            <EducationBottomMenu />
        </div>
    )
}

export default Document
