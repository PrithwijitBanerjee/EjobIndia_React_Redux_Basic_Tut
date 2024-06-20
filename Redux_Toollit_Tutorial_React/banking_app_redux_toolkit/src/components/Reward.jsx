import { useDispatch, useSelector } from "react-redux"
import { incrementReward } from "../reducers/rewardReducer";


const Reward = () => {
    const dispatch = useDispatch();
    const points = useSelector(state => state?.reward?.points);

    return (
        <div className="container my-5">
            <h2>Reward Component</h2>
            <h2 className="my-5">Points: {points}</h2>
            <button className="btn btn-outline-success" onClick={() => dispatch(incrementReward())}>Increment</button>
        </div>
    )
}

export default Reward