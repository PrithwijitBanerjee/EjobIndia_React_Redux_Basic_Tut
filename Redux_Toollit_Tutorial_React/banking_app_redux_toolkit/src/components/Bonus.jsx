import { useDispatch, useSelector } from "react-redux"
import {incrementBonus} from '../slices/bonusSlice'

const Bonus = () => {
    const dispatch = useDispatch();
    const points = useSelector(state => state?.bonus?.points);
    return (
        <div className="container">
            <h2>Bonus Component with total points: {points}</h2>
            <button className="btn btn-outline-success my-2" onClick={() => dispatch(incrementBonus())}>Increment Bonus</button>
        </div>
    )
}

export default Bonus