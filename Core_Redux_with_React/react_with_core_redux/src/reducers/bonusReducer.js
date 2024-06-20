import { INCBONUS, INCBYAMT } from "../contansts";

const initialBonusState = {
    points: 0
}


export const bonusReducer = (state = initialBonusState, action) => {
    switch (action.type) {
        case INCBONUS:
            return { points: state.points + 1 };
        case INCBYAMT:
            if (action.payload >= 100) { // extra cases which is known as extraReducers in RTK ...
                return { points: state.points + 1 };
            }
        // default: return state;    
    }
    return state;
}
