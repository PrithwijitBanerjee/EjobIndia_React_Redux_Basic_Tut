import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUSES } from '../utils/statusObj'
import { axiosAuthInstance } from '../api/axiosInstance'
import { toast } from 'react-toastify'

const initialState = {
    loading: STATUSES.IDLE,
    errorMsg: '',
    redirectReg: null,
    userReg: {}
}

// thunk middleware ...

export const registerUser = createAsyncThunk('user/register',
    async regCredentials => {
        try {
            const { data } = await axiosAuthInstance.post('register', regCredentials);
            return data;
        } catch (error) {
            toast.error(error?.response?.status === 400 && 'user registration failed', {
                theme: 'colored',
                position: 'top-center'
            });
            throw new Error(error);
        }
    }
);

// slice ...

const registrationSlice = createSlice({
    name: 'ecomm/user/registration',
    initialState,
    extraReducers: builder => {
        builder.addCase(registerUser.pending, state => {
            state.loading = STATUSES.LOADING;
            state.errorMsg = '';
        })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = STATUSES.IDLE;
                state.errorMsg = '';
                state.redirectReg = '/signIn';
                state.userReg = payload;
                // localStorage.setItem('regToken', JSON.stringify(payload?.token));
                toast.success('user registration successfull !!!', {
                    theme: 'colored',
                    position: 'top-center'
                });
            })
            .addCase(registerUser.rejected, (state, { error }) => {
                state.loading = STATUSES.REJECTED;
                state.errorMsg = error?.response?.status === 400 && 'something went wrong!!!';
            })
    }
});

export default registrationSlice.reducer;