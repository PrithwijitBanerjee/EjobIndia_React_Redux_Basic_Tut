import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token !== null && token !== '' && token !== undefined) {
        return children;
    }
    return (
        <>
            {
                toast.error("please signin before visit", {
                    theme: 'colored'
                })
            }
            <Navigate to={"/login"} />
        </>
    )
}

ProtectedRoute.propTypes = {
    children: PropTypes.any
}
export default ProtectedRoute