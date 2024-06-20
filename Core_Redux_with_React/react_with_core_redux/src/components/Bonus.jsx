import { useDispatch, useSelector } from "react-redux"
import { incBonus } from "../actions";


const Bonus = () => {
    const points = useSelector(state => state.bonus.points);
    const dispatch = useDispatch();

    return (
        <div className="container my-5 text-center">
                    <h2>Bonus Components</h2>
                    <div className="my-3">
                        <h4>Points: {points}</h4>
                    </div>
                    <div>
                        <button onClick={() => dispatch(incBonus())} className="btn btn-success">increment bonus</button>
                    </div>
        </div>
    )
}

export default Bonus