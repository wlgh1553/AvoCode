import { useState } from 'react'

import Dashboard from '@/pages/dashboard/Dashboard.jsx'
import Algebra_2 from '@/pages/database/algebra/Algebra_2.jsx'
import Education from '@/pages/education/Education.jsx'
import Intro from '@/pages/index/Intro.jsx'
import MainRouter from '@/pages/index/MainRouter.jsx'
import Login from '@/pages/login/Login.jsx'
import SignUp from '@/pages/login/SignUp.jsx'
import { Route, Routes } from 'react-router-dom'

function App() {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (event) => {
        setPosition({
            x: event.clientX,
            y: event.clientY
        })
    }

    return (
        <div onMouseMove={handleMouseMove} style={{ height: '100%', width: '100vw', padding: '0.03px' }}>
            <Routes>
                <Route path="/" element={<MainRouter />}>
                    <Route path="/" element={<Intro />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/database/algebra" element={<Algebra_2 />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </div>
    )
}

export default App

/*
import React, { useState } from 'react';

// Square 컴포넌트: 각 상자를 나타냄
function Square({ number, isAnimated }) {
    return (
        <div className={`square ${isAnimated ? 'animated' : ''}`}>
            {number}
        </div>
    );
}

function App() {
    const [animatedBoxIndex, setAnimatedBoxIndex] = useState(null);

    const startNumber = 10801;
    const numberOfRows = 2;
    const squaresPerRow = 10;

    const handleButtonClick = () => {
        setAnimatedBoxIndex((prevIndex) => (prevIndex === 3 ? null : 3)); // 4번째 박스의 애니메이션을 토글
    };

    return (
        <div className="container">
            <button onClick={handleButtonClick}>Toggle Animation</button>
            <div className="row header">
                <div className="square-header"></div> {/!* 왼쪽 상단 공백 *!/}
                {[...Array(squaresPerRow)].map((_, colIndex) => (
                    <div key={colIndex} className="square-header">{colIndex}</div>
                ))}
            </div>
            {[...Array(numberOfRows)].map((_, rowIndex) => (
                <div key={rowIndex} className="row">
                    <div className="square-header">{rowIndex + 1}</div> {/!* 행 번호 *!/}
                    {[...Array(squaresPerRow)].map((_, colIndex) => {
                        const boxIndex = rowIndex * squaresPerRow + colIndex;
                        const number = startNumber + (rowIndex * squaresPerRow * 4) + (colIndex * 4);
                        const formattedNumber = `01${number.toString().padStart(4, '0')}`;
                        return (
                            <Square
                                key={colIndex}
                                number={formattedNumber}
                                isAnimated={boxIndex === animatedBoxIndex}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default App;
*/
