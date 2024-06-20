import { createStore, combineReducers } from 'redux'

// constants for action creators as well as reducers ...
const BUY_TICKETS = 'RAILWAY/BUY_TICKETS';
const CANCEL_TICKETS = 'CANCEL_TICKETS';

// Action-creators ....

const book_tickets = (name, age, ph, src, des, amt) => {
    return {
        type: BUY_TICKETS,
        payloads: {
            name,
            age,
            ph,
            src,
            des,
            amt
        }
    }
}

const cancel_tickets = (name, age, ph, src, des, refundAmt) => {
    return {
        type: CANCEL_TICKETS,
        payloads: {
            name,
            age,
            ph,
            src,
            des,
            refundAmt
        }
    }
}

// reducers ....

// reducer 1 ...

const reservation_history = (oldReservationHistory = [], { type, payloads }) => {
    switch (type) {
        case BUY_TICKETS: return [...oldReservationHistory, payloads]; // changing in immutable way ...
        case CANCEL_TICKETS: return oldReservationHistory.filter(history => history?.name !== payloads?.name);
        default: return oldReservationHistory;
    }
}

// reducer 2 ...

const cancellation_history = (oldCancellationHistory = [], { type, payloads }) => {
    switch (type) {
        case CANCEL_TICKETS: return [...oldCancellationHistory, payloads];
        default: return oldCancellationHistory;
    }
}

// reducer 3 ...

const account_history = (prevAcc = 0, { type, payloads }) => {
    let newAcc = prevAcc;
    switch (type) {
        case BUY_TICKETS: newAcc += payloads?.amt; break;
        case CANCEL_TICKETS: newAcc -= payloads?.refundAmt; break;
    }
    return newAcc;
}

// combining multiple reducers ...

const rootReducer = combineReducers({
    railway_acc_amt: account_history,
    reservation_history,
    cancellation_history
});

// store in redux ....

const store = createStore(rootReducer);

console.log(store.getState());

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(book_tickets('John Doe', 27, 9836716501, 'Howrah', 'Delhi', 3000));
store.dispatch(book_tickets('Jane Doe', 30, 9836716501, 'Howrah', 'Mumbai', 2000));
store.dispatch(cancel_tickets('John Doe', 27, 9836716501, 'Howrah', 'Delhi', 3000));

