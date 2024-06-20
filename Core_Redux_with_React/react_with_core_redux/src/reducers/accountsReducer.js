import { DECREMENT, INCBYAMT, INCREMENT, USRACCFULFILLED, USRACCPENDING, USRACCREJECTED } from "../contansts";

// initial store value in redux ...
const initialAccountState = {
    amount: 0
}


export const accReducer = (state = initialAccountState, action) => {
    switch (action.type) {
        case INCREMENT:
            return { amount: state.amount + 1 };
        case DECREMENT:
            return { amount: state.amount - 1 };
        case INCBYAMT:
            return { amount: state.amount + action?.payload };
        case USRACCPENDING:
            return { ...state, loading: action.loading };
        case USRACCFULFILLED:
            return { ...state, amount: action.payload, loading: false };
        case USRACCREJECTED:
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
}

