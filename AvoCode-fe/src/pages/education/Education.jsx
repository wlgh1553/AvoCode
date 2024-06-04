import styles from '@/assets/css/education/education.module.css'

import ModalContainer from '@/components/education/animation/ModalContainer'
import EditorContainer from '@/components/education/editor/EditorContainer'
import GptContainer from '@/components/education/gpt/GptContainer'
import MaterialContainer from '@/components/education/material/MaterialContainer'

import React, { useState } from 'react'

function Education() {
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
            <div className={`inner-container ${styles['container-items']}`}>
                <MaterialContainer setEditorValue={setEditorValue} />
                <EditorContainer onDebugClick={handleDebugClick} editorValue={editorValue} setEditorValue={setEditorValue} defaultCode={defaultCode}/>
                <GptContainer />
                <ModalContainer isVisible={isModalVisible} onClose={handleCloseModal} editorValue={editorValue} />
            </div>
        </div>
    )
}

export default Education
