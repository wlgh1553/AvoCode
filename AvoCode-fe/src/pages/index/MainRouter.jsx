import TopMenu from '@/components/menu/TopMenu.jsx'
import { Outlet } from 'react-router-dom'

function MainRouter() {
    return (
        <>
            <TopMenu />
            <Outlet />
        </>
    )
}

export default MainRouter
