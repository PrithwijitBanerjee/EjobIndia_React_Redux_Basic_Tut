import { useFormik } from "formik"
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../reducers/registrationSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { STATUSES } from "../../utils/statusObj";
import { Vortex } from "react-loader-spinner";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { redirectReg, loading, errorMsg } = useSelector(state => state?.signUp);
    const formik = useFormik({
        initialValues: {
            emailId: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            emailId: Yup.string().email('@Invalid Email Id').required(' **Email Id is required'),
            password: Yup.string()
                .min(6, 'Password is too short - should be 6 chars minimum.')
                .required('**Password is Required')
        }),
        onSubmit: async (data, action) => {
            const formData = {
                email: data.emailId,
                password: data.password
            }
            dispatch(registerUser(formData));
            action.resetForm();
        }
    });

    const redirectUser = () => {
        // const regToken = JSON.parse(localStorage.getItem('regToken'));
        // const isInSignUpPage = window.location.pathname.toLowerCase === '/signup';
        // if (regToken !== null && regToken !== '' && regToken !== undefined) {
        //    isInSignUpPage && navigate('/signIn');
        // }
        if(redirectReg === '/signIn') {
            navigate(redirectReg);
        }

    }
    useEffect(() => {
        redirectUser();
    }, [redirectReg]);

    if (loading === STATUSES.REJECTED) {
        return (<div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-danger">{errorMsg}</h2>
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
                            <h5 className="card-title mb-4">Sign Up Form</h5>
                            <div className="card-text">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="emailId" className="form-label">Email address</label>
                                        <input type="text" className="form-control" id="emailId" placeholder="name@example.com" value={formik.values.emailId} onChange={formik.handleChange} />
                                    </div>
                                    <span className="text-danger mb-3">
                                        {
                                            formik.errors && formik.touched.emailId && formik.errors?.emailId
                                        }
                                    </span>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="password" value={formik.values.password} onChange={formik.handleChange} />
                                    </div>
                                    <span className="text-danger">
                                        {
                                            formik.errors && formik.touched.password && formik.errors?.password
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
                                                <button type="submit" className="btn btn-primary mx-3">sign up</button>
                                            </>)
                                        }
                                        <button type="reset" onClick={formik.handleReset} className="btn btn-secondary">reset</button>
                                    </div>
                                    <div>
                                        **Already have an account? <Link to={'/signIn'}>signin</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default SignUp