import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"


const Layout = () => {
    return (
        <>
            <Header />
            <div style={{minHeight: '70vh'}}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout