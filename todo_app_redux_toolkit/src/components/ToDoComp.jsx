import ToDoForm from "./ToDoForm"
import ToDoList from "./ToDoList"


const ToDoComp = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-danger my-4 text-center">To Do App</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ToDoForm />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ToDoList />
                </div>
            </div>
        </div>
    )
}

export default ToDoComp