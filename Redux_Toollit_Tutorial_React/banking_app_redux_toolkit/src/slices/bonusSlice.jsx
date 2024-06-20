import { createSlice } from '@reduxjs/toolkit'
import { incrementByAmt } from './accountSlice';

const initialState = {
    points: 1
};


// Slices ...

const bonusSlice = createSlice({
    name: 'bonus/banking',
    initialState,
    reducers: {
        incrementBonus: state => {
            state.points++;
        }
    },
    extraReducers: builder => {
        builder.addCase(incrementByAmt, (state, { payload }) => {
            if (payload >= 100) {
                state.points++;
            } else {
                return state.points;
            }
        })
    }

});

export const { incrementBonus } = bonusSlice.actions; // exporting action creators of bonus slice ...

export default bonusSlice.reducer;