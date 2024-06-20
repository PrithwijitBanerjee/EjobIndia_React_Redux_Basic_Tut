import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { decrement, getUserAccById, increment, incrementByAmt } from '../slices/accountSlice'

const Account = () => {
    const [amt, setAmt] = useState(0);
    const dispatch = useDispatch();
    const amount = useSelector(state => state?.account?.amount);
    return (
        <div className="container my-5">
            <h2>Account Component</h2>
            <h2 className="mt-4">Amount is: {amount}</h2>
            <div className="row">
                <div className="col-md-12 text-center">
                    <input
                        type="text"
                        id=""
                        placeholder="Enter your amount"
                        value={amt}
                        onChange={(e) => setAmt(e.target.value)} />
                </div>
                <div className="col-md-12 my-5">
                    <button
                        onClick={() => dispatch(increment())}
                        className="btn btn-outline-primary mx-2">Increment</button>
                    <button
                        onClick={() => dispatch(decrement())}
                        className="btn btn-outline-primary mx-2">Decrement</button>
                    <button
                        onClick={() => dispatch(incrementByAmt(+(amt)))}
                        className="btn btn-outline-primary mx-2">Increment by {amt}</button>
                    <button
                        onClick={() => dispatch(getUserAccById(1))}
                        className="btn btn-outline-primary mx-2">Get Account from DB</button>
                </div>
            </div>
        </div>
    )
}

export default Account