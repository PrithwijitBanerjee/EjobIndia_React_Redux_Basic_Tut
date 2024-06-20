import axios from "axios";
import { DECREMENT, INCBONUS, INCBYAMT, INCREMENT, USRACCFULFILLED, USRACCPENDING, USRACCREJECTED } from "../contansts";

// action creators ...

export const increment = () => {
    return { type: INCREMENT };
}

export const decrement = () => {
    return { type: DECREMENT };
}

export const incByAmt = (amt) => {
    return { type: INCBYAMT, payload: amt };
}

export const incBonus = () => {
    return { type: INCBONUS };
}

export const initUsrAcc = id => {
    return async (dispatch, getState) => {
        try {
            dispatch(getUsrAccPending()); // synchronous dispatch ...
            const { data } = await axios.get(`http://localhost:8080/accounts/${id}`);
            dispatch(getUsrAccFulfilled(data?.amount)); // synchronous dispatch ...
        } catch (error) {
            dispatch(getUsrAccRejected(error?.message));
        }
    }
}

const getUsrAccPending = () => {
    return { type: USRACCPENDING, loading: true };
}

const getUsrAccFulfilled = data => {
    return { type: USRACCFULFILLED, payload: data }
}

const getUsrAccRejected = error => {
    return { type: USRACCREJECTED, error };
}
