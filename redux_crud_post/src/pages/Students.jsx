import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux"
import { deleteStudent, fetchStudents } from "../redux/reducers/studentSlice";
import { STATUSES } from "../utils/statusObj";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";



const Students = () => {
    const navigate = useNavigate();
    const { students, status, err } = useSelector(state => state?.allStudents);
    const dispatch = useDispatch();

    const handleDelete = id => {
        deleteStudent(id);
        dispatch(fetchStudents()); // for refresh the table ...
    }
    useEffect(() => {
        dispatch(fetchStudents());
    }, []);
    const columns = [
        {
            name: 'NAME',
            selector: row => row?.name,
            width: '10%',
            sortable: true
        },
        {
            name: 'EMAIL',
            selector: row => row?.email,
            width: '20%',
            sortable: true
        },
        {
            name: 'PHONE',
            selector: row => row?.phone,
            width: '10%',
            sortable: true
        },
        {
            name: 'ADDRESS',
            selector: row => row?.address,
            width: '20%',
            sortable: true
        },
        {
            name: 'CITY',
            selector: row => row?.city,
            width: '10%',
            sortable: true
        },
        {
            name: 'CLASS',
            selector: row => row?.class,
            width: '10%',
            sortable: true
        },
        {
            name: 'ACTIONS',
            cell: row => (
                <div className="my-2 d-flex">
                    <button
                        onClick={() => navigate(`/editStudent/${row?._id}`)}
                        className="btn btn-outline-success mx-3">
                        Edit
                    </button>
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(row?.id)}>
                        Delete
                    </button>
                </div>
            ),
            width: "15%",
            wrap: true
        },
    ];


    const customStyles = {
        headCells: {
            style: {
                fontSize: '15px', // Change this to the desired size
                fontWeight: 'bold'
            },
        },
    };


    return (
        <>
            <div className="my-3">
                <button
                    onClick={() => navigate('/addStudent')}
                    className="btn btn-outline-primary mx-5">
                    Add New Student
                </button>
            </div>
            <DataTable
                title={'Students Table'}
                data={students}
                columns={columns}
                pagination
                responsive
                striped
                progressPending={status === STATUSES.LOADING}
                progressComponent={<ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />}
                noDataComponent={status === STATUSES.REJECTED ? <div>{err}</div> : 'No data available'}
                customStyles={customStyles}
            />
        </>
    )
}

export default Students