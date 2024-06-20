import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { log_out } from "../../redux/reducers/loginSlice";


const Header = () => {
    const name = localStorage.getItem('name');
    const { logoutToggle } = useSelector(state => state?.login);
    const dispatch = useDispatch();
    const handleSignOut = () => {
        dispatch(log_out());
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'palevioletred' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand active text-white" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-white" to="/students">Students</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-white" to="/blog">Blog</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active text-white" href="#" data-bs-toggle="modal" data-bs-target="#signupModal">SignUp</a>
                            </li>
                            {
                                logoutToggle ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active text-white" to="/login">Hi! {name}</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active text-white" to="/login" onClick={handleSignOut}>SignOut</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active text-white" to="/login">SignIn</Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header