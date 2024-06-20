import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import '../../styles/utility.css'
import { sign_out } from "../../reducers/loginSlice";

const Header = () => {
    const { cartIds } = useSelector(state => state?.carts);
    const dispatch = useDispatch();
    const { logoutToggle } = useSelector(state => state.signIn);
    const handleSignOut = () => {
        dispatch(sign_out());
    }
    return (
        <>
            <div className="header sticky-top">
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#f95fa7' }}>
                    <div className="container-fluid">
                        <a className="navbar-brand active text-white" href="#">Redux Ecomm App</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) =>
                                        isActive ? "nav-link active active-link" : "nav-link active text-white"
                                    } to="/">Home</NavLink>
                                </li>
                                <li className="nav-item mx-3">
                                    <NavLink className={({ isActive }) =>
                                        isActive ? "nav-link active active-link" : "nav-link active text-white"
                                    } to="/cart">Cart {cartIds?.length !== 0 && <span>{cartIds?.length}</span>}</NavLink>
                                </li>
                                {
                                    logoutToggle ? (<>
                                        <li className="nav-item mx-3">
                                            <NavLink className={({ isActive }) =>
                                                isActive ? "nav-link active active-link" : "nav-link active text-white"
                                            } to="/">Hi! User</NavLink>
                                        </li>
                                        <li className="nav-item mx-3">
                                            <NavLink to={'/signIn'} className={({ isActive }) =>
                                                isActive ? "nav-link active active-link" : "nav-link active text-white"
                                            } onClick={handleSignOut}>signOut</NavLink>
                                        </li>
                                    </>) : (<>
                                        <li className="nav-item mx-3">
                                            <NavLink className={({ isActive }) =>
                                                isActive ? "nav-link active active-link" : "nav-link active text-white"
                                            } to="/signUp">SignUp</NavLink>
                                        </li>
                                        <li className="nav-item mx-3">
                                            <NavLink className={({ isActive }) =>
                                                isActive ? "nav-link active active-link" : "nav-link active text-white"
                                            } to="/signIn">SignIn</NavLink>
                                        </li>
                                    </>)
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header