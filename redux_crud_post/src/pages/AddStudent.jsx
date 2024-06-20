import { useState } from "react";
import { addStudent } from "../redux/reducers/studentSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        class: ''
    });

    const [stuErr, setStuErr] = useState({
        nameErr: null,
        emailErr: null,
        phoneErr: null,
        addressErr: null,
        cityErr: null,
        classErr: null
    });

    const validation = () => {
        const err = {};
        if (!student.name) {
            err.nameErr = ' **name is required';
        }
        if (!student.email) {
            err.emailErr = ' **email is required';
        }
        if (!student.phone) {
            err.phoneErr = ' **phone no. is required';
        }
        if (!student.address) {
            err.addressErr = ' **address is required';
        }
        if (!student.city) {
            err.cityErr = ' **city is required';
        }
        if (!student.class) {
            err.classErr = ' **class is required';
        }
        return err;
    }

    const handleInput = e => {
        const { id, value } = e.target;
        setStudent(prevData => ({
            ...prevData,
            [id]: value
        }));

        setStuErr(prevErr => ({
            ...prevErr,
            [`${id}Err`]: value ? '' : ` **${id} is required`
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const errList = validation();
        setStuErr(errList);
        if (Object.keys(errList).length === 0) {
            try {
                const res = await addStudent(student);
                if (res?.success) {
                    toast.success(res?.msg, {
                        theme: 'colored'
                    });
                    navigate("/students");
                }
            } catch (error) {
                toast.error(error?.message, {
                    theme: 'colored'
                });
            }
            return true;
        }
        return false;
    }

    return (
        <div className="container d-flex justify-content-center align-items-center my-5" style={{ height: '100vh' }}>
            <div className="row">
                <div className="col-md-12">
                    <div className="card" style={{ width: '30rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Student Form</h5>
                            <div className="card-text">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${stuErr.nameErr === null ? '' : stuErr.nameErr ? 'is-invalid' : 'is-valid'}`}
                                            id="name"
                                            placeholder="your name"
                                            value={student.name}
                                            onChange={handleInput}
                                        />
                                        <div className={stuErr.nameErr ? 'invalid-feedback' : 'valid-feedback'}>
                                            {stuErr.nameErr ? stuErr.nameErr : 'Looks good!'}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${stuErr.emailErr === null ? '' : stuErr.emailErr ? 'is-invalid' : 'is-valid'}`}
                                            id="email"
                                            placeholder="name@example.com"
                                            value={student.email}
                                            onChange={handleInput}
                                        />
                                        <div className={stuErr.emailErr ? 'invalid-feedback' : 'valid-feedback'}>
                                            {stuErr.emailErr ? stuErr.emailErr : 'Looks good!'}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone:</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${stuErr.phoneErr === null ? '' : stuErr.phoneErr ? 'is-invalid' : 'is-valid'}`}
                                            id="phone"
                                            placeholder="Your contact no."
                                            value={student.phone}
                                            onChange={handleInput}
                                        />
                                        <div className={stuErr.phoneErr ? 'invalid-feedback' : 'valid-feedback'}>
                                            {stuErr.phoneErr ? stuErr.phoneErr : 'Looks good!'}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input
                                            type="text"
                                            className={`form-control ${stuErr.addressErr === null ? '' : stuErr.addressErr ? 'is-invalid' : 'is-valid'}`}
                                            id="address"
                                            placeholder="your residential address"
                                            value={student.address}
                                            onChange={handleInput}
                                        />
                                        <div className={stuErr.addressErr ? 'invalid-feedback' : 'valid-feedback'}>
                                            {stuErr.addressErr ? stuErr.addressErr : 'Looks good!'}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input
                                            type="text"
                                            className={`form-control ${stuErr.cityErr === null ? '' : stuErr.cityErr ? 'is-invalid' : 'is-valid'}`}
                                            id="city"
                                            placeholder="your city name"
                                            value={student.city}
                                            onChange={handleInput}
                                        />
                                        <div className={stuErr.cityErr ? 'invalid-feedback' : 'valid-feedback'}>
                                            {stuErr.cityErr ? stuErr.cityErr : 'Looks good!'}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="class" className="form-label">Class</label>
                                        <input
                                            type="text"
                                            className={`form-control ${stuErr.classErr === null ? '' : stuErr.classErr ? 'is-invalid' : 'is-valid'}`}
                                            id="class"
                                            placeholder="class name"
                                            value={student.class}
                                            onChange={handleInput}
                                        />
                                        <div className={stuErr.classErr ? 'invalid-feedback' : 'valid-feedback'}>
                                            {stuErr.classErr ? stuErr.classErr : 'Looks good!'}
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row mt-4">
                                        <button type="submit" className="btn btn-outline-success">add new student</button>
                                        <button type="reset" className="mx-3 btn btn-outline-secondary" onClick={() => {
                                            setStudent({
                                                name: '',
                                                email: '',
                                                phone: '',
                                                address: '',
                                                city: '',
                                                class: ''
                                            });
                                            setStuErr({
                                                nameErr: null,
                                                emailErr: null,
                                                phoneErr: null,
                                                addressErr: null,
                                                cityErr: null,
                                                classErr: null
                                            });
                                        }}>reset</button>
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

export default AddStudent;
