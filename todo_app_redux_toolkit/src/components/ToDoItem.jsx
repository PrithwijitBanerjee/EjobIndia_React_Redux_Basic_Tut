import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeItem, getItemById } from '../redux/slices/todoSlice';


const ToDoItem = ({ title, desc, id }) => {
    const dispatch = useDispatch();
    const handleDel = itemId => {
        dispatch(removeItem(itemId));
    }
    const handleEdit = itemId => {
        dispatch(getItemById(itemId));
    }
    return (
        <>
            <tr>
                <th>{title}</th>
                <td>{desc}</td>
                <td>
                    <button className="btn btn-success mx-2" onClick={() => handleEdit(id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDel(id)}>Delete</button>
                </td>
            </tr>
        </>
    )
}

ToDoItem.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    id: PropTypes.string
}
export default ToDoItem