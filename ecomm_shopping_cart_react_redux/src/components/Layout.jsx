import { Outlet } from "react-router-dom"
import Header from "./commons/Header"
import Footer from "./commons/Footer"


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