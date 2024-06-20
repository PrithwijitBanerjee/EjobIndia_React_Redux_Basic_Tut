import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem } from "../redux/slices/todoSlice";

const INITIAL_ITEM_STATE = { // global constant variables ....
    title: '',
    desc: ''
};

const ToDoForm = () => {
    const [item, setItem] = useState(INITIAL_ITEM_STATE);
    const [status, setStatus] = useState(false);
    const { item: myItem } = useSelector(state => state?.todo);
    const dispatch = useDispatch();
    const handleInput = e => {
        if (e.target.name === 'title') {
            setItem(prevItem => ({
                ...prevItem, [e.target.name]: e.target.value
            }));
        }
        if (e.target.name === 'desc') {
            setItem(prevItem => ({
                ...prevItem, [e.target.name]: e.target.value
            }));
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addItem(item));
        setItem(INITIAL_ITEM_STATE);
    }
    const handleEdit = e => {
        e.preventDefault();
        dispatch(editItem(item));
        setItem(INITIAL_ITEM_STATE);
        setStatus(!status);
    }
    useEffect(() => {
        myItem && setItem(myItem);
    }, [myItem]);
    return (
        <>
            <form className="d-flex justify-content-center align-items-center my-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    value={item?.title}
                    onChange={handleInput}
                    className="mx-4"
                    style={
                        {
                            height: '37px',
                            outline: 'none',
                            width: '300px'
                        }
                    }
                />
                <input
                    type="text"
                    name="desc"
                    placeholder="Enter Description"
                    onChange={handleInput}
                    value={item?.desc}
                    className="mx-4"
                    style={
                        {
                            height: '37px',
                            outline: 'none',
                            width: '500px'
                        }
                    }
                />
                {
                    !myItem || status ? (
                        <button type="submit" className="btn btn-primary">Add Task</button>
                    ) : (
                        <button type="submit" className="btn btn-success" onClick={handleEdit}>Edit Task</button>
                    )
                }
            </form>
        </>
    )
}

export default ToDoForm