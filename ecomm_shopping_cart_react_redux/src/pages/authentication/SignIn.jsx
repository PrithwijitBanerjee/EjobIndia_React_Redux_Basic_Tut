import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { STATUSES } from "../../utils/statusObj";
import { Vortex } from "react-loader-spinner";
import { loginUser } from "../../reducers/loginSlice";
import { useEffect } from "react";

const initialValues = {
    email: '',
    password: ''
};
const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errorMsg, redirectTo } = useSelector(state => state?.signIn);
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            email: Yup.string().email('@Invalid Email Id').required(' **Email Id is required'),
            password: Yup.string()
                .min(6, 'Password is too short - should be 6 chars minimum.')
                .required('**Password is Required')
        }),
        onSubmit: async (data, action) => {
            dispatch(loginUser(data));
            action.resetForm();
        }
    });
    const redirectUser = () => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== '') {
            navigate('/');
        }
    }

    useEffect(() => {
        redirectUser();
    }, [redirectTo]);

    if (loading === STATUSES.REJECTED) {
        return (<div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-danger">{errorMsg && 'Something Went Wrong! Please Try Again!'}</h2>
                </div>
            </div>
        </div>)
    }
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="row">
                <div className="col-md-12">
                    <div className="card" style={{ width: '30rem' }}>
                        <div className="card-body">
                            <h5 className="card-title mb-4">Sign In Form</h5>
                            <div className="card-text">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="text" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" placeholder="name@example.com" value={formik.values.email} onChange={formik.handleChange} />
                                    </div>
                                    <span className="mb-3 text-danger">
                                        {
                                            formik?.errors && formik?.touched?.email && formik?.errors?.email
                                        }
                                    </span>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="your password" value={formik.values.password} onChange={formik.handleChange} />
                                    </div>
                                    <span className="mb-3 text-danger">
                                        {
                                            formik?.errors && formik?.touched?.password && formik?.errors?.password
                                        }
                                    </span>
                                    <div className="my-4">
                                        {
                                            loading === STATUSES.LOADING ? (<>
                                                <Vortex
                                                    visible={true}
                                                    height="80"
                                                    width="80"
                                                    ariaLabel="vortex-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="vortex-wrapper"
                                                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                                                />
                                            </>) : (<>
                                                <button type="submit" className="btn btn-primary mx-3">sign in</button>
                                            </>)
                                        }
                                        <button type="reset" className="btn btn-secondary mx-3" onClick={formik.handleReset}>Reset</button>
                                    </div>
                                    <div>
                                        ** New User ? <Link to={'/signUp'}>signup</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn