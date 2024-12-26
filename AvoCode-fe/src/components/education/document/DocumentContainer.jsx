import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from '@/assets/css/education/document/document.module.css';

function DocumentContainer({chapter_name, data}) {
    const formatContent = (content) => {
        if (!content) return null;  // content가 undefined인 경우 처리

        const blocks = content.split('```');
        return blocks.map((block, index) => {
            if (index % 2 === 1) {  // 코드 블록
                // 첫 줄은 언어 지정으로 처리
                const lines = block.split('\n');
                const language = lines[0]?.trim() || 'text';
                const code = lines.slice(1).join('\n');

                return (
                    <SyntaxHighlighter
                        key={index}
                        language={language}
                        style={materialDark}
                        className={styles['code-block']}
                    >
                        {code.trim()}
                    </SyntaxHighlighter>
                );
            } else {  // 일반 텍스트
                return (
                    <span key={index} style={{ whiteSpace: 'pre-line' }}>
                        {block}
                    </span>
                );
            }
        });
    };

    return(
        <div className={styles['lecture-explain-box']}>
            <p className={styles['chapter-title']}>{chapter_name}</p>
            <p className={styles['lecture-title']}>{data.lecture_name}</p>
            <div className={styles['lecture-explain']}>
                <div>{formatContent(data.contents)}</div>
            </div>
        </div>
    );
}

export default DocumentContainer;