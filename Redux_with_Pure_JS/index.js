import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
import axios from 'axios';

// initial store value in redux ...
const initialAccountState = {
    amount: 0
}

const initialBonusState = {
    points: 0
}

// constansts for reducers as well as actionCreators ....
const INCREMENT = 'accounts/inc';
const DECREMENT = 'accounts/dec';
const INCBYAMT = 'accounts/incByAmt';
const USRACCFULFILLED = 'accounts/initUserAcc/fulfilled';
const USRACCPENDING = 'accounts/initUserAcc/pending';
const USRACCREJECTED = 'accounts/initUserAcc/rejected';
const INCBONUS = 'bonus/inc'

const history = [{ accounts: { ...initialAccountState }, bonus: { ...initialBonusState } }];


// reducers in redux (it performs state transition) ....

const accReducer = (state = initialAccountState, action) => {
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

const bonusReducer = (state = initialBonusState, action) => {
    switch (action.type) {
        case INCBONUS:
            return { points: state.points + 1 };
        case INCBYAMT:
            if (action.payload >= 100) { // extra cases which is known as extraReducers in RTK ...
                return { points: state.points + 1 };
            }
        default: return state;
    }
}

// combining multiple reducers into root reducer ....

const rootReducer = combineReducers(
    {
        accounts: accReducer,
        bonus: bonusReducer
    }
);

// store in redux ....
const store = createStore(rootReducer, applyMiddleware(logger.default, thunk));

// global state / store ....
// console.log(store.getState());

// we need to add a listener which listens and call a callback fn whenever the store gets updated ...
store.subscribe(() => {
    history.push(store.getState());
    console.log(store.getState());
})

// action creators ...

const increment = () => {
    return { type: INCREMENT };
}

const decrement = () => {
    return { type: DECREMENT };
}

const incByAmt = (amt) => {
    return { type: INCBYAMT, payload: amt };
}

const initUsrAcc = id => {
    return async (dispatch, getState) => {
        try {
            dispatch(getUsrAccPending()); // synchronous dispatch ...
            const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
            dispatch(getUsrAccFulfilled(data)); // synchronous dispatch ...
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

// dispatch ....

// setInterval(() => {
//     // store.dispatch({type: INCBYAMT, payload: 4});
//     // store.dispatch(incByAmt(5));
//     store.dispatch(increment());
//     console.log(history);
// }, 2000);

setTimeout(() => {
    store.dispatch(initUsrAcc(2)); // asynchronous dispatch ...
    // store.dispatch(incByAmt(200)); 
}, 2000);

// store.dispatch({type: INCBYAMT, payload: 50});
// store.dispatch({type: DECREMENT});

// console.log(store.getState());