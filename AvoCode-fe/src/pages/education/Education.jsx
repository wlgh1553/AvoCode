import styles from '@/assets/css/education/education.module.css'

import ModalContainer from '@/components/education/animation/ModalContainer'
import EditorContainer from '@/components/education/editor/EditorContainer'
import GptContainer from '@/components/education/gpt/GptContainer'
import MaterialContainer from '@/components/education/material/MaterialContainer'
import EducationTopMenu from '@/components/education/menu/EducationTopMenu'
import EducationBottomMenu from '@/components/education/menu/EducationBottomMenu'

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function Education() {
    const { problem_id } = useParams()
    const defaultCode = `#include <stdio.h>
int main()
{
    return 0;
}
`
    const [isModalVisible, setModalVisible] = useState(false)
    const [editorValue, setEditorValue] = useState(defaultCode)

    const handleDebugClick = (value) => {
        setEditorValue(value)
        setModalVisible(true)
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <div className={styles['container']}>
            <EducationTopMenu />
            <div className={`inner-container ${styles['container-items']}`}>
                <MaterialContainer setEditorValue={setEditorValue} problemId={problem_id} />
                <EditorContainer
                    onDebugClick={handleDebugClick}
                    problemId={problem_id}
                    editorValue={editorValue}
                    setEditorValue={setEditorValue}
                    defaultCode={defaultCode}
                />
                <GptContainer />
                <ModalContainer isVisible={isModalVisible} onClose={handleCloseModal} editorValue={editorValue} />
            </div>
            <EducationBottomMenu />
        </div>
    )
}

export default Education
