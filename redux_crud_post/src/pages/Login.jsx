import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { loginUser } from "../redux/reducers/loginSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { STATUSES } from "../utils/statusObj";
import { ColorRing } from "react-loader-spinner";

const initialValues = {
    email: '',
    password: ''
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { redirectTo, status } = useSelector(state => state?.login);
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email Id').required(' **Email Id is required'),
            password: Yup.string().required(' **Password is required').min(5, 'Password must be minimum 5 characters')
        }),
        onSubmit: (data, { resetForm }) => {
            dispatch(loginUser(data));
            resetForm();
        }
    });

    const redirectUser = () => {
        const token = JSON.parse(localStorage.getItem('token') || sessionStorage.getItem('token'));
        if (token !== null && token !== undefined && token !== '') {
            navigate(redirectTo);
        }
    }

    useEffect(() => {
        redirectUser();
    }, [redirectTo]);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <div className="row">
                <div className="col-md-12">
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Sign In Form</h5>
                            <div className="card-text">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">EmailId: </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            placeholder="name@example.com"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    <span className="text-danger mb-5">
                                        {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                                    </span>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password: </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    <span className="text-danger mb-5">
                                        {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                                    </span>
                                    <div className="mt-4">
                                        {
                                            status === STATUSES.LOADING ? (<ColorRing
                                                visible={true}
                                                height="80"
                                                width="80"
                                                ariaLabel="color-ring-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="color-ring-wrapper"
                                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                            />) : (<button type="submit" className="btn btn-outline-success">Sign In</button>)
                                        }
                                        <button type="button" onClick={formik.handleReset} className="btn btn-outline-secondary mx-3">Reset</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
