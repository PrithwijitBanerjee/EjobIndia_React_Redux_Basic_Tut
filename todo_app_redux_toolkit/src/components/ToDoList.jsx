import { useSelector } from "react-redux"
import ToDoItem from './ToDoItem'

const ToDoList = () => {
    const { items } = useSelector(state => state?.todo);
    return (
        <div className="my-5">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items?.length === 0 ? (
                            <tr>
                                <th colSpan={3}>
                                    <h5 className="text-center text-danger">No items in the list</h5>
                                </th>
                            </tr>
                        ) : items?.map(item => (
                            <ToDoItem
                                key={item?.id}
                                id={item?.id}
                                title={item?.title}
                                desc={item?.desc}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}



export default ToDoList