import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../../utils/statusObj";
import { axiosInstance } from "../../api/customAxios";
import { toast } from "react-toastify";


const initialState = {
    user: null,
    status: STATUSES.IDLE,
    redirectTo: null,
    token: null,
    logoutToggle: false,
    errMsg: ''
};


// thunk middleware ....

export const loginUser = createAsyncThunk('signIn/user',
    async userCredentials => {
        try {
            const { data } = await axiosInstance.post('login', userCredentials);
            return data;
        } catch (error) {
            if (error?.response?.data?.status === 400) {
                toast.error(error?.response?.data?.message, {
                    theme: 'colored'
                });
                throw new Error(error.message);
            }
        }
    }
);


// slice ....

const loginSlice = createSlice({
    name: 'user/signIn',
    initialState,
    reducers: {
        check_token: state => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (token !== null && token !== undefined && token !== "") {
                state.logoutToggle = true;
                state.user = {
                    name: localStorage.getItem('name')
                }
            }
        },
        log_out: state => {
            state.logoutToggle = false;
            const name = localStorage.getItem('name');
            toast.success(`${name} has logged out successfully !!!`, {
                theme: 'colored'
            });
            state.redirectTo = null;
            localStorage.removeItem('name');
            localStorage.removeItem('token');
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, state => {
            state.status = STATUSES.LOADING;
        }).addCase(loginUser.fulfilled, (state, { payload }) => {
            if (payload?.status === 200) {
                state.status = STATUSES.IDLE;
                state.user = payload?.user;
                state.token = payload?.token;
                state.redirectTo = '/';
                state.logoutToggle = true;
                localStorage.setItem('name', payload?.user?.name);
                localStorage.setItem('token', JSON.stringify(payload?.token));
                toast.success(`${payload?.user?.name} ${payload?.message}`, {
                    theme: 'colored'
                });
            }
        }).addCase(loginUser.rejected, (state, { error }) => {
            state.errMsg = error;
            state.status = STATUSES.REJECTED;
        })
    }
});


export const { log_out, check_token } = loginSlice.actions;
export default loginSlice.reducer;