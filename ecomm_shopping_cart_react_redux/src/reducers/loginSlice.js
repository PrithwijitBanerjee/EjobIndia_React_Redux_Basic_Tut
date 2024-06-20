import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../utils/statusObj';
import { toast } from 'react-toastify';
import { axiosAuthInstance } from '../api/axiosInstance';

const initialState = {
    loading: STATUSES.IDLE,
    errorMsg: '',
    redirectTo: null,
    userLog: {},
    logoutToggle: false
};


// thunk middleware ...

export const loginUser = createAsyncThunk('user/login', async (loginCredentials, { rejectWithValue }) => {
    try {
        const { data } = await axiosAuthInstance.post('login', loginCredentials);
        console.log('data: ', data);
        return data;
    } catch (error) {
        toast.error(error?.response?.status === 400 && 'Login failed! Invalid Credentials!!!', {
            theme: 'colored',
            position: 'top-center'
        });
        return rejectWithValue(error?.message);
    }
});

// slice ...

const loginSlice = createSlice({
    name: 'ecomm/user/login',
    initialState,
    reducers: {
        sign_out: state => {
            state.loading = STATUSES.IDLE;
            localStorage.removeItem('token');
            state.logoutToggle = false;
            toast.success('user successfully signed out!!!', {
                theme: 'colored'
            });
        },
        check_token: (state) => {
            const token = JSON.parse(localStorage.getItem('token'));
            if (token !== null && token !== undefined && token !== '') {
                state.logoutToggle = true;
            } else {
                state.logoutToggle = false;
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, state => {
            state.loading = STATUSES.LOADING;
            state.errorMsg = '';
        })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = STATUSES.IDLE;
                state.errorMsg = '';
                state.userLog = payload;
                state.redirectTo = '/';
                localStorage.setItem('token', JSON.stringify(payload?.token));
                state.logoutToggle = true;
                toast.success('user login success!!!', {
                    theme: 'colored'
                });
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = STATUSES.REJECTED;
                state.errorMsg = payload;
            })
    }
});

export const { sign_out, check_token } = loginSlice.actions;
export default loginSlice.reducer;