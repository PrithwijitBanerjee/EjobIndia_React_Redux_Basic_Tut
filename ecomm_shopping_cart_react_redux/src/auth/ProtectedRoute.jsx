import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = JSON.parse(localStorage.getItem('token')) || JSON.parse(sessionStorage.getItem('token'));
    return token !== null && token !== undefined ? (
        children
    ) : (
        <Navigate to={'/signIn'}/>
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.any
}

export default ProtectedRoute