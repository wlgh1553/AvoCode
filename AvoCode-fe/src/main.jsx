import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/pages/App.jsx'

import '@/assets/css/default.css'
import '@/assets/css/fonts/fonts.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)
