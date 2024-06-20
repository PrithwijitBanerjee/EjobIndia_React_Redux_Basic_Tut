import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { decrement, incByAmt, increment, initUsrAcc } from "../actions";

const Accounts = () => {
    const amount = useSelector(state => state.accounts.amount);
    const dispatch = useDispatch();
    const [val, setVal] = useState(0);
    return (
        <div className="container my-5 text-center">
            <h2 className="my-2">Account Components</h2>
            <div>
                <h4 className="my-3">Amounts: {amount}</h4>
                <div className="d-flex justify-content-center">
                    <button onClick={() => dispatch(initUsrAcc(1))} className="btn btn-success mx-3">Init User Account from API</button>
                    <button onClick={() => dispatch(increment())} className="btn btn-success mx-3">Increment</button>
                    <button onClick={() => dispatch(decrement())} className="btn btn-danger mx-3">Decrement</button>
                    <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
                    <button onClick={() => dispatch(incByAmt(+(val)))} className="btn btn-success mx-3">increment by amt: {val}</button>
                </div>
            </div>
        </div>
    )
}

export default Accounts
