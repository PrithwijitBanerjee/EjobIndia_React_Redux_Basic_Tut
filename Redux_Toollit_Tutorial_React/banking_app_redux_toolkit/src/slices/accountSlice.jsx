import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = Object.freeze({ //read-only attributes ...
    amount: 1,
    status: '',
    errMsg: ''
});

// thunk middleware ...
export const getUserAccById = createAsyncThunk(
    'users/getUserAccById',
    async id => {
        try {
            const { data } = await axios.get(`http://127.0.0.1:8080/accounts/${id}`);
            return data;
        } catch (error) {
            throw error?.message
        }
    }
)

// slice ....

const accountSlice = createSlice({
    name: 'account/banking',
    initialState,
    reducers: {
        increment: state => {
            state.amount++; //IMMER library
        },
        decrement: state => {
            state.amount--; //IMMER library
        },
        incrementByAmt: (state, { payload }) => {
            state.amount += payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getUserAccById.pending, state => {
            state.status = 'LOADING';
            state.errMsg = '';
            state.amount = 0;
        })
            .addCase(getUserAccById.fulfilled, (state, { payload }) => {
                state.status = 'FULFILLED';
                state.amount = payload?.amount;
            })
            .addCase(getUserAccById.rejected, (state, { error }) => {
                console.log(error);
                state.amount = 0;
                state.status = 'ERROR';
                state.errMsg = error?.message;
            })
    }
});

export const { increment, decrement, incrementByAmt } = accountSlice.actions; // exporting all action creators ...
export default accountSlice.reducer;