import { createAction, createReducer } from "@reduxjs/toolkit";



// Action Creators ...

export const incrementReward = createAction('reward/banking/increment');

const initialState = {
    points: 1
};

// reducers ....

const rewardReducer = createReducer(initialState, builder => {
    builder.addCase(incrementReward, state => {
        state.points++
    })
});

export default rewardReducer;